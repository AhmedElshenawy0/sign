import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorageDriver } from "@prisma/client";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

function applyCloudinaryConfig() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

applyCloudinaryConfig();

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function cloudinaryErrorMessage(error: unknown): string {
  const raw =
    error instanceof Error
      ? error.message
      : error && typeof error === "object"
        ? String(
            (error as { message?: unknown; error?: { message?: unknown } }).message ??
              (error as { error?: { message?: unknown } }).error?.message ??
              "",
          )
        : "";

  if (/cloud_name|Must supply cloud_name/i.test(raw)) {
    return "Cloudinary cloud name is invalid. In the Cloudinary dashboard copy Cloud name (not the account display name) into CLOUDINARY_CLOUD_NAME, then restart the API.";
  }
  if (raw.trim()) return raw.trim();
  return "Cloudinary upload failed.";
}

export async function uploadImageToCloudinary(filePath: string, folder: string) {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured. Add CLOUDINARY_* keys in server/.env");
  }

  applyCloudinaryConfig();

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "image",
    });

    await fs.unlink(filePath).catch(() => undefined);

    return {
      url: result.secure_url,
      publicId: result.public_id,
      driver: "cloudinary" as StorageDriver,
    };
  } catch (error) {
    throw new Error(cloudinaryErrorMessage(error));
  }
}

export async function saveLocalImage(filePath: string, originalName: string) {
  const imagesDir = path.join(UPLOADS_DIR, "images");
  await fs.mkdir(imagesDir, { recursive: true });
  const ext = path.extname(originalName) || ".png";
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const dest = path.join(imagesDir, filename);
  await fs.rename(filePath, dest).catch(async () => {
    await fs.copyFile(filePath, dest);
    await fs.unlink(filePath).catch(() => undefined);
  });

  return {
    url: `/uploads/images/${filename}`,
    publicId: null as string | null,
    driver: "local" as StorageDriver,
  };
}

export async function saveLocalVideo(filePath: string, originalName: string) {
  const videosDir = path.join(UPLOADS_DIR, "videos");
  await fs.mkdir(videosDir, { recursive: true });
  const ext = path.extname(originalName) || ".mp4";
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  const dest = path.join(videosDir, filename);
  await fs.rename(filePath, dest).catch(async () => {
    await fs.copyFile(filePath, dest);
    await fs.unlink(filePath).catch(() => undefined);
  });

  return {
    url: `/uploads/videos/${filename}`,
    publicId: null as string | null,
    driver: "local" as StorageDriver,
  };
}

export async function removeStoredFile(options: {
  driver: StorageDriver;
  url: string | null | undefined;
  publicId?: string | null;
}) {
  if (!options.url) return;

  if (options.driver === "cloudinary" && options.publicId && isCloudinaryConfigured()) {
    const isVideo =
      /\/video\/upload\//.test(options.url) ||
      /\.(mp4|webm|mov)(\?|$)/i.test(options.url);
    await cloudinary.uploader
      .destroy(options.publicId, { resource_type: isVideo ? "video" : "image" })
      .catch(() => undefined);
    return;
  }

  if (options.driver === "local" && options.url.startsWith("/uploads/")) {
    const relative = options.url.replace(/^\/uploads\//, "");
    const filePath = path.join(UPLOADS_DIR, relative);
    await fs.unlink(filePath).catch(() => undefined);
  }
}
