import { defineField, defineType } from "sanity";

const serviceKeys = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
] as const;

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats" },
    { name: "about", title: "About / Vision" },
    { name: "process", title: "Process" },
    { name: "services", title: "Services" },
  ],
  fields: [
    defineField({
      name: "studioPill",
      title: "Studio pill",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "localeString",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "localeText",
      group: "hero",
      description: "Use <1>Sign Up</1> around the highlighted brand name, same as the current i18n string.",
    }),
    defineField({
      name: "partners",
      title: "Partner logos",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "logo", type: "image", title: "Logo", options: { hotspot: true } },
            { name: "logoUrl", type: "string", title: "Or image URL" },
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
    }),
    defineField({
      name: "experienceValue",
      title: "Years of experience (number)",
      type: "number",
      group: "stats",
      initialValue: 8,
    }),
    defineField({
      name: "clientsValue",
      title: "Clients (number)",
      type: "number",
      group: "stats",
      initialValue: 120,
    }),
    defineField({
      name: "campaignsValue",
      title: "Campaigns (number)",
      type: "number",
      group: "stats",
      initialValue: 350,
    }),
    defineField({
      name: "satisfactionValue",
      title: "Satisfaction (number)",
      type: "number",
      group: "stats",
      initialValue: 98,
    }),
    defineField({
      name: "aboutTitle",
      title: "Who we are — title",
      type: "localeString",
      group: "about",
    }),
    defineField({
      name: "aboutDescription",
      title: "Who we are — description",
      type: "localeText",
      group: "about",
    }),
    defineField({
      name: "differentTitle",
      title: "What makes us different — title",
      type: "localeString",
      group: "about",
    }),
    defineField({
      name: "differentDesc",
      title: "What makes us different — text",
      type: "localeText",
      group: "about",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision — title",
      type: "localeString",
      group: "about",
    }),
    defineField({
      name: "visionDesc",
      title: "Vision — text",
      type: "localeText",
      group: "about",
    }),
    defineField({
      name: "missionTitle",
      title: "Mission — title",
      type: "localeString",
      group: "about",
    }),
    defineField({
      name: "missionDesc",
      title: "Mission — text",
      type: "localeText",
      group: "about",
    }),
    defineField({
      name: "processTitle",
      title: "Process title",
      type: "localeString",
      group: "process",
    }),
    defineField({
      name: "processDescription",
      title: "Process description",
      type: "localeText",
      group: "process",
    }),
    defineField({
      name: "discoverTitle",
      title: "Discover — title",
      type: "localeString",
      group: "process",
    }),
    defineField({
      name: "discoverDesc",
      title: "Discover — text",
      type: "localeText",
      group: "process",
    }),
    defineField({
      name: "strategyTitle",
      title: "Strategy — title",
      type: "localeString",
      group: "process",
    }),
    defineField({
      name: "strategyDesc",
      title: "Strategy — text",
      type: "localeText",
      group: "process",
    }),
    defineField({
      name: "executeTitle",
      title: "Execute — title",
      type: "localeString",
      group: "process",
    }),
    defineField({
      name: "executeDesc",
      title: "Execute — text",
      type: "localeText",
      group: "process",
    }),
    defineField({
      name: "optimizeTitle",
      title: "Optimize — title",
      type: "localeString",
      group: "process",
    }),
    defineField({
      name: "optimizeDesc",
      title: "Optimize — text",
      type: "localeText",
      group: "process",
    }),
    defineField({
      name: "servicesEyebrow",
      title: "Services eyebrow",
      type: "localeString",
      group: "services",
    }),
    defineField({
      name: "servicesTitle",
      title: "Services title",
      type: "localeString",
      group: "services",
    }),
    ...serviceKeys.map((key, index) =>
      defineField({
        name: key,
        title: `Service ${index + 1}`,
        type: "object",
        group: "services",
        fields: [
          { name: "title", type: "localeString", title: "Title" },
          { name: "description", type: "localeText", title: "Description" },
          { name: "tag", type: "localeString", title: "Tag" },
          { name: "stat", type: "string", title: "Stat (shared)" },
        ],
      }),
    ),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
