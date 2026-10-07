import { hasSanityConfig } from "@/sanity/env";

export type ContentSource = "sanity" | "api";

export function getContentSource(): ContentSource {
  return process.env.CONTENT_SOURCE === "sanity" ? "sanity" : "api";
}

export async function isAdminRequest() {
  try {
    const { headers } = await import("next/headers");
    const path = (await headers()).get("x-pathname") ?? "";
    return path.startsWith("/admin");
  } catch {
    return false;
  }
}

export async function shouldReadSanity() {
  if (getContentSource() !== "sanity" || !hasSanityConfig()) return false;
  return !(await isAdminRequest());
}

