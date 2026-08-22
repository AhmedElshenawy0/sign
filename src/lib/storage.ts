import type { ProjectType } from "@/types/project";
import { readApiError } from "@/lib/api";

export type UploadResult = {
  publicUrl: string;
  publicId: string | null;
  storageDriver: "cloudinary" | "local" | "public_asset";
};

export async function uploadProjectFile(
  type: ProjectType,
  file: File,
  kind: "media" | "poster" = "media",
): Promise<UploadResult> {
  const body = new FormData();
  body.set("file", file);
  body.set("type", type);
  body.set("kind", kind);

  const res = await fetch("/api/uploads", {
    method: "POST",
    body,
    credentials: "include",
  });

  if (!res.ok) throw new Error(await readApiError(res));
  return (await res.json()) as UploadResult;
}
