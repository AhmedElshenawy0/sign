import { defineField, defineType } from "sanity";
import { PROJECT_TYPE_LABELS, PROJECT_TYPES } from "@/types/project";

export const storePage = defineType({
  name: "storePage",
  title: "Store page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({
      name: "quote",
      title: "Quote button label",
      type: "localeString",
      description: "Label on the featured tile WhatsApp button.",
    }),
    defineField({ name: "groupAll", title: "Filter: All", type: "localeString" }),
    defineField({ name: "groupIdentity", title: "Filter: Identity", type: "localeString" }),
    defineField({ name: "groupStrategy", title: "Filter: Strategy", type: "localeString" }),
    defineField({ name: "groupCampaign", title: "Filter: Campaign", type: "localeString" }),
    defineField({ name: "groupCapture", title: "Filter: Capture", type: "localeString" }),
    defineField({ name: "groupNfc", title: "Filter: NFC", type: "localeString" }),
    defineField({
      name: "items",
      title: "Catalog tiles",
      description:
        "Same 12 products. Empty title/line/photo keeps the site default. You cannot add or remove tiles.",
      type: "object",
      fields: PROJECT_TYPES.map((key) =>
        defineField({
          name: key,
          title: PROJECT_TYPE_LABELS[key],
          type: "storeItem",
        }),
      ),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Store page" };
    },
  },
});
