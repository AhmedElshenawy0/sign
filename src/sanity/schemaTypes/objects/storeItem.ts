import { defineField, defineType } from "sanity";

export const storeItem = defineType({
  name: "storeItem",
  title: "Store item",
  type: "object",
  groups: [
    { name: "card", title: "Store card", default: true },
    { name: "page", title: "Product page" },
    { name: "price", title: "Price" },
    { name: "photos", title: "Photos" },
  ],
  fields: [
    defineField({
      name: "kicker",
      title: "Kicker",
      type: "localeString",
      group: "card",
      description: "Small label on the store card. Empty keeps the site default.",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      group: "card",
      description: "Name on the store card and product page. Empty keeps the site default.",
    }),
    defineField({
      name: "line",
      title: "Short line",
      type: "localeText",
      group: "card",
      description: "One line under the title. Empty keeps the site default.",
    }),
    defineField({
      name: "image",
      title: "Cover photo",
      type: "image",
      group: "photos",
      options: { hotspot: true },
      description: "Main photo on the store card and product page.",
    }),
    defineField({
      name: "imageUrl",
      title: "Or cover photo URL",
      type: "string",
      group: "photos",
    }),
    defineField({
      name: "photos",
      title: "Extra photos",
      type: "array",
      group: "photos",
      description:
        "More photos on the product page gallery. Empty keeps the site photos. Cover photo stays first.",
      validation: (Rule) => Rule.max(6),
      of: [
        {
          type: "object",
          name: "storePhoto",
          title: "Photo",
          fields: [
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
          preview: {
            select: { media: "image", url: "imageUrl" },
            prepare({ media, url }) {
              return { title: url || "Photo", media };
            },
          },
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price (one piece)",
      type: "number",
      group: "price",
      description: "EGP for one piece. Empty keeps the site default. This is a display price — no checkout.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "offers",
      title: "Pack offers",
      type: "array",
      group: "price",
      description:
        "e.g. 2 pieces for 800, 3 pieces for 1050. Empty keeps the site defaults. Highest pack can take a badge like Popular.",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "object",
          name: "storeOffer",
          title: "Offer",
          fields: [
            defineField({
              name: "qty",
              title: "Pieces",
              type: "number",
              description: "2, 3, …",
              validation: (Rule) => Rule.required().integer().min(2).max(20),
            }),
            defineField({
              name: "price",
              title: "Pack price (EGP)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "badge",
              title: "Badge (optional)",
              type: "localeString",
              description: "Small label, e.g. Popular / الأكثر. Empty = no badge.",
            }),
          ],
          preview: {
            select: { qty: "qty", price: "price" },
            prepare({ qty, price }) {
              return {
                title: qty ? `${qty} pieces` : "Offer",
                subtitle: typeof price === "number" ? `EGP ${price}` : "",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "localeText",
      group: "page",
      description: "Product page — Description. Empty keeps the site default.",
    }),
    defineField({
      name: "includes",
      title: "What's included",
      type: "localeText",
      group: "page",
      description: "Product page — What's included. Empty keeps the site default.",
    }),
    defineField({
      name: "how",
      title: "How it works",
      type: "localeText",
      group: "page",
      description: "Product page — How it works. Empty keeps the site default.",
    }),
    defineField({
      name: "compatibility",
      title: "Compatibility",
      type: "localeText",
      group: "page",
      description: "Product page — Compatibility. Empty keeps the site default.",
    }),
  ],
});
