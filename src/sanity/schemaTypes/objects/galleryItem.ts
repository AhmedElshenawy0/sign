import { defineField, defineType } from "sanity";
import { SlotInput } from "@/sanity/components/SlotInput";
import { slotLabel, slotOptionsForType } from "@/lib/journey-slots";

function hasMedia(value: unknown) {
  if (!value || typeof value !== "object") return false;
  const media = value as { image?: unknown; file?: unknown; url?: string };
  return Boolean(
    media.image ||
      media.file ||
      (typeof media.url === "string" && media.url.trim()),
  );
}

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Photo",
  type: "object",
  fieldsets: [
    {
      name: "copy",
      title: "Replace sentences on this photo (optional)",
      description:
        "Leave closed to keep the Sentences section (or the site default). Open only to override this chapter.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "asset",
      title: "Photo",
      type: "cloudinaryAsset",
      validation: (rule) =>
        rule.custom((value) =>
          hasMedia(value) ? true : "Upload an image or paste a URL.",
        ),
    }),
    defineField({
      name: "role",
      title: "This photo is for",
      type: "string",
      description: "Which chapter. Empty = the next empty chapter for this service.",
      options: { list: slotOptionsForType() },
      components: { input: SlotInput },
    }),
    defineField({
      name: "caption",
      title: "Photo label",
      type: "string",
      description: "Optional small caption on the photo, not the chapter headline.",
    }),
    defineField({
      name: "kicker",
      title: "Small line",
      type: "localeString",
      fieldset: "copy",
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "localeString",
      fieldset: "copy",
    }),
    defineField({
      name: "body",
      title: "Paragraph",
      type: "localeText",
      fieldset: "copy",
    }),
  ],
  preview: {
    select: { role: "role", caption: "caption", url: "asset.url", filename: "asset.file.asset.originalFilename" },
    prepare({ role, caption, url, filename }) {
      return {
        title: role ? slotLabel(role) : caption || "Photo",
        subtitle: filename || url,
      };
    },
  },
});
