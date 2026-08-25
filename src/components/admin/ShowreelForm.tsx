"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Upload, type UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { setFlashToast } from "@/lib/admin-toast";
import { uploadProjectFile } from "@/lib/storage";
import {
  saveShowreel,
  type Showreel,
  type ShowreelCopy,
} from "@/lib/settings";

const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const VIDEO_MAX = 200 * 1024 * 1024;

export default function ShowreelForm({ current }: { current: Showreel }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const previewUrl = file ? URL.createObjectURL(file) : current.media_url;

  async function onFinish(values: ShowreelCopy) {
    if (!file && !current.media_url) {
      toast.error("Please choose a video.");
      return;
    }
    setSaving(true);
    try {
      let mediaUrl = current.media_url;
      let storageDriver = current.storage_driver;
      let publicId = current.cloudinary_public_id;

      if (file) {
        if (!VIDEO_TYPES.includes(file.type)) {
          throw new Error("Use an MP4, WEBM, or MOV video.");
        }
        if (file.size > VIDEO_MAX) {
          throw new Error("Video must be 200MB or smaller.");
        }
        toast.info("Uploading compilation video…");
        const uploaded = await uploadProjectFile("videos", file, "media");
        mediaUrl = uploaded.publicUrl;
        storageDriver = uploaded.storageDriver;
        publicId = uploaded.publicId;
      }

      await saveShowreel({
        media_url: mediaUrl,
        poster_url: current.poster_url,
        storage_driver: storageDriver,
        cloudinary_public_id: publicId,
        copy: {
          eyebrowEn: values.eyebrowEn.trim(),
          eyebrowAr: values.eyebrowAr.trim(),
          titleEn: values.titleEn.trim(),
          titleAr: values.titleAr.trim(),
        },
      });

      setFlashToast("success", "Showreel updated.");
      router.refresh();
      toast.success("Showreel updated. Open the homepage to check it.");
      setSaving(false);
      setFile(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save the showreel.",
      );
      setSaving(false);
    }
  }

  function toFileList(picked: File | null): UploadFile[] {
    if (!picked) return [];
    return [{ uid: picked.name, name: picked.name, status: "done" }];
  }

  return (
    <motion.div
      className="mx-auto max-w-2xl"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] md:p-8">
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={current.copy}
        >
          <Form.Item
            label="Compilation video"
            extra="MP4, WEBM or MOV up to 200MB. This is the home showreel — use a cut of real work, not the intro clip. Leave empty to keep the current file."
          >
            <Upload.Dragger
              maxCount={1}
              fileList={toFileList(file)}
              beforeUpload={(picked) => {
                setFile(picked);
                return false;
              }}
              onRemove={() => setFile(null)}
              accept={VIDEO_TYPES.join(",")}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag a compilation video here</p>
            </Upload.Dragger>
          </Form.Item>

          {previewUrl ? (
            <div className="mb-6 overflow-hidden rounded-2xl bg-black">
              <video
                key={previewUrl}
                src={previewUrl}
                controls
                className="max-h-80 w-full object-cover"
              />
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            <Form.Item
              name="eyebrowEn"
              label="Eyebrow (English)"
              rules={[{ required: true, message: "Add the English eyebrow." }]}
            >
              <Input placeholder="Visual Proof" />
            </Form.Item>
            <Form.Item
              name="eyebrowAr"
              label="Eyebrow (Arabic)"
              rules={[{ required: true, message: "Add the Arabic eyebrow." }]}
            >
              <Input placeholder="الدليل البصري" dir="rtl" />
            </Form.Item>
            <Form.Item
              name="titleEn"
              label="Title (English)"
              rules={[{ required: true, message: "Add the English title." }]}
            >
              <Input placeholder="SHOWREEL" />
            </Form.Item>
            <Form.Item
              name="titleAr"
              label="Title (Arabic)"
              rules={[{ required: true, message: "Add the Arabic title." }]}
            >
              <Input placeholder="عرض الأعمال" dir="rtl" />
            </Form.Item>
          </div>

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save showreel
          </Button>
        </Form>
      </div>
    </motion.div>
  );
}
