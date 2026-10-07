import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";

const SINGLETONS = [
  { type: "siteMedia", title: "Intro & showreel" },
  { type: "homePage", title: "Homepage" },
  { type: "aboutPage", title: "About" },
  { type: "nfcPage", title: "NFC page" },
] as const;

const structure: StructureResolver = (S) =>
  S.list()
    .title("Sign Up")
    .items([
      ...SINGLETONS.map((item) =>
        S.listItem()
          .title(item.title)
          .id(item.type)
          .child(S.document().schemaType(item.type).documentId(item.type)),
      ),
      S.divider(),
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(S.documentTypeList("project").title("Projects")),
    ]);

export default defineConfig({
  name: "signup",
  title: "Sign Up CMS",
  projectId: sanityProjectId || "missingid",
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-10-01" }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (template) =>
          !SINGLETONS.some((item) => item.type === template.schemaType),
      ),
  },
});
