import { cmsText, type LocaleField } from "@/lib/cms-text";

export type LocaleChapter = {
  kicker?: LocaleField | null;
  title?: LocaleField | null;
  body?: LocaleField | null;
};

export type ProjectJourneyCopy = {
  scroll?: LocaleField | null;
  mark?: LocaleChapter | null;
  voice?: LocaleChapter | null;
  world?: LocaleChapter | null;
  applications?: LocaleField[] | null;
  kicker?: LocaleField | null;
  range?: LocaleChapter | null;
  skus?: LocaleField | null;
  steps?: LocaleChapter[] | null;
  wear?: LocaleField | null;
};

export function copyLine(
  field: LocaleField | null | undefined,
  lang: string,
  fallback: string,
) {
  return cmsText(field, lang, fallback);
}

export function copyChapter(
  chapter: LocaleChapter | null | undefined,
  lang: string,
  fallback: { kicker: string; title: string; body: string },
) {
  return {
    kicker: cmsText(chapter?.kicker, lang, fallback.kicker),
    title: cmsText(chapter?.title, lang, fallback.title),
    body: cmsText(chapter?.body, lang, fallback.body),
  };
}

export function copyApplications(
  fields: LocaleField[] | null | undefined,
  lang: string,
  fallback: string[],
) {
  return fallback.map((label, index) => cmsText(fields?.[index], lang, label));
}

export function stillAsChapter(item?: {
  kicker?: LocaleField | null;
  title?: LocaleField | null;
  body?: LocaleField | null;
} | null): LocaleChapter | undefined {
  if (!item) return undefined;
  if (!item.kicker && !item.title && !item.body) return undefined;
  return { kicker: item.kicker, title: item.title, body: item.body };
}

/** Extra photo text, then Page sentences, then the site default. */
export function copyChapterPref(
  still: LocaleChapter | null | undefined,
  page: LocaleChapter | null | undefined,
  lang: string,
  fallback: { kicker: string; title: string; body: string },
) {
  return {
    kicker: cmsText(still?.kicker, lang, cmsText(page?.kicker, lang, fallback.kicker)),
    title: cmsText(still?.title, lang, cmsText(page?.title, lang, fallback.title)),
    body: cmsText(still?.body, lang, cmsText(page?.body, lang, fallback.body)),
  };
}

export function stillCaption(
  item:
    | {
        kicker?: LocaleField | null;
        body?: LocaleField | null;
        caption?: string | null;
      }
    | null
    | undefined,
  lang: string,
  fallback = "",
) {
  if (!item) return fallback;
  return cmsText(item.body, lang, item.caption?.trim() || fallback);
}
