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

export const SHOWREEL_KEY = "showreel_video";
export const DEFAULT_SHOWREEL_URL = "/videos/intro.mp4";

export type ShowreelCopy = {
  eyebrowEn: string;
  eyebrowAr: string;
  titleEn: string;
  titleAr: string;
};

export const DEFAULT_SHOWREEL_COPY: ShowreelCopy = {
  eyebrowEn: "Visual Proof",
  eyebrowAr: "الدليل البصري",
  titleEn: "SHOWREEL",
  titleAr: "عرض الأعمال",
};

function parseCopy(value: unknown): ShowreelCopy {
  const raw =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  return {
    eyebrowEn:
      String(raw.eyebrowEn ?? DEFAULT_SHOWREEL_COPY.eyebrowEn).trim() ||
      DEFAULT_SHOWREEL_COPY.eyebrowEn,
    eyebrowAr:
      String(raw.eyebrowAr ?? DEFAULT_SHOWREEL_COPY.eyebrowAr).trim() ||
      DEFAULT_SHOWREEL_COPY.eyebrowAr,
    titleEn:
      String(raw.titleEn ?? DEFAULT_SHOWREEL_COPY.titleEn).trim() ||
      DEFAULT_SHOWREEL_COPY.titleEn,
    titleAr:
      String(raw.titleAr ?? DEFAULT_SHOWREEL_COPY.titleAr).trim() ||
      DEFAULT_SHOWREEL_COPY.titleAr,
  };
}

function toShowreelJson(row: {
  key: string;
  mediaUrl: string;
  posterUrl: string | null;
  storageDriver: StorageDriver;
  cloudinaryPublicId: string | null;
  copy: unknown;
  updatedAt: Date;
}) {
  return {
    key: row.key,
    media_url: row.mediaUrl,
    poster_url: row.posterUrl,
    storage_driver: row.storageDriver,
    cloudinary_public_id: row.cloudinaryPublicId,
    copy: parseCopy(row.copy),
    updated_at: row.updatedAt.toISOString(),
  };
}

settingsRouter.get("/showreel", async (_req, res) => {
  const row = await prisma.siteSetting.findUnique({ where: { key: SHOWREEL_KEY } });
  if (!row) {
    res.json({
      key: SHOWREEL_KEY,
      media_url: DEFAULT_SHOWREEL_URL,
      poster_url: null,
      storage_driver: "public_asset",
      cloudinary_public_id: null,
      copy: DEFAULT_SHOWREEL_COPY,
      updated_at: null,
    });
    return;
  }
  res.json(toShowreelJson(row));
});

settingsRouter.put("/showreel", requireAuth, async (req, res) => {
  const mediaUrl = String(req.body?.media_url ?? "").trim();
  if (!mediaUrl) {
    res.status(400).json({ error: "media_url is required." });
    return;
  }

  const existing = await prisma.siteSetting.findUnique({ where: { key: SHOWREEL_KEY } });
  const storageDriver = (req.body?.storage_driver as StorageDriver) ?? "local";
  const posterUrl = req.body?.poster_url ? String(req.body.poster_url) : null;
  const cloudinaryPublicId = req.body?.cloudinary_public_id ?? null;
  const copy = parseCopy(req.body?.copy);

  if (existing && existing.mediaUrl !== mediaUrl) {
    await removeStoredFile({
      driver: existing.storageDriver,
      url: existing.mediaUrl,
      publicId: existing.cloudinaryPublicId,
    });
  }

  const row = await prisma.siteSetting.upsert({
    where: { key: SHOWREEL_KEY },
    create: {
      key: SHOWREEL_KEY,
      mediaUrl,
      posterUrl,
      storageDriver,
      cloudinaryPublicId,
      copy,
    },
    update: {
      mediaUrl,
      posterUrl,
      storageDriver,
      cloudinaryPublicId,
      copy,
    },
  });

  res.json(toShowreelJson(row));
});
