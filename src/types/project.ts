export const PROJECT_TYPES = [
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
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const SERVICE_GROUP_IDS = [
  "branding",
  "marketing",
  "photoVideo",
  "nfc",
] as const;

export type ServiceGroupId = (typeof SERVICE_GROUP_IDS)[number];

export const SERVICE_GROUPS: {
  id: ServiceGroupId;
  types: ProjectType[];
}[] = [
  {
    id: "branding",
    types: ["brand_identity", "packaging", "prints"],
  },
  {
    id: "marketing",
    types: [
      "social_media",
      "outdoors",
      "brand_strategy",
      "marketing_strategy",
    ],
  },
  {
    id: "photoVideo",
    types: ["photos", "videos"],
  },
  {
    id: "nfc",
    types: ["nfc_card", "nfc_ring", "nfc_medal"],
  },
];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  brand_identity: "Brand Identity",
  packaging: "Packaging",
  prints: "Prints",
  social_media: "Social Media",
  outdoors: "Outdoors",
  brand_strategy: "Brand Strategy",
  marketing_strategy: "Marketing Strategy",
  photos: "Photos",
  videos: "Videos",
  nfc_card: "NFC Card",
  nfc_ring: "Ring",
  nfc_medal: "Medal",
};

export const SERVICE_GROUP_LABELS: Record<ServiceGroupId, string> = {
  branding: "Branding",
  marketing: "Marketing",
  photoVideo: "Photography & Videography",
  nfc: "NFC Services",
};

export function isVideoProjectType(type: ProjectType) {
  return type === "videos";
}

export function supportsProjectGallery(type: ProjectType) {
  return type !== "videos";
}

export type ProjectGalleryItem = {
  url: string;
  publicId: string | null;
  role?: string;
  caption?: string;
};

function asGalleryList(value: unknown): ProjectGalleryItem[] {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && Array.isArray((value as { items?: unknown }).items)) {
    return (value as { items: ProjectGalleryItem[] }).items;
  }
  return [];
}

export function galleryItems(project: { gallery?: ProjectGalleryItem[] | null }): ProjectGalleryItem[] {
  return asGalleryList(project.gallery).filter((item) => Boolean(item?.url));
}

export function stillUrls(project: {
  media_url: string;
  gallery?: ProjectGalleryItem[] | null;
}): string[] {
  return stillItems(project).map((item) => item.url);
}

export function stillItems(project: {
  media_url: string;
  gallery?: ProjectGalleryItem[] | null;
}): ProjectGalleryItem[] {
  return [
    { url: project.media_url, publicId: null },
    ...galleryItems(project),
  ].filter((item) => Boolean(item.url));
}

export function groupIdForType(type: ProjectType): ServiceGroupId {
  const group = SERVICE_GROUPS.find((item) => item.types.includes(type));
  return group?.id ?? "branding";
}

export type StorageDriver = "cloudinary" | "local" | "public_asset";

export type Project = {
  id: string;
  title: string;
  type: ProjectType;
  media_url: string;
  poster_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  storage_driver?: StorageDriver;
  cloudinary_public_id?: string | null;
  poster_public_id?: string | null;
  gallery?: ProjectGalleryItem[];
  story?: string;
};

export type ProjectInput = {
  title: string;
  type: ProjectType;
  media_url: string;
  poster_url?: string | null;
  sort_order?: number;
  storage_driver?: StorageDriver;
  cloudinary_public_id?: string | null;
  poster_public_id?: string | null;
  gallery?: ProjectGalleryItem[];
  story?: string;
};
