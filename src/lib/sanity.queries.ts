import type { LocaleField } from "@/lib/cms-text";
import type { ProjectJourneyCopy } from "@/lib/journey-copy";

export type CloudinaryAssetDoc = {
  url?: string | null;
  publicId?: string | null;
  resourceType?: "image" | "video" | null;
  imageUrl?: string | null;
  fileUrl?: string | null;
};

export type SanityGalleryItem = {
  role?: string | null;
  caption?: string | null;
  kicker?: LocaleField | null;
  title?: LocaleField | null;
  body?: LocaleField | null;
  asset?: CloudinaryAssetDoc | null;
};

export type SanityProjectDoc = {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title?: string;
  type?: string;
  sortOrder?: number;
  story?: string | null;
  hero?: CloudinaryAssetDoc | null;
  poster?: CloudinaryAssetDoc | null;
  gallery?: SanityGalleryItem[] | null;
  journeyCopy?: ProjectJourneyCopy | null;
};

export type SanitySiteMedia = {
  intro?: CloudinaryAssetDoc | null;
  introPoster?: CloudinaryAssetDoc | null;
  showreel?: CloudinaryAssetDoc | null;
  eyebrowEn?: string | null;
  eyebrowAr?: string | null;
  titleEn?: string | null;
  titleAr?: string | null;
};

export type SanityServiceBlock = {
  title?: LocaleField | null;
  description?: LocaleField | null;
  tag?: LocaleField | null;
  stat?: string | null;
};

export type SanityPartner = {
  name?: string | null;
  logoUrl?: string | null;
  logo?: { asset?: { url?: string | null } } | null;
};

export type SanityHomePage = {
  studioPill?: LocaleField | null;
  heroTitle?: LocaleField | null;
  heroDescription?: LocaleField | null;
  partners?: SanityPartner[] | null;
  experienceValue?: number | null;
  clientsValue?: number | null;
  campaignsValue?: number | null;
  satisfactionValue?: number | null;
  aboutTitle?: LocaleField | null;
  aboutDescription?: LocaleField | null;
  differentTitle?: LocaleField | null;
  differentDesc?: LocaleField | null;
  visionTitle?: LocaleField | null;
  visionDesc?: LocaleField | null;
  missionTitle?: LocaleField | null;
  missionDesc?: LocaleField | null;
  processTitle?: LocaleField | null;
  processDescription?: LocaleField | null;
  discoverTitle?: LocaleField | null;
  discoverDesc?: LocaleField | null;
  strategyTitle?: LocaleField | null;
  strategyDesc?: LocaleField | null;
  executeTitle?: LocaleField | null;
  executeDesc?: LocaleField | null;
  optimizeTitle?: LocaleField | null;
  optimizeDesc?: LocaleField | null;
  servicesEyebrow?: LocaleField | null;
  servicesTitle?: LocaleField | null;
  section1?: SanityServiceBlock | null;
  section2?: SanityServiceBlock | null;
  section3?: SanityServiceBlock | null;
  section4?: SanityServiceBlock | null;
  section5?: SanityServiceBlock | null;
  section6?: SanityServiceBlock | null;
};

export type SanityAboutPage = {
  eyebrow?: LocaleField | null;
  title?: LocaleField | null;
  description?: LocaleField | null;
  yearsValue?: string | null;
  clientsValue?: string | null;
  campaignsValue?: string | null;
  whatEyebrow?: LocaleField | null;
  whatTitle?: LocaleField | null;
  whatDescription?: LocaleField | null;
  founderEyebrow?: LocaleField | null;
  founderName?: string | null;
  founderJob?: LocaleField | null;
  founderBio?: LocaleField | null;
  founderPhotoUrl?: string | null;
  milestones?: { value?: LocaleField | null; label?: LocaleField | null }[] | null;
};

export type SanityNfcPage = {
  eyebrow?: LocaleField | null;
  title?: LocaleField | null;
  description?: LocaleField | null;
  openSite?: LocaleField | null;
  ctaHint?: LocaleField | null;
  standKicker?: LocaleField | null;
  standTitle?: LocaleField | null;
  standBody?: LocaleField | null;
  standImageUrl?: string | null;
  cardKicker?: LocaleField | null;
  cardTitle?: LocaleField | null;
  cardBody?: LocaleField | null;
  ringKicker?: LocaleField | null;
  ringTitle?: LocaleField | null;
  ringBody?: LocaleField | null;
  medalKicker?: LocaleField | null;
  medalTitle?: LocaleField | null;
  medalBody?: LocaleField | null;
  cardExampleIds?: string[] | null;
  ringExampleIds?: string[] | null;
  medalExampleIds?: string[] | null;
};

