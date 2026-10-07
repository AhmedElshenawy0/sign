export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-10-01";
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN?.trim();

export function hasSanityConfig() {
  return Boolean(sanityProjectId);
}
