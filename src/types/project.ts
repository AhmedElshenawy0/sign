export const PROJECT_TYPES = ["logos", "designs", "videos", "prints"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  logos: "Logos",
  designs: "Designs",
  videos: "Videos",
  prints: "Prints",
};

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
};
