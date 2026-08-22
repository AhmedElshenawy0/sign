"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Upload, type UploadFile } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { setFlashToast } from "@/lib/admin-toast";
import { uploadProjectFile } from "@/lib/storage";
import { saveIntroVideo, type IntroVideo } from "@/lib/settings";

const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const VIDEO_MAX = 200 * 1024 * 1024;

export default function IntroVideoForm({ current }: { current: IntroVideo }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const previewUrl = file ? URL.createObjectURL(file) : current.media_url;

  async function onFinish() {
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
        toast.info("Uploading video…");
        const uploaded = await uploadProjectFile("videos", file, "media");
        mediaUrl = uploaded.publicUrl;
        storageDriver = uploaded.storageDriver;
        publicId = uploaded.publicId;
      }

      await saveIntroVideo({
        media_url: mediaUrl,
        poster_url: current.poster_url,
        storage_driver: storageDriver,
        cloudinary_public_id: publicId,
      });

      setFlashToast("success", "Intro video updated.");
      router.refresh();
      toast.success("Intro video updated. Open the homepage to check it.");
      setSaving(false);
      setFile(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not save the intro video.",
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
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Intro background video"
            extra="MP4, WEBM or MOV up to 200MB. Leave empty to keep the current file."
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
              <p className="ant-upload-text">Click or drag a video here</p>
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

          <Button type="primary" htmlType="submit" size="large" loading={saving}>
            Save intro video
          </Button>
        </Form>
      </div>
    </motion.div>
  );
}
