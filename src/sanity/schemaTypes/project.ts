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
  description:
    "Name, service, and cover are enough to publish. Extra photos and sentences are optional.",
  fieldsets: [
    {
      name: "pageSentences",
      title: "Sentences (optional)",
      description:
        "English + Arabic. Empty keeps the default. A chapter still needs its Extra photo, or it will not show.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "listing",
      title: "List order (optional)",
      description: "Smaller number appears first on /projects. Does not add photos.",
      options: { collapsible: true, collapsed: true },
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
      name: "hero",
      title: "Cover",
      type: "cloudinaryAsset",
      description:
        "Opening photo. If Service is Videos, upload the film here instead.",
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
      description: "Still shown before the film plays.",
    }),
    defineField({
      name: "gallery",
      title: "Extra photos",
      type: "array",
      of: [{ type: "galleryItem" }],
      description:
        "One photo per extra chapter. Add only chapters you want on the page. No photo = that chapter stays off.",
      hidden: ({ parent }) => parent?.type === "videos",
    }),
    defineField({
      name: "story",
      title: "Short description",
      type: "text",
      rows: 3,
      description:
        "One or two lines under the name. Leave empty to keep the default line.",
    }),
    defineField({
      name: "journeyCopy",
      title: "Sentences",
      type: "journeyCopy",
      fieldset: "pageSentences",
      description:
        "Defaults for this project. Same chapter names as Extra photos. Empty = site default.",
    }),
    defineField({
      name: "sortOrder",
      title: "Order on Projects page",
      type: "number",
      initialValue: 0,
      fieldset: "listing",
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
