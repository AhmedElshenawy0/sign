import { defineField, defineType } from "sanity";
import { PROJECT_TYPE_LABELS, PROJECT_TYPES } from "@/types/project";
import { JOURNEY_SLOT_ROLES } from "@/lib/journey-slots";

function hasMedia(value: unknown) {
  if (!value || typeof value !== "object") return false;
  const media = value as { image?: unknown; file?: unknown; url?: string };
  return Boolean(
    media.image ||
    media.file ||
    (typeof media.url === "string" && media.url.trim()),
  );
}

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fieldsets: [
    {
      name: "pageSentences",
      title: "Page sentences",
      description:
        "English + Arabic for this project. Leave a field empty to keep the default sentence. A chapter still needs its Extra photo, or it will not show.",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Service",
      type: "string",
      options: {
        list: PROJECT_TYPES.map((value) => ({
          title: PROJECT_TYPE_LABELS[value],
          value,
        })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Order on Projects page",
      type: "number",
      initialValue: 0,
      description: "Smaller number appears first in the list. This does not add photos or chapters.",
    }),
    defineField({
      name: "story",
      title: "Short description",
      type: "text",
      rows: 5,
      description: "One or two lines under the name on the live page. Leave empty to keep the default line.",
    }),
    defineField({
      name: "hero",
      title: "Cover",
      type: "cloudinaryAsset",
      description: "The opening photo (or the film, if Service is Videos). Extra chapters are added below.",
      validation: (rule) =>
        rule.custom((value) =>
          hasMedia(value)
            ? true
            : "Upload a cover image or video, or paste a URL.",
        ),
    }),
    defineField({
      name: "poster",
      title: "Video thumbnail",
      type: "cloudinaryAsset",
      hidden: ({ parent }) => parent?.type !== "videos",
      description: "Still image shown before the film plays.",
    }),
    defineField({
      name: "gallery",
      title: "Extra photos",
      type: "array",
      of: [{ type: "galleryItem" }],
      description:
        "Each photo is one extra chapter. Add only what you want on the page. No photo = that chapter does not appear.",
      hidden: ({ parent }) => parent?.type === "videos",
    }),
    defineField({
      name: "journeyCopy",
      title: "Sentences",
      type: "journeyCopy",
      fieldset: "pageSentences",
      description:
        "Cover line, chapter sentences, and labels. Same names as Extra photos (Logo with Logo). Empty = default.",
    }),
  ],
  preview: {
    select: { title: "title", type: "type" },
    prepare({ title, type }) {
      const slots = type
        ? (JOURNEY_SLOT_ROLES[type as keyof typeof JOURNEY_SLOT_ROLES] ?? []).join(", ")
        : "";
      return {
        title: title || "Untitled project",
        subtitle: [PROJECT_TYPE_LABELS[type as keyof typeof PROJECT_TYPE_LABELS], slots]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Order on Projects page",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
