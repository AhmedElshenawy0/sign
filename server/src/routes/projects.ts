import { Router } from "express";
import type { Project, ProjectType, StorageDriver } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { removeStoredFile } from "../lib/storage.js";

const TYPES = new Set<ProjectType>(["logos", "designs", "videos", "prints"]);

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
};

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
  };
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
  await prisma.project.delete({ where: { id: existing.id } });
  res.json({ ok: true });
});
