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

export const SLOT_LABELS: Record<string, string> = {
  logo_on_product: "Logo",
  brand_book: "Brand book",
  pack: "Packaging",
  card: "Business card",
  street: "Environmental",
  sku: "Another SKU",
  detail: "Detail",
  in_hand: "In hand",
  shelf: "On shelf",
  bag: "Bag",
  letterhead: "Letterhead",
  poster: "Poster",
  story_frame: "Story",
  campaign: "Campaign",
  city: "City",
  vehicle: "Vehicle",
  now: "Now",
  horizon: "Horizon",
  path: "Path",
  budget: "Budget",
  time: "Time",
  mix: "Mix",
  portrait: "Portrait",
  wide: "Wide",
  back: "Back",
  on_hand: "On hand",
  worn: "Worn",
};

export function slotLabel(role: string): string {
  return SLOT_LABELS[role] ?? role.replace(/_/g, " ");
}

export function slotOptionsForType(type?: string) {
  const roles = type ? slotsForType(type as ProjectType) : [];
  const list = roles.length
    ? roles
    : [...new Set(Object.values(JOURNEY_SLOT_ROLES).flat())];
  return list.map((role) => ({ title: slotLabel(role), value: role }));
}

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

/** If a still has no slot, give it the next empty slot for this category. */
export function fillMissingRoles(
  type: ProjectType,
  items: ProjectGalleryItem[],
): ProjectGalleryItem[] {
  const roles = slotsForType(type);
  if (!roles.length) return items;
  const taken = new Set(
    items
      .map((item) => item.role)
      .filter((role): role is string => Boolean(role) && roles.includes(role)),
  );
  let cursor = 0;
  return items.map((item) => {
    if (item.role && roles.includes(item.role)) return item;
    while (cursor < roles.length && taken.has(roles[cursor])) cursor += 1;
    const role = roles[cursor];
    if (!role) return item;
    taken.add(role);
    cursor += 1;
    return { ...item, role };
  });
}
