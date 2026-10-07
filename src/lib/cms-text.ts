export type LocaleField = {
  en?: string | null;
  ar?: string | null;
};

export function cmsText(
  field: LocaleField | string | null | undefined,
  lang: string,
  fallback: string,
) {
  if (typeof field === "string") {
    return field.trim() || fallback;
  }
  const isAr = lang.toLowerCase().startsWith("ar");
  const value = isAr ? field?.ar || field?.en : field?.en || field?.ar;
  return value?.trim() || fallback;
}
