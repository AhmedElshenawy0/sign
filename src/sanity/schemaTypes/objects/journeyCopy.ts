import { defineField, defineType } from "sanity";

function unlessType(...types: string[]) {
  return ({ document }: { document?: { type?: string } }) =>
    !types.includes(document?.type ?? "");
}

export const journeyChapter = defineType({
  name: "journeyChapter",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "kicker", title: "Small line", type: "localeString" }),
    defineField({ name: "title", title: "Headline", type: "localeString" }),
    defineField({ name: "body", title: "Paragraph", type: "localeText" }),
  ],
  preview: {
    select: { title: "title.en", kicker: "kicker.en" },
    prepare({ title, kicker }) {
      return { title: title || kicker || "Text" };
    },
  },
});

export const journeyCopy = defineType({
  name: "journeyCopy",
  title: "Custom page text",
  type: "object",
  description:
    "Leave a field empty to keep the default sentences. Text for a chapter shows only if that Extra photo exists.",
  fields: [
    defineField({
      name: "scroll",
      title: "Cover line",
      type: "localeString",
      hidden: unlessType("brand_identity"),
      description: "Small line above the cover photo.",
    }),
    defineField({
      name: "mark",
      title: "Logo",
      type: "journeyChapter",
      hidden: unlessType("brand_identity"),
      description: "Sentences next to the Logo photo. Needs that Extra photo, or this chapter stays off the page.",
    }),
    defineField({
      name: "voice",
      title: "Brand book",
      type: "journeyChapter",
      hidden: unlessType("brand_identity"),
      description: "Sentences next to the Brand book photo. Needs that Extra photo, or this chapter stays off the page.",
    }),
    defineField({
      name: "world",
      title: "In the world",
      type: "journeyChapter",
      hidden: () => true,
    }),
    defineField({
      name: "applications",
      title: "Photo labels",
      type: "array",
      of: [{ type: "localeString" }],
      hidden: unlessType("brand_identity"),
      description: "Labels for Packaging, Business card, and Environmental — in that order.",
    }),
    defineField({
      name: "kicker",
      title: "Cover line",
      type: "localeString",
      hidden: unlessType(
        "packaging",
        "prints",
        "social_media",
        "photos",
        "videos",
        "brand_strategy",
        "marketing_strategy",
        "outdoors",
      ),
      description: "Small line above the cover.",
    }),
    defineField({
      name: "range",
      title: "Detail",
      type: "journeyChapter",
      hidden: unlessType("packaging"),
      description: "Sentences next to the Detail photo. Needs that Extra photo, or this chapter stays off the page.",
    }),
    defineField({
      name: "skus",
      title: "Grid label",
      type: "localeString",
      hidden: unlessType("packaging"),
      description: "Label above the pack grid (Another SKU, In hand, On shelf).",
    }),
    defineField({
      name: "steps",
      title: "Strategy steps",
      type: "array",
      of: [{ type: "journeyChapter" }],
      hidden: unlessType("brand_strategy", "marketing_strategy"),
      description:
        "Up to three steps, in the same order as Extra photos (Now / Horizon / Path, or Budget / Time / Mix). A step shows only if that photo exists.",
    }),
    defineField({
      name: "wear",
      title: "Wear line",
      type: "localeString",
      hidden: unlessType("nfc_card", "nfc_ring", "nfc_medal"),
      description: "Small line above the cover product.",
    }),
  ],
});
