"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Upload,
  type UploadFile,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { saveProjectAction } from "@/app/admin/projects/actions";
import { setFlashToast } from "@/lib/admin-toast";
import { uploadProjectFile } from "@/lib/storage";
import {
  PROJECT_TYPE_LABELS,
  SERVICE_GROUPS,
  SERVICE_GROUP_LABELS,
  galleryItems,
  isVideoProjectType,
  supportsProjectGallery,
  type Project,
  type ProjectGalleryItem,
  type ProjectType,
} from "@/types/project";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const IMAGE_MAX = 10 * 1024 * 1024;
const VIDEO_MAX = 200 * 1024 * 1024;
const GALLERY_MAX = 12;

const GALLERY_HINT: Partial<Record<ProjectType, string>> = {
  brand_identity:
    "Extra images for the identity journey — pack, card, street, brand book. The main file is the logo.",
  packaging: "More SKUs and pack shots after the hero.",
  prints: "More print pieces for the spread.",
  social_media: "More stills for the phone reel.",
  outdoors: "More boards and street frames.",
  photos: "More frames for the film strip.",
  brand_strategy: "Images for the timeline chapters.",
  marketing_strategy: "Images for the timeline chapters.",
  nfc_card: "More angles of the card.",
  nfc_ring: "More angles of the ring.",
  nfc_medal: "More angles of the medal.",
};

