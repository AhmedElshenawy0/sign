import { apiFetch, getApiBase, readApiError } from "@/lib/api";
import type { StorageDriver } from "@/types/project";

export const DEFAULT_INTRO_VIDEO = "/videos/intro.mp4";

export type IntroVideo = {
  key: string;
  media_url: string;
  poster_url: string | null;
  storage_driver: StorageDriver;
  cloudinary_public_id: string | null;
  updated_at: string | null;
};

export async function getIntroVideo(): Promise<IntroVideo> {
  try {
    const res = await fetch(`${getApiBase()}/api/settings/intro`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    return (await res.json()) as IntroVideo;
  } catch {
    return {
      key: "intro_video",
      media_url: DEFAULT_INTRO_VIDEO,
      poster_url: null,
      storage_driver: "public_asset",
      cloudinary_public_id: null,
      updated_at: null,
    };
  }
}

export async function saveIntroVideo(input: {
  media_url: string;
  poster_url?: string | null;
  storage_driver?: StorageDriver;
  cloudinary_public_id?: string | null;
}) {
  const res = await apiFetch("/api/settings/intro", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await readApiError(res));
  return (await res.json()) as IntroVideo;
}
