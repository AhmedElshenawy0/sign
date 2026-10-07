import { defineField, defineType } from "sanity";

export const nfcPage = defineType({
  name: "nfcPage",
  title: "NFC page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "standKicker", title: "Stand kicker", type: "localeString" }),
    defineField({ name: "standTitle", title: "Stand title", type: "localeString" }),
    defineField({ name: "standBody", title: "Stand body", type: "localeText" }),
    defineField({
      name: "standImage",
      title: "Stand photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "standImageUrl",
      title: "Or stand photo URL",
      type: "string",
    }),
    defineField({ name: "cardKicker", title: "Card kicker", type: "localeString" }),
    defineField({ name: "cardTitle", title: "Card title", type: "localeString" }),
    defineField({ name: "cardBody", title: "Card body", type: "localeText" }),
    defineField({ name: "ringKicker", title: "Ring kicker", type: "localeString" }),
    defineField({ name: "ringTitle", title: "Ring title", type: "localeString" }),
    defineField({ name: "ringBody", title: "Ring body", type: "localeText" }),
    defineField({ name: "medalKicker", title: "Medal kicker", type: "localeString" }),
    defineField({ name: "medalTitle", title: "Medal title", type: "localeString" }),
    defineField({ name: "medalBody", title: "Medal body", type: "localeText" }),
  ],
  preview: {
    prepare() {
      return { title: "NFC page" };
    },
  },
});
