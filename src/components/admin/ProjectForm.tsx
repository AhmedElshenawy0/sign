"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Upload,
  type UploadFile,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  Award,
  Circle,
  Compass,
  CreditCard,
  Film,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Newspaper,
  Package,
  Share2,
  Sparkles,
} from "lucide-react";
import { saveProjectAction } from "@/app/admin/projects/actions";
import { setFlashToast, toast } from "@/lib/admin-toast";
import { ADMIN_COPY } from "@/lib/admin-copy";
import { slotsForType, splitGallery } from "@/lib/journey-slots";
import AdminFormCard, { FormSection } from "@/components/admin/AdminFormCard";
import { uploadProjectFile } from "@/lib/storage";
import {
  PROJECT_TYPE_LABELS,
  SERVICE_GROUPS,
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

const TYPE_ICONS: Record<ProjectType, typeof Sparkles> = {
  brand_identity: Sparkles,
  packaging: Package,
  prints: Newspaper,
  social_media: Share2,
  outdoors: MapPin,
  brand_strategy: Compass,
  marketing_strategy: Megaphone,
  photos: ImageIcon,
  videos: Film,
  nfc_card: CreditCard,
  nfc_ring: Circle,
  nfc_medal: Award,
};

const CATEGORY_GROUP_LABELS: Record<(typeof SERVICE_GROUPS)[number]["id"], string> = {
  branding: "Branding",
  marketing: "Marketing",
  photoVideo: "Photo & Video",
  nfc: "NFC",
};

function CategoryPicker({
  value,
  onChange,
}: {
  value?: ProjectType;
  onChange?: (value: ProjectType) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {SERVICE_GROUPS.map((group) => (
        <div
          key={group.id}
          className="rounded-[16px] border border-white/10 bg-white/[0.03] p-3.5"
        >
          <p className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
            {CATEGORY_GROUP_LABELS[group.id]}
          </p>
          <div className="flex flex-col gap-2">
            {group.types.map((type) => {
              const selected = value === type;
              const Icon = TYPE_ICONS[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange?.(type)}
                  className={`flex h-12 items-center gap-3 rounded-[12px] border px-3.5 text-left text-[14px] font-semibold leading-none tracking-[-0.01em] transition ${
                    selected
                      ? "border-[#0e985d] bg-[#0e985d] text-white shadow-[0_8px_20px_rgba(14,152,93,0.28)]"
                      : "border-white/10 bg-[#070b14] text-slate-300 hover:border-[#0e985d]/45 hover:bg-[#0e985d]/10 hover:text-white"
                  }`}
                >
                  <Icon size={16} strokeWidth={2} className="shrink-0" />
                  <span className="truncate">{PROJECT_TYPE_LABELS[type]}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function slotMeta(role: string) {
  return (
    ADMIN_COPY.project.slots[role] ?? {
      label: role.replace(/_/g, " "),
      hint: "",
    }
  );
}

function SlotCard({
  role,
  kept,
  file,
  caption,
  onFile,
  onClear,
  onCaption,
}: {
  role: string;
  kept?: ProjectGalleryItem;
  file?: File;
  caption: string;
  onFile: (file: File) => void;
  onClear: () => void;
  onCaption: (value: string) => void;
}) {
  const meta = slotMeta(role);
  const preview = file ? URL.createObjectURL(file) : kept?.url;

  return (
    <div className="flex h-full flex-col rounded-[16px] border border-white/10 bg-[#070b14] p-4">
      <p className="text-[14px] font-semibold leading-none tracking-[-0.01em] text-white">
        {meta.label}
      </p>
      <p className="mt-2 min-h-10 text-[13px] leading-5 text-slate-400">
        {meta.hint}
      </p>
      {preview ? (
        <div className="relative mt-4 overflow-hidden rounded-[12px] border border-white/10 bg-slate-950">
          <img src={preview} alt={meta.label} className="aspect-[4/3] w-full object-cover" />
          <button
            type="button"
            className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
            onClick={onClear}
          >
            {ADMIN_COPY.project.galleryRemove}
          </button>
        </div>
      ) : (
        <div className="mt-4 flex min-h-[96px] items-center justify-center rounded-[12px] border border-dashed border-white/15 px-4 text-center text-[13px] leading-5 text-slate-500">
          {ADMIN_COPY.project.slotEmpty}
        </div>
      )}
      <Upload
        maxCount={1}
        fileList={file ? [{ uid: file.name, name: file.name, status: "done" }] : []}
        beforeUpload={(next) => {
          onFile(next);
          return false;
        }}
        onRemove={() => onClear()}
        accept={IMAGE_TYPES.join(",")}
        className="mt-3"
      >
        <Button block>{ADMIN_COPY.project.slotChoose}</Button>
      </Upload>
      <p className="mb-1.5 mt-4 text-[12px] font-semibold leading-none text-slate-400">
        {ADMIN_COPY.project.slotCaption}
      </p>
      <Input.TextArea
        rows={2}
        maxLength={280}
        value={caption}
        onChange={(event) => onCaption(event.target.value)}
        placeholder={ADMIN_COPY.project.slotCaptionPlaceholder}
      />
    </div>
  );
}

type Props = {
  project?: Project;
};

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [type, setType] = useState<ProjectType>(project?.type ?? "brand_identity");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [story, setStory] = useState(project?.story ?? "");
  const initialSplit = splitGallery(
    project?.type ?? "brand_identity",
    galleryItems(project ?? { gallery: [] }),
  );
  const [slotKept, setSlotKept] = useState<Record<string, ProjectGalleryItem>>(
    initialSplit.slotted,
  );
  const [slotFiles, setSlotFiles] = useState<Record<string, File>>({});
  const [slotCaptions, setSlotCaptions] = useState<Record<string, string>>(() => {
    const next: Record<string, string> = {};
    for (const [role, item] of Object.entries(initialSplit.slotted)) {
      if (item.caption) next[role] = item.caption;
    }
    return next;
  });
  const [extraKept, setExtraKept] = useState<ProjectGalleryItem[]>(initialSplit.extras);
  const [extraFiles, setExtraFiles] = useState<File[]>([]);
  const [extraCaptions, setExtraCaptions] = useState<Record<string, string>>(() => {
    const next: Record<string, string> = {};
    for (const item of initialSplit.extras) {
      if (item.caption) next[item.url] = item.caption;
    }
    return next;
  });
  const [extraFileCaptions, setExtraFileCaptions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const isVideo = isVideoProjectType(type);
  const showGallery = supportsProjectGallery(type);
  const roles = slotsForType(type);
  const previewUrl = mediaFile
    ? URL.createObjectURL(mediaFile)
    : project?.media_url;
  const heroLabel = isVideo
    ? ADMIN_COPY.project.videoLabel
    : (ADMIN_COPY.project.heroLabels[type] ?? ADMIN_COPY.project.imageLabel);
  const heroHint = isVideo
    ? ADMIN_COPY.project.videoHint
    : (ADMIN_COPY.project.heroHints[type] ?? ADMIN_COPY.project.imageHint);

  function filledGalleryCount(nextType = type) {
    const nextRoles = slotsForType(nextType);
    let count = extraKept.length + extraFiles.length;
    for (const role of nextRoles) {
      if (slotFiles[role] || slotKept[role]) count += 1;
    }
    return count;
  }

  function remapType(next: ProjectType) {
    const items = [...Object.values(slotKept), ...extraKept];
    const split = splitGallery(next, items);
    setSlotKept(split.slotted);
    setExtraKept(split.extras);
    setSlotCaptions((current) => {
      const nextCaps: Record<string, string> = {};
      for (const role of slotsForType(next)) {
        if (current[role]) nextCaps[role] = current[role];
        else if (split.slotted[role]?.caption) nextCaps[role] = split.slotted[role].caption ?? "";
      }
      return nextCaps;
    });
    setSlotFiles((current) => {
      const allowed = new Set(slotsForType(next));
      const kept: Record<string, File> = {};
      const leftover: File[] = [];
      const leftoverCaps: string[] = [];
      for (const [role, file] of Object.entries(current)) {
        if (!file) continue;
        if (allowed.has(role)) kept[role] = file;
        else {
          leftover.push(file);
          leftoverCaps.push(slotCaptions[role] ?? "");
        }
      }
      if (leftover.length) {
        setExtraFiles((files) => [...files, ...leftover]);
        setExtraFileCaptions((caps) => [...caps, ...leftoverCaps]);
      }
      return kept;
    });
    setType(next);
  }

  function isAllowedImage(file: File) {
    if (IMAGE_TYPES.includes(file.type)) return true;
    return /\.(jpe?g|png|webp|gif)$/i.test(file.name);
  }

  function validateFile(file: File, kind: "media" | "poster") {
    if (kind === "poster" || !isVideo) {
      if (!isAllowedImage(file)) {
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

  function assignSlotFile(role: string, file: File) {
    if (!slotFiles[role] && !slotKept[role] && filledGalleryCount() >= GALLERY_MAX) {
      toast.error(`Journey images are limited to ${GALLERY_MAX}.`);
      return;
    }
    try {
      validateFile(file, "poster");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not use that file.");
      return;
    }
    setSlotFiles((current) => ({ ...current, [role]: file }));
  }

  function clearSlot(role: string) {
    setSlotFiles((current) => {
      const next = { ...current };
      delete next[role];
      return next;
    });
    setSlotKept((current) => {
      const next = { ...current };
      delete next[role];
      return next;
    });
  }

  async function onFinish(values: { title: string; type: ProjectType }) {
    setSaving(true);
    try {
      if (!project && !mediaFile) {
        throw new Error("Please choose a file to upload.");
      }
      if (mediaFile) validateFile(mediaFile, "media");
      if (posterFile) validateFile(posterFile, "poster");

      const galleryCap = filledGalleryCount(values.type);
      if (galleryCap > GALLERY_MAX) {
        throw new Error(`Journey images are limited to ${GALLERY_MAX}.`);
      }

      let mediaUrl = project?.media_url ?? "";
      let posterUrl = project?.poster_url ?? null;
      let storageDriver = project?.storage_driver;
      let cloudinaryPublicId = project?.cloudinary_public_id ?? null;
      let posterPublicId = project?.poster_public_id ?? null;
      let warnedLocal = false;

      async function storeFile(file: File, kind: "media" | "poster") {
        const uploaded = await uploadProjectFile(values.type, file, kind);
        const localStill =
          uploaded.storageDriver === "local" &&
          (kind === "poster" || !isVideoProjectType(values.type));
        if (!warnedLocal && (uploaded.warning || localStill)) {
          warnedLocal = true;
          toast.warn(
            uploaded.warning ||
              "Cloudinary is not working. Images are saved on this computer only.",
          );
        }
        return uploaded;
      }

      if (mediaFile) {
        toast.info("Uploading file…");
        const uploaded = await storeFile(mediaFile, "media");
        mediaUrl = uploaded.publicUrl;
        storageDriver = uploaded.storageDriver;
        cloudinaryPublicId = uploaded.publicId;
      }

      if (posterFile) {
        toast.info("Uploading poster…");
        const uploaded = await storeFile(posterFile, "poster");
        posterUrl = uploaded.publicUrl;
        posterPublicId = uploaded.publicId;
      }

      if (!isVideoProjectType(values.type)) {
        posterUrl = null;
        posterPublicId = null;
      }

      const gallery: ProjectGalleryItem[] = [];

      if (!isVideoProjectType(values.type)) {
        const nextRoles = slotsForType(values.type);
        const hasNewStills =
          nextRoles.some((role) => Boolean(slotFiles[role])) || extraFiles.length > 0;
        if (hasNewStills) toast.info("Uploading journey images…");

        for (const role of nextRoles) {
          const file = slotFiles[role];
          const caption = slotCaptions[role]?.trim() || undefined;
          if (file) {
            validateFile(file, "poster");
            const uploaded = await storeFile(file, "media");
            gallery.push({
              url: uploaded.publicUrl,
              publicId: uploaded.publicId,
              role,
              caption,
            });
          } else if (slotKept[role]) {
            gallery.push({
              url: slotKept[role].url,
              publicId: slotKept[role].publicId,
              role,
              caption,
            });
          }
        }

        for (const item of extraKept) {
          if (gallery.some((entry) => entry.url === item.url)) continue;
          const caption = extraCaptions[item.url]?.trim() || item.caption;
          gallery.push({
            url: item.url,
            publicId: item.publicId,
            role: item.role,
            caption,
          });
        }

        for (const [index, file] of extraFiles.entries()) {
          validateFile(file, "poster");
          const uploaded = await storeFile(file, "media");
          const caption = extraFileCaptions[index]?.trim() || undefined;
          gallery.push({
            url: uploaded.publicUrl,
            publicId: uploaded.publicId,
            caption,
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
        story: story.trim(),
      });

      const message = project
        ? ADMIN_COPY.project.updatedToast
        : ADMIN_COPY.project.createdToast;
      setFlashToast("success", message);
      toast.success(message);
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      if (error && typeof error === "object" && "digest" in error) throw error;
      toast.error(
        error instanceof Error
          ? error.message
          : project
            ? "Could not update this project."
            : "Could not create this project.",
      );
      setSaving(false);
    }
  }

  function toFileList(file: File | null): UploadFile[] {
    if (!file) return [];
    return [{ uid: file.name, name: file.name, status: "done" }];
  }

  function extraFileList(): UploadFile[] {
    return extraFiles.map((file, index) => ({
      uid: `${file.name}-${index}`,
      name: file.name,
      status: "done",
    }));
  }

  return (
    <AdminFormCard className="mx-auto w-full max-w-6xl">
      <Form
          layout="vertical"
          initialValues={{
            title: project?.title ?? "",
            type: project?.type ?? "brand_identity",
          }}
          onFinish={onFinish}
          onValuesChange={(_, values) => {
            if (values.type && values.type !== type) remapType(values.type);
          }}
        >
          <FormSection
            kicker={ADMIN_COPY.project.detailsKicker}
            hint={ADMIN_COPY.project.detailsHint}
          >
            <Form.Item
              label={ADMIN_COPY.project.titleLabel}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input size="large" placeholder={ADMIN_COPY.project.titlePlaceholder} />
            </Form.Item>
            <Form.Item
              label={ADMIN_COPY.project.categoryLabel}
              name="type"
              rules={[{ required: true }]}
              className="mb-0"
            >
              <CategoryPicker />
            </Form.Item>
          </FormSection>

          <div className="grid gap-8 xl:grid-cols-2">
          <FormSection kicker={ADMIN_COPY.project.mediaKicker} className="xl:mb-0 xl:border-0 xl:pb-0">
          <Form.Item
            label={heroLabel}
            extra={project ? `${ADMIN_COPY.project.keepFile} ${heroHint}` : heroHint}
            className="mb-0"
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
              <p className="ant-upload-text">{ADMIN_COPY.project.dropFile}</p>
              <p className="ant-upload-hint">
                {isVideo ? ADMIN_COPY.project.videoHint : ADMIN_COPY.project.imageHint}
              </p>
            </Upload.Dragger>
          </Form.Item>

          {isVideo ? (
            <Form.Item label={ADMIN_COPY.project.posterLabel} className="mt-5 mb-0">
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
                <Button>{ADMIN_COPY.project.posterButton}</Button>
              </Upload>
            </Form.Item>
          ) : null}

          {previewUrl ? (
            <div className="mt-5 overflow-hidden rounded-[16px] bg-slate-950">
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
          </FormSection>

          <FormSection
            kicker={ADMIN_COPY.project.storyKicker}
            hint={ADMIN_COPY.project.storyHint}
            className="xl:mb-0 xl:border-0 xl:pb-0"
          >
            <Form.Item label={ADMIN_COPY.project.storyLabel} className="mb-0">
              <Input.TextArea
                rows={7}
                maxLength={2000}
                value={story}
                onChange={(event) => setStory(event.target.value)}
                placeholder={
                  ADMIN_COPY.project.storyPlaceholders[type] ??
                  ADMIN_COPY.project.storyPlaceholder
                }
              />
            </Form.Item>
          </FormSection>
          </div>

          {showGallery ? (
            <FormSection
              kicker={ADMIN_COPY.project.galleryKicker}
              hint={
                ADMIN_COPY.project.galleryHints[type] ??
                ADMIN_COPY.project.galleryFallback
              }
              className="mb-0 border-0 pb-0"
            >
              {roles.length ? (
                <div className="mb-6 grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {roles.map((role) => (
                    <SlotCard
                      key={role}
                      role={role}
                      kept={slotKept[role]}
                      file={slotFiles[role]}
                      caption={slotCaptions[role] ?? ""}
                      onFile={(file) => assignSlotFile(role, file)}
                      onClear={() => clearSlot(role)}
                      onCaption={(value) =>
                        setSlotCaptions((current) => ({ ...current, [role]: value }))
                      }
                    />
                  ))}
                </div>
              ) : null}

              {extraKept.length ? (
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {extraKept.map((item) => (
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
                          setExtraKept((current) =>
                            current.filter((entry) => entry.url !== item.url),
                          )
                        }
                      >
                        {ADMIN_COPY.project.galleryRemove}
                      </button>
                      <div className="p-2">
                        <Input
                          size="small"
                          value={extraCaptions[item.url] ?? item.caption ?? ""}
                          placeholder={ADMIN_COPY.project.slotCaption}
                          onChange={(event) =>
                            setExtraCaptions((current) => ({
                              ...current,
                              [item.url]: event.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <p className="mb-2 text-[12px] font-semibold text-slate-300">
                {ADMIN_COPY.project.galleryMore}
              </p>
              <p className="mb-3 text-[12px] text-slate-500">
                {ADMIN_COPY.project.galleryMoreHint}
              </p>
              <Upload
                multiple
                fileList={extraFileList()}
                beforeUpload={(file) => {
                  if (filledGalleryCount() >= GALLERY_MAX) {
                    toast.error(`Journey images are limited to ${GALLERY_MAX}.`);
                    return false;
                  }
                  try {
                    validateFile(file, "poster");
                  } catch (error) {
                    toast.error(
                      error instanceof Error ? error.message : "Could not use that file.",
                    );
                    return false;
                  }
                  setExtraFiles((current) => [...current, file]);
                  setExtraFileCaptions((current) => [...current, ""]);
                  return false;
                }}
                onRemove={(file) => {
                  setExtraFiles((current) => {
                    const index = current.findIndex(
                      (entry, entryIndex) => `${entry.name}-${entryIndex}` === file.uid,
                    );
                    if (index < 0) return current;
                    setExtraFileCaptions((captions) =>
                      captions.filter((_, captionIndex) => captionIndex !== index),
                    );
                    return current.filter((_, entryIndex) => entryIndex !== index);
                  });
                }}
                accept={IMAGE_TYPES.join(",")}
              >
                <Button>{ADMIN_COPY.project.galleryAdd}</Button>
              </Upload>
              {extraFiles.length ? (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {extraFiles.map((file, index) => (
                    <Input
                      key={`${file.name}-${index}`}
                      size="small"
                      value={extraFileCaptions[index] ?? ""}
                      placeholder={`${file.name} — ${ADMIN_COPY.project.slotCaption}`}
                      onChange={(event) =>
                        setExtraFileCaptions((current) => {
                          const next = [...current];
                          next[index] = event.target.value;
                          return next;
                        })
                      }
                    />
                  ))}
                </div>
              ) : null}
            </FormSection>
          ) : null}

          <div className="mt-8 flex border-t border-white/10 pt-6">
            <Button type="primary" htmlType="submit" size="large" loading={saving} className="h-12 w-full sm:w-auto sm:min-w-[200px]">
              {saving
                ? project
                  ? ADMIN_COPY.project.updating
                  : ADMIN_COPY.project.creating
                : project
                  ? ADMIN_COPY.project.save
                  : ADMIN_COPY.project.upload}
            </Button>
          </div>
        </Form>
    </AdminFormCard>
  );
}
