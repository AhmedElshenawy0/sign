/**
 * Upserts homepage / about / NFC / intro copy from the live i18n files.
 * Does not touch Express, Prisma, Neon, /admin, or project documents.
 *
 * Token: SANITY_API_WRITE_TOKEN in .env.local, or `npx sanity exec --with-user-token`
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "next-sanity";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const en = JSON.parse(
  readFileSync(join(root, "src/translation/en/translation.json"), "utf8"),
);
const ar = JSON.parse(
  readFileSync(join(root, "src/translation/ar/translation.json"), "utf8"),
);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.SANITY_AUTH_TOKEN?.trim();

if (!projectId || !token) {
  console.error(
    "Missing Sanity write access. Add SANITY_API_WRITE_TOKEN in .env.local (Editor token from sanity.io/manage → API → Tokens), then: npm run sanity:seed",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const loc = (enText, arText = "") => ({
  _type: "localeString",
  en: enText,
  ar: arText,
});
const locText = (enText, arText = "") => ({
  _type: "localeText",
  en: enText,
  ar: arText,
});
const asset = (url, resourceType = "image", publicId = "") => ({
  _type: "cloudinaryAsset",
  url,
  publicId,
  resourceType,
});

const service = (key) => ({
  title: loc(en.home.services[key].title, ar.home.services[key].title),
  description: locText(
    en.home.services[key].description,
    ar.home.services[key].description,
  ),
  tag: loc(en.home.services[key].tag, ar.home.services[key].tag),
  stat: en.home.services[key].stat,
});

const partners = [
  { name: "القطان", logo: "/images/Partner/القطان.png" },
  { name: "الزينى", logo: "/images/Partner/الزينى.png" },
  { name: "المتبولى", logo: "/images/Partner/المتبولى.png" },
  { name: "باب الحارة", logo: "/images/Partner/باب الحارة.png" },
  { name: "كوتشى", logo: "/images/Partner/كوتشى.png" },
  { name: "جيرلز", logo: "/images/Partner/جيرلز.png" },
  { name: "الزميتى", logo: "/images/Partner/الزميتى.png" },
  { name: "الجندى", logo: "/images/Partner/الجندى.png" },
  { name: "هلال", logo: "/images/Partner/هلال.png" },
  { name: "النخبة", logo: "/images/Partner/النخبة.png" },
  { name: "هيرو", logo: "/images/Partner/هيرو.png" },
  { name: "تمامى", logo: "/images/Partner/تمامى.png" },
  { name: "سي", logo: "/images/Partner/سي (1).png" },
  { name: "عيون المدينة", logo: "/images/Partner/عيون المدينة.png" },
  { name: "قنديل", logo: "/images/Partner/قنديل.png" },
  { name: "نجم", logo: "/images/Partner/نجم.png" },
  { name: "نيو انجلاند", logo: "/images/Partner/نيو انجلاند.png" },
].map((item, index) => ({
  _key: `partner-${index + 1}`,
  name: item.name,
  logoUrl: item.logo,
}));

const docs = [
  {
    _id: "siteMedia",
    _type: "siteMedia",
    intro: asset("/videos/intro.mp4", "video"),
    introPoster: asset("/images/sign7.jpg", "image"),
    showreel: asset("/videos/intro.mp4", "video"),
    eyebrowEn: en.home.hero.visualProof,
    eyebrowAr: ar.home.hero.visualProof,
    titleEn: en.home.hero.showreel,
    titleAr: ar.home.hero.showreel,
  },
  {
    _id: "homePage",
    _type: "homePage",
    studioPill: loc(en.home.hero.studioPill, ar.home.hero.studioPill),
    heroTitle: loc(en.home.hero.title, ar.home.hero.title),
    heroDescription: locText(en.home.hero.description, ar.home.hero.description),
    partners,
    experienceValue: 8,
    clientsValue: 120,
    campaignsValue: 350,
    satisfactionValue: 98,
    aboutTitle: loc(en.home.about.title, ar.home.about.title),
    aboutDescription: locText(
      en.home.about.description,
      ar.home.about.description,
    ),
    differentTitle: loc(
      en.home.about.whatMakesUsDifferentTitle,
      ar.home.about.whatMakesUsDifferentTitle,
    ),
    differentDesc: locText(
      en.home.about.whatMakesUsDifferentDesc,
      ar.home.about.whatMakesUsDifferentDesc,
    ),
    visionTitle: loc(en.home.about.visionTitle, ar.home.about.visionTitle),
    visionDesc: locText(en.home.about.visionDesc, ar.home.about.visionDesc),
    missionTitle: loc(en.home.about.missionTitle, ar.home.about.missionTitle),
    missionDesc: locText(en.home.about.missionDesc, ar.home.about.missionDesc),
    processTitle: loc(
      en.home.process.architectureTitle,
      ar.home.process.architectureTitle,
    ),
    processDescription: locText(
      en.home.process.description,
      ar.home.process.description,
    ),
    discoverTitle: loc(
      en.home.process.discover.title,
      ar.home.process.discover.title,
    ),
    discoverDesc: locText(
      en.home.process.discover.desc,
      ar.home.process.discover.desc,
    ),
    strategyTitle: loc(
      en.home.process.strategy.title,
      ar.home.process.strategy.title,
    ),
    strategyDesc: locText(
      en.home.process.strategy.desc,
      ar.home.process.strategy.desc,
    ),
    executeTitle: loc(
      en.home.process.execute.title,
      ar.home.process.execute.title,
    ),
    executeDesc: locText(
      en.home.process.execute.desc,
      ar.home.process.execute.desc,
    ),
    optimizeTitle: loc(
      en.home.process.optimize.title,
      ar.home.process.optimize.title,
    ),
    optimizeDesc: locText(
      en.home.process.optimize.desc,
      ar.home.process.optimize.desc,
    ),
    servicesEyebrow: loc(
      en.home.servicesSection.eyebrow,
      ar.home.servicesSection.eyebrow,
    ),
    servicesTitle: loc(
      en.home.servicesSection.title,
      ar.home.servicesSection.title,
    ),
    section1: service("section1"),
    section2: service("section2"),
    section3: service("section3"),
    section4: service("section4"),
    section5: service("section5"),
    section6: service("section6"),
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    eyebrow: loc(en.about.hero.eyebrow, ar.about.hero.eyebrow),
    title: loc(en.about.hero.title, ar.about.hero.title),
    description: locText(en.about.hero.description, ar.about.hero.description),
    yearsValue: "8+",
    clientsValue: "120+",
    campaignsValue: "350+",
    whatEyebrow: loc(en.about.text.eyebrow, ar.about.text.eyebrow),
    whatTitle: loc(en.about.text.title, ar.about.text.title),
    whatDescription: locText(
      en.about.text.description,
      ar.about.text.description,
    ),
    founderEyebrow: loc(en.about.content.eyebrow, ar.about.content.eyebrow),
    founderName: en.about.content.founderName,
    founderJob: loc(en.about.content.founderJob, ar.about.content.founderJob),
    founderBio: locText(
      en.about.content.aboutFounder,
      ar.about.content.aboutFounder,
    ),
    founderPhotoUrl: "/founder.PNG",
    milestones: ["founded", "reach", "recognition"].map((key) => ({
      _key: key,
      value: loc(
        en.about.milestones[key].value,
        ar.about.milestones[key].value,
      ),
      label: loc(
        en.about.milestones[key].label,
        ar.about.milestones[key].label,
      ),
    })),
  },
  {
    _id: "nfcPage",
    _type: "nfcPage",
    eyebrow: loc(en.nfcPage.eyebrow, ar.nfcPage.eyebrow),
    title: loc(en.nfcPage.title, ar.nfcPage.title),
    description: locText(en.nfcPage.description, ar.nfcPage.description),
    standKicker: loc(en.nfcPage.standKicker, ar.nfcPage.standKicker),
    standTitle: loc(en.nfcPage.standTitle, ar.nfcPage.standTitle),
    standBody: locText(en.nfcPage.standBody, ar.nfcPage.standBody),
    standImageUrl: "/images/nfc/stand.jpg",
    cardKicker: loc(
      en.nfcPage.types.nfc_card.kicker,
      ar.nfcPage.types.nfc_card.kicker,
    ),
    cardTitle: loc(
      en.nfcPage.types.nfc_card.title,
      ar.nfcPage.types.nfc_card.title,
    ),
    cardBody: locText(
      en.nfcPage.types.nfc_card.body,
      ar.nfcPage.types.nfc_card.body,
    ),
    ringKicker: loc(
      en.nfcPage.types.nfc_ring.kicker,
      ar.nfcPage.types.nfc_ring.kicker,
    ),
    ringTitle: loc(
      en.nfcPage.types.nfc_ring.title,
      ar.nfcPage.types.nfc_ring.title,
    ),
    ringBody: locText(
      en.nfcPage.types.nfc_ring.body,
      ar.nfcPage.types.nfc_ring.body,
    ),
    medalKicker: loc(
      en.nfcPage.types.nfc_medal.kicker,
      ar.nfcPage.types.nfc_medal.kicker,
    ),
    medalTitle: loc(
      en.nfcPage.types.nfc_medal.title,
      ar.nfcPage.types.nfc_medal.title,
    ),
    medalBody: locText(
      en.nfcPage.types.nfc_medal.body,
      ar.nfcPage.types.nfc_medal.body,
    ),
  },
];

for (const doc of docs) {
  await client.createOrReplace(doc);
  try {
    await client.delete(`drafts.${doc._id}`);
  } catch {
    // No draft to drop.
  }
  console.log("upserted", doc._id);
}

console.log("Current site copy is in Sanity. Refresh /studio and Publish is already applied.");
