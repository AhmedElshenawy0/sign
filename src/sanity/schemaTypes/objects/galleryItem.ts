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
  fields: [
    defineField({
      name: "role",
      title: "This photo is for",
      type: "string",
      description:
        "Pick the chapter for this photo. Leave empty and the next empty chapter for this service is used.",
      options: { list: slotOptionsForType() },
      components: { input: SlotInput },
    }),
    defineField({
      name: "caption",
      title: "Photo label",
      type: "string",
      description: "Optional small label on the photo. Not the chapter headline.",
    }),
    defineField({
      name: "asset",
      title: "Upload",
      type: "cloudinaryAsset",
      validation: (rule) =>
        rule.custom((value) =>
          hasMedia(value) ? true : "Upload an image or paste a URL.",
        ),
    }),
    defineField({
      name: "kicker",
      title: "Small line",
      type: "localeString",
      description: "Optional. Replaces the default small line on this chapter. Leave empty to keep the default.",
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "localeString",
      description: "Optional. Used on chapters that show a headline. Leave empty to keep the default.",
    }),
    defineField({
      name: "body",
      title: "Paragraph",
      type: "localeText",
      description: "Optional. Replaces the default paragraph or the photo label text. Leave empty to keep the default.",
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
