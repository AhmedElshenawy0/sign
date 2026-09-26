import { Router } from "express";
import type { Prisma, Project, ProjectType, StorageDriver } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { removeStoredFile } from "../lib/storage.js";

const TYPES = new Set<ProjectType>([
  "brand_identity",
  "packaging",
  "prints",
  "social_media",
  "outdoors",
  "brand_strategy",
  "marketing_strategy",
  "photos",
  "videos",
  "nfc_card",
  "nfc_ring",
  "nfc_medal",
]);

export type GalleryItem = {
  url: string;
  publicId: string | null;
  role?: string;
  caption?: string;
};

export type ProjectJson = {
  id: string;
  title: string;
  type: ProjectType;
  media_url: string;
  poster_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  storage_driver: StorageDriver;
  cloudinary_public_id: string | null;
  poster_public_id: string | null;
  gallery: GalleryItem[];
  story: string;
};

function galleryRecords(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const items = (value as { items?: unknown }).items;
    if (Array.isArray(items)) return items;
  }
  return [];
}

export function parseStory(stored: unknown, incoming?: unknown): string {
  if (typeof incoming === "string") return incoming.trim().slice(0, 2000);
  if (stored && typeof stored === "object" && !Array.isArray(stored)) {
    const story = (stored as { story?: unknown }).story;
    if (typeof story === "string") return story.trim().slice(0, 2000);
  }
  return "";
}

export function parseGallery(value: unknown): GalleryItem[] {
  const items: GalleryItem[] = [];
  for (const raw of galleryRecords(value)) {
    if (!raw || typeof raw !== "object") continue;
    const rec = raw as Record<string, unknown>;
    const url = typeof rec.url === "string" ? rec.url.trim() : "";
    if (!url) continue;
    const publicIdRaw = rec.publicId ?? rec.public_id;
    const publicId =
      typeof publicIdRaw === "string" && publicIdRaw.trim()
        ? publicIdRaw.trim()
        : null;
    const role =
      typeof rec.role === "string" && rec.role.trim()
        ? rec.role.trim().slice(0, 40)
        : undefined;
    const caption =
      typeof rec.caption === "string" && rec.caption.trim()
        ? rec.caption.trim().slice(0, 280)
        : undefined;
    items.push({
      url,
      publicId,
      ...(role ? { role } : {}),
      ...(caption ? { caption } : {}),
    });
  }
  return items;
}

function packGallery(items: GalleryItem[], story: string): Prisma.InputJsonValue {
  return { story, items } as Prisma.InputJsonValue;
}

export function toProjectJson(project: Project): ProjectJson {
  return {
    id: project.id,
    title: project.title,
    type: project.type,
    media_url: project.mediaUrl,
    poster_url: project.posterUrl,
    sort_order: project.sortOrder,
    created_at: project.createdAt.toISOString(),
    updated_at: project.updatedAt.toISOString(),
    storage_driver: project.storageDriver,
    cloudinary_public_id: project.cloudinaryPublicId,
    poster_public_id: project.posterPublicId,
    gallery: parseGallery(project.gallery),
    story: parseStory(project.gallery),
  };
}

async function removeGalleryItems(
  items: GalleryItem[],
  fallbackDriver: StorageDriver,
) {
  for (const item of items) {
    await removeStoredFile({
      driver: item.publicId ? "cloudinary" : fallbackDriver,
      url: item.url,
      publicId: item.publicId,
    });
  }
}

export const projectsRouter = Router();

projectsRouter.get("/", async (_req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  res.json(projects.map(toProjectJson));
});

function routeId(req: { params: { id?: string | string[] }; originalUrl?: string }) {
  const raw = req.params.id;
  const fromParams = Array.isArray(raw) ? raw[0] : raw;
  if (fromParams) return decodeURIComponent(String(fromParams));
  const last = String(req.originalUrl ?? "")
    .split("?")[0]
    .split("/")
    .filter(Boolean)
    .pop();
  return last ? decodeURIComponent(last) : "";
}

projectsRouter.get("/:id", async (req, res) => {
  const project = await prisma.project.findUnique({ where: { id: routeId(req) } });
  if (!project) {
    res.status(404).json({ error: "Project not found." });
    return;
  }
  res.json(toProjectJson(project));
});

