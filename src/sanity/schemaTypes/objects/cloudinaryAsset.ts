import { defineField, defineType } from "sanity";
import { CloudinaryAssetInput } from "@/sanity/components/CloudinaryAssetInput";

export const cloudinaryAsset = defineType({
  name: "cloudinaryAsset",
  title: "Media",
  type: "object",
  components: { input: CloudinaryAssetInput },
  fields: [
    defineField({
      name: "image",
      title: "Upload image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "file",
      title: "Upload video",
      type: "file",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "url",
      title: "Or paste a URL",
      type: "string",
      description: "Leave empty if you uploaded a file above.",
    }),
    defineField({
      name: "publicId",
      title: "Cloudinary public ID",
      type: "string",
      description: "Optional. Only if the pasted URL is on Cloudinary.",
      hidden: ({ parent }) => !parent?.url,
    }),
    defineField({
      name: "resourceType",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "image",
      hidden: ({ parent }) => Boolean(parent?.image || parent?.file),
    }),
  ],
  preview: {
    select: {
      url: "url",
      publicId: "publicId",
      resourceType: "resourceType",
      image: "image",
      filename: "file.asset.originalFilename",
    },
    prepare({ url, publicId, resourceType, image, filename }) {
      return {
        title: filename || publicId || url || "Media",
        subtitle: filename ? "Sanity video" : resourceType || (image ? "image" : "media"),
        media: image,
      };
    },
  },
});