const ASSET = `{
  url, publicId, resourceType,
  "imageUrl": image.asset->url,
  "fileUrl": file.asset->url
}`;
const LOCALE = `{ en, ar }`;
const CHAPTER = `{ kicker ${LOCALE}, title ${LOCALE}, body ${LOCALE} }`;
const JOURNEY_COPY = `journeyCopy {
  scroll ${LOCALE}, kicker ${LOCALE}, skus ${LOCALE}, wear ${LOCALE},
  mark ${CHAPTER}, voice ${CHAPTER}, world ${CHAPTER}, range ${CHAPTER},
  applications[] ${LOCALE},
  steps[] ${CHAPTER}
}`;

export const PROJECTS_QUERY = `*[_type == "project"] | order(sortOrder asc, _createdAt desc) {
  _id, _createdAt, _updatedAt, title, type, sortOrder, story,
  hero ${ASSET}, poster ${ASSET},
  gallery[] { role, caption, kicker ${LOCALE}, title ${LOCALE}, body ${LOCALE}, asset ${ASSET} }
}`;

export const PROJECT_QUERY = `*[_type == "project" && _id == $id][0] {
  _id, _createdAt, _updatedAt, title, type, sortOrder, story,
  hero ${ASSET}, poster ${ASSET},
  gallery[] { role, caption, kicker ${LOCALE}, title ${LOCALE}, body ${LOCALE}, asset ${ASSET} },
  ${JOURNEY_COPY}
}`;

export const SITE_MEDIA_QUERY = `*[_type == "siteMedia" && _id == "siteMedia"][0] {
  intro ${ASSET}, introPoster ${ASSET}, showreel ${ASSET},
  eyebrowEn, eyebrowAr, titleEn, titleAr
}`;

export const HOME_PAGE_QUERY = `*[_type == "homePage" && _id == "homePage"][0] {
  studioPill ${LOCALE}, heroTitle ${LOCALE}, heroDescription ${LOCALE},
  partners[] { name, "logoUrl": coalesce(logoUrl, logo.asset->url) },
  experienceValue, clientsValue, campaignsValue, satisfactionValue,
  aboutTitle ${LOCALE}, aboutDescription ${LOCALE},
  differentTitle ${LOCALE}, differentDesc ${LOCALE},
  visionTitle ${LOCALE}, visionDesc ${LOCALE},
  missionTitle ${LOCALE}, missionDesc ${LOCALE},
  processTitle ${LOCALE}, processDescription ${LOCALE},
  discoverTitle ${LOCALE}, discoverDesc ${LOCALE},
  strategyTitle ${LOCALE}, strategyDesc ${LOCALE},
  executeTitle ${LOCALE}, executeDesc ${LOCALE},
  optimizeTitle ${LOCALE}, optimizeDesc ${LOCALE},
  servicesEyebrow ${LOCALE}, servicesTitle ${LOCALE},
  section1 { title ${LOCALE}, description ${LOCALE}, tag ${LOCALE}, stat },
  section2 { title ${LOCALE}, description ${LOCALE}, tag ${LOCALE}, stat },
  section3 { title ${LOCALE}, description ${LOCALE}, tag ${LOCALE}, stat },
  section4 { title ${LOCALE}, description ${LOCALE}, tag ${LOCALE}, stat },
  section5 { title ${LOCALE}, description ${LOCALE}, tag ${LOCALE}, stat },
  section6 { title ${LOCALE}, description ${LOCALE}, tag ${LOCALE}, stat }
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage" && _id == "aboutPage"][0] {
  eyebrow ${LOCALE}, title ${LOCALE}, description ${LOCALE},
  yearsValue, clientsValue, campaignsValue,
  whatEyebrow ${LOCALE}, whatTitle ${LOCALE}, whatDescription ${LOCALE},
  founderEyebrow ${LOCALE}, founderName, founderJob ${LOCALE}, founderBio ${LOCALE},
  "founderPhotoUrl": coalesce(founderPhotoUrl, founderPhoto.asset->url),
  milestones[] { value ${LOCALE}, label ${LOCALE} }
}`;

export const NFC_PAGE_QUERY = `*[_type == "nfcPage" && _id == "nfcPage"][0] {
  eyebrow ${LOCALE}, title ${LOCALE}, description ${LOCALE},
  openSite ${LOCALE}, ctaHint ${LOCALE},
  standKicker ${LOCALE}, standTitle ${LOCALE}, standBody ${LOCALE},
  "standImageUrl": coalesce(standImageUrl, standImage.asset->url),
  cardKicker ${LOCALE}, cardTitle ${LOCALE}, cardBody ${LOCALE},
  ringKicker ${LOCALE}, ringTitle ${LOCALE}, ringBody ${LOCALE},
  medalKicker ${LOCALE}, medalTitle ${LOCALE}, medalBody ${LOCALE},
  "cardExampleIds": cardExamples[]._ref,
  "ringExampleIds": ringExamples[]._ref,
  "medalExampleIds": medalExamples[]._ref
}`;