type Props = {
  project?: Project;
};

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [type, setType] = useState<ProjectType>(project?.type ?? "brand_identity");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [keptGallery, setKeptGallery] = useState<ProjectGalleryItem[]>(
    galleryItems(project ?? { gallery: [] }),
  );
  const [saving, setSaving] = useState(false);
  const isVideo = isVideoProjectType(type);
  const showGallery = supportsProjectGallery(type);
  const previewUrl = mediaFile
    ? URL.createObjectURL(mediaFile)
    : project?.media_url;

  function validateFile(file: File, kind: "media" | "poster") {
    if (kind === "poster" || !isVideo) {
      if (!IMAGE_TYPES.includes(file.type)) {
        throw new Error("Use a JPG, PNG, WEBP, or GIF image.");
      }
      if (file.size > IMAGE_MAX) {
        throw new Error("Image must be 10MB or smaller.");
      }
      return;
    }
    if (!VIDEO_TYPES.includes(file.type)) {
      throw new Error("Use an MP4, WEBM, or MOV video.");
    }
    if (file.size > VIDEO_MAX) {
      throw new Error("Video must be 200MB or smaller.");
    }
  }

  async function onFinish(values: { title: string; type: ProjectType }) {
    setSaving(true);
    try {
      if (!project && !mediaFile) {
        throw new Error("Please choose a file to upload.");
      }
      if (mediaFile) validateFile(mediaFile, "media");
      if (posterFile) validateFile(posterFile, "poster");
      for (const file of galleryFiles) validateFile(file, "poster");

      const galleryCap = keptGallery.length + galleryFiles.length;
      if (galleryCap > GALLERY_MAX) {
        throw new Error(`Journey images are limited to ${GALLERY_MAX}.`);
      }

      let mediaUrl = project?.media_url ?? "";
      let posterUrl = project?.poster_url ?? null;
      let storageDriver = project?.storage_driver;
      let cloudinaryPublicId = project?.cloudinary_public_id ?? null;
      let posterPublicId = project?.poster_public_id ?? null;

      if (mediaFile) {
        toast.info("Uploading file…");
        const uploaded = await uploadProjectFile(values.type, mediaFile, "media");
        mediaUrl = uploaded.publicUrl;
        storageDriver = uploaded.storageDriver;
        cloudinaryPublicId = uploaded.publicId;
      }

      if (posterFile) {
        toast.info("Uploading poster…");
        const uploaded = await uploadProjectFile(values.type, posterFile, "poster");
        posterUrl = uploaded.publicUrl;
        posterPublicId = uploaded.publicId;
      }

      if (!isVideoProjectType(values.type)) {
        posterUrl = null;
        posterPublicId = null;
      }

      const gallery: ProjectGalleryItem[] = isVideoProjectType(values.type)
        ? []
        : [...keptGallery];

      if (!isVideoProjectType(values.type) && galleryFiles.length) {
        toast.info("Uploading journey images…");
        for (const file of galleryFiles) {
          const uploaded = await uploadProjectFile(values.type, file, "media");
          gallery.push({
            url: uploaded.publicUrl,
            publicId: uploaded.publicId,
          });
        }
      }

      await saveProjectAction(project?.id ?? null, {
        title: values.title.trim(),
        type: values.type,
        media_url: mediaUrl,
        poster_url: posterUrl,
        storage_driver: storageDriver,
        cloudinary_public_id: cloudinaryPublicId,
        poster_public_id: posterPublicId,
        gallery,
      });

      setFlashToast(
        "success",
        project ? "Project updated." : "Project uploaded.",
      );
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      if (error && typeof error === "object" && "digest" in error) throw error;
      toast.error(
        error instanceof Error ? error.message : "Could not save this project.",
      );
      setSaving(false);
    }
  }

  function toFileList(file: File | null): UploadFile[] {
    if (!file) return [];
    return [{ uid: file.name, name: file.name, status: "done" }];
  }

  function galleryFileList(): UploadFile[] {
    return galleryFiles.map((file, index) => ({
      uid: `${file.name}-${index}`,
      name: file.name,
      status: "done",
    }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card
        style={{
          maxWidth: 720,
          margin: "0 auto",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Form
          layout="vertical"
          initialValues={{
            title: project?.title ?? "",
            type: project?.type ?? "brand_identity",
          }}
          onFinish={onFinish}
          onValuesChange={(_, values) => {
            if (values.type) setType(values.type);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input size="large" placeholder="Brand Story – 2024" />
          </Form.Item>

          <Form.Item label="Category" name="type" rules={[{ required: true }]}>
            <Select
              size="large"
              options={SERVICE_GROUPS.map((group) => ({
                label: SERVICE_GROUP_LABELS[group.id],
                options: group.types.map((value) => ({
                  value,
                  label: PROJECT_TYPE_LABELS[value],
                })),
              }))}
            />
          </Form.Item>

          <Form.Item
            label={isVideo ? "Video file" : "Image file"}
            extra={project ? "Leave empty to keep the current file." : undefined}
          >
            <Upload.Dragger
              maxCount={1}
              fileList={toFileList(mediaFile)}
              beforeUpload={(file) => {
                setMediaFile(file);
                return false;
              }}
              onRemove={() => setMediaFile(null)}
              accept={isVideo ? VIDEO_TYPES.join(",") : IMAGE_TYPES.join(",")}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag a file here</p>
              <p className="ant-upload-hint">
                {isVideo ? "MP4, WEBM or MOV up to 200MB" : "JPG, PNG, WEBP or GIF up to 10MB"}
              </p>
            </Upload.Dragger>
          </Form.Item>

          {isVideo ? (
            <Form.Item label="Poster image (optional)">
              <Upload
                maxCount={1}
                fileList={toFileList(posterFile)}
                beforeUpload={(file) => {
                  setPosterFile(file);
                  return false;
                }}
                onRemove={() => setPosterFile(null)}
                accept={IMAGE_TYPES.join(",")}
              >
                <Button>Choose poster</Button>
              </Upload>
            </Form.Item>
          ) : null}

          {previewUrl ? (
            <div className="mb-6 overflow-hidden rounded-2xl bg-slate-950">
              {isVideo ? (
                <video
                  src={previewUrl}
                  poster={
                    posterFile
                      ? URL.createObjectURL(posterFile)
                      : project?.poster_url ?? undefined
                  }
                  controls
                  className="max-h-72 w-full object-cover"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-72 w-full object-cover"
                />
              )}
            </div>
          ) : null}

          {showGallery ? (
            <Form.Item
              label="Journey images (optional)"
              extra={
                GALLERY_HINT[type] ??
                "Extra stills for the type-specific page. The main file stays the hero."
              }
            >
              {keptGallery.length ? (
                <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {keptGallery.map((item) => (
                    <div
                      key={item.url}
                      className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-950"
                    >
                      <img
                        src={item.url}
                        alt=""
                        className="aspect-square w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                        onClick={() =>
                          setKeptGallery((current) =>
                            current.filter((entry) => entry.url !== item.url),
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              <Upload
                multiple
                fileList={galleryFileList()}
                beforeUpload={(file) => {
                  setGalleryFiles((current) => {
                    if (keptGallery.length + current.length >= GALLERY_MAX) {
                      toast.error(`Journey images are limited to ${GALLERY_MAX}.`);
                      return current;
                    }
                    return [...current, file];
                  });
                  return false;
                }}
                onRemove={(file) => {
                  setGalleryFiles((current) =>
                    current.filter((entry, index) => `${entry.name}-${index}` !== file.uid),
                  );
                }}
                accept={IMAGE_TYPES.join(",")}
              >
                <Button>Add images</Button>
              </Upload>
            </Form.Item>
          ) : null}

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            {project ? "Save changes" : "Upload project"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}
