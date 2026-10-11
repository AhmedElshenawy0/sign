import { type ObjectInputProps, useFormValue } from "sanity";

function pathNames(path: ObjectInputProps["path"]) {
  return path
    .map((segment) => (typeof segment === "string" ? segment : ""))
    .filter(Boolean);
}

function mediaKind(
  path: ObjectInputProps["path"],
  projectType?: string,
): "image" | "video" | "both" {
  const names = pathNames(path);
  if (
    names.includes("gallery") ||
    names.includes("poster") ||
    names.includes("introPoster")
  ) {
    return "image";
  }
  if (names.includes("intro") || names.includes("showreel")) {
    return "video";
  }
  if (names.includes("hero")) {
    return projectType === "videos" ? "video" : "image";
  }
  return "both";
}

export function CloudinaryAssetInput(props: ObjectInputProps) {
  const projectType = useFormValue(["type"]) as string | undefined;
  const kind = mediaKind(props.path, projectType);

  return props.renderDefault({
    ...props,
    schemaType: {
      ...props.schemaType,
      fields: props.schemaType.fields.map((field) => {
        if (field.name === "image" && kind === "video") {
          return { ...field, hidden: true };
        }
        if (field.name === "file" && kind === "image") {
          return { ...field, hidden: true };
        }
        if (field.name === "resourceType" && kind !== "both") {
          return { ...field, hidden: true };
        }
        return field;
      }),
    },
  });
}
