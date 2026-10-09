import { defineField, defineType } from "sanity";

function nfcExamplesField(
  name: string,
  title: string,
  service: "nfc_card" | "nfc_ring" | "nfc_medal",
) {
  return defineField({
    name,
    title,
    description:
      "Up to 2 cases on /nfc under this shape. Empty = first two by Order. All NFC work still appears on /projects.",
    type: "array",
    of: [
      {
        type: "reference",
        to: [{ type: "project" }],
        options: {
          filter: "type == $service",
          filterParams: { service },
        },
      },
    ],
    validation: (rule) => rule.max(2),
  });
}

export const nfcPage = defineType({
  name: "nfcPage",
  title: "NFC page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({
      name: "openSite",
      title: "Store button label",
      type: "localeString",
      description: "Button on /nfc. It always opens /store — this field is the label only.",
    }),
    defineField({
      name: "ctaHint",
      title: "Store button hint",
      type: "localeString",
      description: "Small line under the store button on /nfc.",
    }),
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
    nfcExamplesField("cardExamples", "Card examples", "nfc_card"),
    defineField({ name: "ringKicker", title: "Ring kicker", type: "localeString" }),
    defineField({ name: "ringTitle", title: "Ring title", type: "localeString" }),
    defineField({ name: "ringBody", title: "Ring body", type: "localeText" }),
    nfcExamplesField("ringExamples", "Ring examples", "nfc_ring"),
    defineField({ name: "medalKicker", title: "Medal kicker", type: "localeString" }),
    defineField({ name: "medalTitle", title: "Medal title", type: "localeString" }),
    defineField({ name: "medalBody", title: "Medal body", type: "localeText" }),
    nfcExamplesField("medalExamples", "Medal examples", "nfc_medal"),
  ],
  preview: {
    prepare() {
      return { title: "NFC page" };
    },
  },
});
