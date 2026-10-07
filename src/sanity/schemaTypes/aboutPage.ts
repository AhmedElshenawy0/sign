import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Hero eyebrow",
      type: "localeString",
    }),
    defineField({
      name: "title",
      title: "Hero title",
      type: "localeString",
    }),
    defineField({
      name: "description",
      title: "Hero description",
      type: "localeText",
    }),
    defineField({
      name: "yearsValue",
      title: "Hero years number",
      type: "string",
      initialValue: "8+",
    }),
    defineField({
      name: "clientsValue",
      title: "Hero clients number",
      type: "string",
      initialValue: "120+",
    }),
    defineField({
      name: "campaignsValue",
      title: "Hero campaigns number",
      type: "string",
      initialValue: "350+",
    }),
    defineField({
      name: "whatEyebrow",
      title: "What is Signup — eyebrow",
      type: "localeString",
    }),
    defineField({
      name: "whatTitle",
      title: "What is Signup — title",
      type: "localeString",
    }),
    defineField({
      name: "whatDescription",
      title: "What is Signup — body",
      type: "localeText",
    }),
    defineField({
      name: "founderEyebrow",
      title: "Founder eyebrow",
      type: "localeString",
    }),
    defineField({
      name: "founderName",
      title: "Founder name",
      type: "string",
    }),
    defineField({
      name: "founderJob",
      title: "Founder role",
      type: "localeString",
    }),
    defineField({
      name: "founderBio",
      title: "Founder bio",
      type: "localeText",
    }),
    defineField({
      name: "founderPhoto",
      title: "Founder photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderPhotoUrl",
      title: "Or founder photo URL",
      type: "string",
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "localeString", title: "Value" },
            { name: "label", type: "localeString", title: "Label" },
          ],
          preview: {
            select: { en: "value.en", label: "label.en" },
            prepare({ en, label }) {
              return { title: en || "Milestone", subtitle: label };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About" };
    },
  },
});
