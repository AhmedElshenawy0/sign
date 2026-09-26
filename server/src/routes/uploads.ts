import { Router } from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  saveLocalImage,
  saveLocalVideo,
  uploadImageToCloudinary,
  UPLOADS_DIR,
} from "../lib/storage.js";

const tmpDir = path.join(UPLOADS_DIR, "tmp");
fs.mkdirSync(tmpDir, { recursive: true });
fs.mkdirSync(path.join(UPLOADS_DIR, "videos"), { recursive: true });
fs.mkdirSync(path.join(UPLOADS_DIR, "images"), { recursive: true });

const upload = multer({
  dest: tmpDir,
  limits: { fileSize: 200 * 1024 * 1024 },
});

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

function isImageUpload(file: Express.Multer.File) {
  if (IMAGE_TYPES.has(file.mimetype)) return true;
  return /\.(jpe?g|png|webp|gif)$/i.test(file.originalname);
}

function isVideoUpload(file: Express.Multer.File) {
  if (VIDEO_TYPES.has(file.mimetype)) return true;
  return /\.(mp4|webm|mov)$/i.test(file.originalname);
}

export const uploadsRouter = Router();

uploadsRouter.post("/", requireAuth, upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "No file uploaded." });
    return;
  }

  const kind = String(req.body?.kind ?? "media");
  const projectType = String(req.body?.type ?? "brand_identity");
  const isVideo = projectType === "videos" && kind === "media";

  try {
    if (isVideo) {
      if (!isVideoUpload(file)) {
        throw new Error("Use an MP4, WEBM, or MOV video.");
      }
      const stored = await saveLocalVideo(file.path, file.originalname);
      res.json({
        publicUrl: stored.url,
        publicId: stored.publicId,
        storageDriver: stored.driver,
      });
      return;
    }

    if (!isImageUpload(file)) {
      throw new Error("Use a JPG, PNG, WEBP, or GIF image.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Image must be 10MB or smaller.");
    }

    const folder = kind === "poster" ? "signup/posters" : `signup/${projectType}`;
    try {
      const stored = await uploadImageToCloudinary(file.path, folder);
      res.json({
        publicUrl: stored.url,
        publicId: stored.publicId,
        storageDriver: stored.driver,
      });
    } catch (cloudError) {
      const stored = await saveLocalImage(file.path, file.originalname);
      res.json({
        publicUrl: stored.url,
        publicId: stored.publicId,
        storageDriver: stored.driver,
        warning:
          cloudError instanceof Error
            ? cloudError.message
            : "Cloudinary is not working. File saved on this computer only.",
      });
    }
  } catch (error) {
    await fs.promises.unlink(file.path).catch(() => undefined);
    res.status(400).json({
      error: error instanceof Error ? error.message : "Upload failed.",
    });
  }
});
