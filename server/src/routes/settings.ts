import { Router } from "express";
import type { StorageDriver } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { removeStoredFile } from "../lib/storage.js";

export const INTRO_KEY = "intro_video";
export const DEFAULT_INTRO_URL = "/videos/intro.mp4";

function toJson(row: {
  key: string;
  mediaUrl: string;
  posterUrl: string | null;
  storageDriver: StorageDriver;
  cloudinaryPublicId: string | null;
  updatedAt: Date;
}) {
  return {
    key: row.key,
    media_url: row.mediaUrl,
    poster_url: row.posterUrl,
    storage_driver: row.storageDriver,
    cloudinary_public_id: row.cloudinaryPublicId,
    updated_at: row.updatedAt.toISOString(),
  };
}

export const settingsRouter = Router();

settingsRouter.get("/intro", async (_req, res) => {
  const row = await prisma.siteSetting.findUnique({ where: { key: INTRO_KEY } });
  if (!row) {
    res.json({
      key: INTRO_KEY,
      media_url: DEFAULT_INTRO_URL,
      poster_url: null,
      storage_driver: "public_asset",
      cloudinary_public_id: null,
      updated_at: null,
    });
    return;
  }
  res.json(toJson(row));
});

settingsRouter.put("/intro", requireAuth, async (req, res) => {
  const mediaUrl = String(req.body?.media_url ?? "").trim();
  if (!mediaUrl) {
    res.status(400).json({ error: "media_url is required." });
    return;
  }

  const existing = await prisma.siteSetting.findUnique({ where: { key: INTRO_KEY } });
  const storageDriver = (req.body?.storage_driver as StorageDriver) ?? "local";
  const posterUrl = req.body?.poster_url ? String(req.body.poster_url) : null;
  const cloudinaryPublicId = req.body?.cloudinary_public_id ?? null;

  if (existing && existing.mediaUrl !== mediaUrl) {
    await removeStoredFile({
      driver: existing.storageDriver,
      url: existing.mediaUrl,
      publicId: existing.cloudinaryPublicId,
    });
  }

  const row = await prisma.siteSetting.upsert({
    where: { key: INTRO_KEY },
    create: {
      key: INTRO_KEY,
      mediaUrl,
      posterUrl,
      storageDriver,
      cloudinaryPublicId,
    },
    update: {
      mediaUrl,
      posterUrl,
      storageDriver,
      cloudinaryPublicId,
    },
  });

  res.json(toJson(row));
});
