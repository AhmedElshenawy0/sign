import { defineField, defineType } from "sanity";

export const storeItem = defineType({
  name: "storeItem",
  title: "Store item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "line", title: "Line", type: "localeText" }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageUrl",
      title: "Or photo URL",
      type: "string",
    }),
  ],
});
