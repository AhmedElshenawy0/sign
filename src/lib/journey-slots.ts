import type { ProjectGalleryItem, ProjectType } from "@/types/project";

export const JOURNEY_SLOT_ROLES: Record<ProjectType, string[]> = {
  brand_identity: [
    "logo_on_product",
    "brand_book",
    "pack",
    "card",
    "street",
  ],
  packaging: ["sku", "detail", "in_hand", "shelf"],
  prints: ["bag", "letterhead", "poster"],
  social_media: ["story_frame", "campaign"],
  outdoors: ["city", "vehicle"],
  brand_strategy: ["now", "horizon", "path"],
  marketing_strategy: ["budget", "time", "mix"],
  photos: ["portrait", "detail", "wide"],
  videos: [],
  nfc_card: ["back", "in_hand"],
  nfc_ring: ["on_hand", "detail"],
  nfc_medal: ["worn", "detail"],
};

export function slotsForType(type: ProjectType): string[] {
  return JOURNEY_SLOT_ROLES[type] ?? [];
}

export function splitGallery(
  type: ProjectType,
  items: ProjectGalleryItem[],
): {
  slotted: Record<string, ProjectGalleryItem>;
  extras: ProjectGalleryItem[];
} {
  const roles = slotsForType(type);
  const slotted: Record<string, ProjectGalleryItem> = {};
  const used = new Set<string>();

  for (const role of roles) {
    const match = items.find((item) => item.role === role && !used.has(item.url));
    if (match) {
      slotted[role] = match;
      used.add(match.url);
    }
  }

  return {
    slotted,
    extras: items.filter((item) => !used.has(item.url)),
  };
}

export function itemByRole(
  items: ProjectGalleryItem[],
  role: string,
): ProjectGalleryItem | undefined {
  return items.find((item) => item.role === role);
}