projectsRouter.post("/", requireAuth, async (req, res) => {
  const title = String(req.body?.title ?? "").trim();
  const type = req.body?.type as ProjectType;
  const mediaUrl = String(req.body?.media_url ?? "").trim();
  const posterUrl = req.body?.poster_url ? String(req.body.poster_url) : null;
  const storageDriver = (req.body?.storage_driver as StorageDriver) ?? "local";
  const cloudinaryPublicId = req.body?.cloudinary_public_id ?? null;
  const posterPublicId = req.body?.poster_public_id ?? null;
  const gallery = parseGallery(req.body?.gallery);
  const story = parseStory(null, req.body?.story);

  if (!title || !TYPES.has(type) || !mediaUrl) {
    res.status(400).json({ error: "Title, type, and media_url are required." });
    return;
  }

  const last = await prisma.project.aggregate({ _max: { sortOrder: true } });
  const project = await prisma.project.create({
    data: {
      title,
      type,
      mediaUrl,
      posterUrl: type === "videos" ? posterUrl : null,
      sortOrder: (last._max.sortOrder ?? 0) + 1,
      storageDriver,
      cloudinaryPublicId,
      posterPublicId,
      gallery: packGallery(gallery, story),
    },
  });
  res.status(201).json(toProjectJson(project));
});

projectsRouter.patch("/:id", requireAuth, async (req, res) => {
  const existing = await prisma.project.findUnique({ where: { id: routeId(req) } });
  if (!existing) {
    res.status(404).json({ error: "Project not found." });
    return;
  }

  const title = req.body?.title != null ? String(req.body.title).trim() : existing.title;
  const type = (req.body?.type as ProjectType) ?? existing.type;
  const mediaUrl = req.body?.media_url != null ? String(req.body.media_url) : existing.mediaUrl;
  const posterUrl =
    req.body?.poster_url !== undefined ? req.body.poster_url : existing.posterUrl;
  const storageDriver = (req.body?.storage_driver as StorageDriver) ?? existing.storageDriver;
  const cloudinaryPublicId =
    req.body?.cloudinary_public_id !== undefined
      ? req.body.cloudinary_public_id
      : existing.cloudinaryPublicId;
  const posterPublicId =
    req.body?.poster_public_id !== undefined
      ? req.body.poster_public_id
      : existing.posterPublicId;
  const nextGallery =
    req.body?.gallery !== undefined
      ? parseGallery(req.body.gallery)
      : parseGallery(existing.gallery);
  const story =
    req.body?.story !== undefined
      ? parseStory(null, req.body.story)
      : parseStory(existing.gallery);

  if (!title || !TYPES.has(type) || !mediaUrl) {
    res.status(400).json({ error: "Title, type, and media_url are required." });
    return;
  }

  if (req.body?.media_url && req.body.media_url !== existing.mediaUrl) {
    await removeStoredFile({
      driver: existing.storageDriver,
      url: existing.mediaUrl,
      publicId: existing.cloudinaryPublicId,
    });
  }

  if (req.body?.poster_url !== undefined && req.body.poster_url !== existing.posterUrl) {
    await removeStoredFile({
      driver: existing.posterPublicId ? "cloudinary" : existing.storageDriver,
      url: existing.posterUrl,
      publicId: existing.posterPublicId,
    });
  }

  if (req.body?.gallery !== undefined) {
    const kept = new Set(nextGallery.map((item) => item.url));
    const removed = parseGallery(existing.gallery).filter((item) => !kept.has(item.url));
    await removeGalleryItems(removed, existing.storageDriver);
  }

  const project = await prisma.project.update({
    where: { id: existing.id },
    data: {
      title,
      type,
      mediaUrl,
      posterUrl: type === "videos" ? posterUrl : null,
      storageDriver,
      cloudinaryPublicId,
      posterPublicId: type === "videos" ? posterPublicId : null,
      gallery: packGallery(nextGallery, story),
    },
  });
  res.json(toProjectJson(project));
});

projectsRouter.delete("/:id", requireAuth, async (req, res) => {
  const existing = await prisma.project.findUnique({ where: { id: routeId(req) } });
  if (!existing) {
    res.status(404).json({ error: "Project not found." });
    return;
  }

  await removeStoredFile({
    driver: existing.storageDriver,
    url: existing.mediaUrl,
    publicId: existing.cloudinaryPublicId,
  });
  await removeStoredFile({
    driver: existing.posterPublicId ? "cloudinary" : existing.storageDriver,
    url: existing.posterUrl,
    publicId: existing.posterPublicId,
  });
  await removeGalleryItems(parseGallery(existing.gallery), existing.storageDriver);
  await prisma.project.delete({ where: { id: existing.id } });
  res.json({ ok: true });
});
