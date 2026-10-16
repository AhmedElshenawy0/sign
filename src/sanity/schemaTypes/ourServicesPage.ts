import { defineField, defineType } from "sanity";
import { PROJECT_TYPE_LABELS, PROJECT_TYPES } from "@/types/project";
import { DEFAULT_RESOLVED_GROUPS } from "@/lib/service-groups";

const TYPE_LIST = PROJECT_TYPES.map((value) => ({
  title: PROJECT_TYPE_LABELS[value],
  value,
}));

export const ourServicesPage = defineType({
  name: "ourServicesPage",
  title: "Our Services tabs",
  type: "document",
  description:
    "Tabs on /projects (Branding, Marketing, …). Add a row to add a tab. Types stay the existing crafts — journey pages do not change. Empty list keeps the four site defaults.",
  fields: [
    defineField({
      name: "groups",
      title: "Service tabs",
      type: "array",
      description:
        "Each row is one tab. Pick which existing project types sit under it. You cannot invent a new journey type here.",
      of: [
        {
          type: "object",
          name: "serviceGroup",
          title: "Service",
          fields: [
            defineField({
              name: "id",
              title: "Id",
              type: "slug",
              description:
                "Stable key, e.g. branding. Do not change after you publish.",
              validation: (Rule) => Rule.required(),
              options: { source: "title.en", maxLength: 48 },
            }),
            defineField({
              name: "title",
              title: "Tab name",
              type: "localeString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "intro",
              title: "Line under the tab",
              type: "localeText",
            }),
            defineField({
              name: "accent",
              title: "Color",
              type: "string",
              options: {
                list: [
                  { title: "Green", value: "green" },
                  { title: "Red", value: "red" },
                  { title: "Purple", value: "move" },
                ],
                layout: "radio",
              },
              initialValue: "green",
            }),
            defineField({
              name: "types",
              title: "Project types in this tab",
              type: "array",
              of: [{ type: "string" }],
              options: { list: TYPE_LIST },
              validation: (Rule) => Rule.min(1).unique(),
            }),
          ],
          preview: {
            select: { title: "title.en", id: "id.current", types: "types" },
            prepare({ title, id, types }) {
              const count = Array.isArray(types) ? types.length : 0;
              return {
                title: title || id || "Service",
                subtitle: `${count} type${count === 1 ? "" : "s"}`,
              };
            },
          },
        },
      ],
      initialValue: DEFAULT_RESOLVED_GROUPS.map((group) => ({
        id: { current: group.id },
        title: group.label,
        intro: group.intro,
        accent: group.accent,
        types: [...group.types],
      })),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Our Services tabs" };
    },
  },
});
