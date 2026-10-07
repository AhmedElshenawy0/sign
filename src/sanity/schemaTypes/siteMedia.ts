import { defineField, defineType } from "sanity";

export const siteMedia = defineType({
  name: "siteMedia",
  title: "Intro & showreel",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Homepage intro loop",
      type: "cloudinaryAsset",
      description: "Upload a video in Sanity, or paste a URL. Plays behind the home hero.",
    }),
    defineField({
      name: "introPoster",
      title: "Intro poster",
      type: "cloudinaryAsset",
      description: "Still shown before the intro video loads. Upload or paste a URL.",
    }),
    defineField({
      name: "showreel",
      title: "Showreel video",
      type: "cloudinaryAsset",
      description: "Upload a video in Sanity, or paste a URL. Plays in the home showreel.",
    }),
    defineField({
      name: "eyebrowEn",
      title: "Showreel eyebrow (EN)",
      type: "string",
      initialValue: "Visual Proof",
    }),
    defineField({
      name: "eyebrowAr",
      title: "Showreel eyebrow (AR)",
      type: "string",
      initialValue: "الدليل البصري",
    }),
    defineField({
      name: "titleEn",
      title: "Showreel title (EN)",
      type: "string",
      initialValue: "SHOWREEL",
    }),
    defineField({
      name: "titleAr",
      title: "Showreel title (AR)",
      type: "string",
      initialValue: "عرض الأعمال",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Intro & showreel" };
    },
  },
});
