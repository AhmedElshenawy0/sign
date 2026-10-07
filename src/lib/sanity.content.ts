import { shouldReadSanity } from "@/lib/content-source";
import { sanityFetch } from "@/lib/sanity.client";
import {
  ABOUT_PAGE_QUERY,
  HOME_PAGE_QUERY,
  NFC_PAGE_QUERY,
  PROJECT_QUERY,
  PROJECTS_QUERY,
  SITE_MEDIA_QUERY,
  type SanityAboutPage,
  type SanityHomePage,
  type SanityNfcPage,
  type SanityProjectDoc,
  type SanitySiteMedia,
} from "@/lib/sanity.queries";
import type { Project, ProjectGalleryItem, ProjectType } from "@/types/project";
import { PROJECT_TYPES } from "@/types/project";
import type { IntroVideo, Showreel } from "@/lib/settings";

const DEFAULT_SHOWREEL_COPY = {
  eyebrowEn: "Visual Proof",
  eyebrowAr: "الدليل البصري",
  titleEn: "SHOWREEL",
  titleAr: "عرض الأعمال",
};

function resolveAssetUrl(
  asset?: {
    url?: string | null;
    imageUrl?: string | null;
    fileUrl?: string | null;
  } | null,
  prefer: "image" | "video" = "image",
) {
  const image = asset?.imageUrl?.trim() || "";
  const file = asset?.fileUrl?.trim() || "";
  const url = asset?.url?.trim() || "";
  if (prefer === "video") return file || url || image;
  return image || url || file;
}

function isProjectType(value: string): value is ProjectType {
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

export function mapSanityProject(doc: SanityProjectDoc): Project | null {
  const type = doc.type && isProjectType(doc.type) ? doc.type : null;
  const mediaUrl = resolveAssetUrl(
    doc.hero,
    type === "videos" ? "video" : "image",
  );
  if (!type || !mediaUrl || !doc.title) return null;

  const gallery: ProjectGalleryItem[] = [];
  for (const item of doc.gallery ?? []) {
    const url = resolveAssetUrl(item.asset, "image");
    if (!url) continue;
    gallery.push({
      url,
      publicId: item.asset?.publicId ?? null,
      role: item.role || undefined,
      caption: item.caption || undefined,
      kicker: item.kicker || undefined,
      title: item.title || undefined,
      body: item.body || undefined,
    });
  }

  const sanityHosted = /cdn\.sanity\.io/.test(mediaUrl);
  return {
    id: doc._id,
    title: doc.title,
    type,
    media_url: mediaUrl,
    poster_url: resolveAssetUrl(doc.poster, "image") || null,
    sort_order: doc.sortOrder ?? 0,
    created_at: doc._createdAt ?? new Date().toISOString(),
    updated_at: doc._updatedAt ?? new Date().toISOString(),
    storage_driver: sanityHosted ? "public_asset" : "cloudinary",
    cloudinary_public_id: doc.hero?.publicId ?? null,
    poster_public_id: doc.poster?.publicId ?? null,
    gallery,
    story: doc.story ?? "",
    journeyCopy: doc.journeyCopy ?? undefined,
  };
}

export async function listSanityProjects(): Promise<Project[] | null> {
  if (!(await shouldReadSanity())) return null;
  const docs = await sanityFetch<SanityProjectDoc[]>(PROJECTS_QUERY);
  if (!docs?.length) return null;
  const mapped = docs.map(mapSanityProject).filter((item): item is Project => Boolean(item));
  return mapped.length ? mapped : null;
}

export async function getSanityProject(id: string): Promise<Project | null> {
  if (!(await shouldReadSanity())) return null;
  const doc = await sanityFetch<SanityProjectDoc | null>(PROJECT_QUERY, { id });
  return doc ? mapSanityProject(doc) : null;
}

export async function getSanityIntro(): Promise<IntroVideo | null> {
  if (!(await shouldReadSanity())) return null;
  const doc = await sanityFetch<SanitySiteMedia | null>(SITE_MEDIA_QUERY);
  const introUrl = resolveAssetUrl(doc?.intro, "video");
  if (!introUrl) return null;
  return {
    key: "intro_video",
    media_url: introUrl,
    poster_url: resolveAssetUrl(doc?.introPoster, "image") || null,
    storage_driver: /cdn\.sanity\.io/.test(introUrl) ? "public_asset" : "cloudinary",
    cloudinary_public_id: doc?.intro?.publicId ?? null,
    updated_at: null,
  };
}

export async function getSanityShowreel(): Promise<Showreel | null> {
  if (!(await shouldReadSanity())) return null;
  const doc = await sanityFetch<SanitySiteMedia | null>(SITE_MEDIA_QUERY);
  const showreelUrl = resolveAssetUrl(doc?.showreel, "video");
  if (!showreelUrl) return null;
  return {
    key: "showreel_video",
    media_url: showreelUrl,
    poster_url: null,
    storage_driver: /cdn\.sanity\.io/.test(showreelUrl) ? "public_asset" : "cloudinary",
    cloudinary_public_id: doc?.showreel?.publicId ?? null,
    copy: {
      eyebrowEn: doc?.eyebrowEn?.trim() || DEFAULT_SHOWREEL_COPY.eyebrowEn,
      eyebrowAr: doc?.eyebrowAr?.trim() || DEFAULT_SHOWREEL_COPY.eyebrowAr,
      titleEn: doc?.titleEn?.trim() || DEFAULT_SHOWREEL_COPY.titleEn,
      titleAr: doc?.titleAr?.trim() || DEFAULT_SHOWREEL_COPY.titleAr,
    },
    updated_at: null,
  };
}

export async function getSanityHomePage(): Promise<SanityHomePage | null> {
  if (!(await shouldReadSanity())) return null;
  return sanityFetch<SanityHomePage | null>(HOME_PAGE_QUERY);
}

export async function getSanityAboutPage(): Promise<SanityAboutPage | null> {
  if (!(await shouldReadSanity())) return null;
  return sanityFetch<SanityAboutPage | null>(ABOUT_PAGE_QUERY);
}

export async function getSanityNfcPage(): Promise<SanityNfcPage | null> {
  if (!(await shouldReadSanity())) return null;
  return sanityFetch<SanityNfcPage | null>(NFC_PAGE_QUERY);
}
