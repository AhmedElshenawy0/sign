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
  PROJECT_TYPES,
  type Project,
  type ProjectType,
} from "@/types/project";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const IMAGE_MAX = 10 * 1024 * 1024;
const VIDEO_MAX = 200 * 1024 * 1024;

type Props = {
  project?: Project;
};

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [type, setType] = useState<ProjectType>(project?.type ?? "logos");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const isVideo = type === "videos";
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

      if (values.type !== "videos") {
        posterUrl = null;
        posterPublicId = null;
      }

      await saveProjectAction(project?.id ?? null, {
        title: values.title.trim(),
        type: values.type,
        media_url: mediaUrl,
        poster_url: posterUrl,
        storage_driver: storageDriver,
        cloudinary_public_id: cloudinaryPublicId,
        poster_public_id: posterPublicId,
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
            type: project?.type ?? "logos",
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
              options={PROJECT_TYPES.map((value) => ({
                value,
                label: PROJECT_TYPE_LABELS[value],
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

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            {project ? "Save changes" : "Upload project"}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}
