import { defineField, defineType } from "sanity";

const CATALOG = [
  { name: "nfc_card", title: "NFC Card" },
  { name: "nfc_stand", title: "Stand" },
  { name: "nfc_ring", title: "Ring" },
  { name: "nfc_medal", title: "Medal" },
  { name: "nfc_keytag", title: "Keytag" },
  { name: "nfc_sticker", title: "Sticker" },
  { name: "nfc_band", title: "Wristband" },
  { name: "nfc_badge", title: "Badge" },
] as const;

export const storePage = defineType({
  name: "storePage",
  title: "Store page",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "localeString" }),
    defineField({ name: "title", title: "Title", type: "localeString" }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({
      name: "quote",
      title: "Request button",
      type: "localeString",
      description: "Green button under the grid. Empty keeps the site default.",
    }),
    defineField({
      name: "items",
      title: "NFC pieces",
      description:
        "Eight physical pieces. Open a piece, then use the tabs: Store card, Product page, Price, Photos. Empty fields keep the site default. You cannot add or remove tiles.",
      type: "object",
      fields: CATALOG.map((item) =>
        defineField({
          name: item.name,
          title: item.title,
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
