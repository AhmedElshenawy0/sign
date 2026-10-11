/**
 * Upserts homepage / about / NFC / store / intro copy from the live i18n files.
 * Does not touch Express, Prisma, Neon, /admin, or project documents.
 *
 * Token: SANITY_API_WRITE_TOKEN in .env.local, or `npx sanity exec --with-user-token`
 * Optional: npm run sanity:seed -- storePage
 */
import { createReadStream, existsSync, readFileSync } from "node:fs";
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
async function uploadImage(absPath, filename) {
  const uploaded = await client.assets.upload(
    "image",
    createReadStream(absPath),
    { filename },
  );
  return {
    _type: "image",
    asset: { _type: "reference", _ref: uploaded._id },
  };
}

async function uploadFile(absPath, filename) {
  const uploaded = await client.assets.upload(
    "file",
    createReadStream(absPath),
    { filename },
  );
  return {
    _type: "file",
    asset: { _type: "reference", _ref: uploaded._id },
  };
}

const service = (key) => ({
  title: loc(en.home.services[key].title, ar.home.services[key].title),
  description: locText(
    en.home.services[key].description,
    ar.home.services[key].description,
  ),
  tag: loc(en.home.services[key].tag, ar.home.services[key].tag),
  stat: en.home.services[key].stat,
});

const partnerFiles = [
  { name: "القطان", file: "القطان.png" },
  { name: "الزينى", file: "الزينى.png" },
  { name: "المتبولى", file: "المتبولى.png" },
  { name: "باب الحارة", file: "باب الحارة.png" },
  { name: "كوتشى", file: "كوتشى.png" },
  { name: "جيرلز", file: "جيرلز.png" },
  { name: "الزميتى", file: "الزميتى.png" },
  { name: "الجندى", file: "الجندى.png" },
  { name: "هلال", file: "هلال.png" },
  { name: "النخبة", file: "النخبة.png" },
  { name: "هيرو", file: "هيرو.png" },
  { name: "تمامى", file: "تمامى.png" },
  { name: "سي", file: "سي (1).png" },
  { name: "عيون المدينة", file: "عيون المدينة.png" },
  { name: "قنديل", file: "قنديل.png" },
  { name: "نجم", file: "نجم.png" },
  { name: "نيو انجلاند", file: "نيو انجلاند.png" },
];

const partners = [];
for (const [index, item] of partnerFiles.entries()) {
  const abs = join(root, "public/images/Partner", item.file);
  const row = { _key: `partner-${index + 1}`, name: item.name };
  if (existsSync(abs)) {
    row.logo = await uploadImage(abs, item.file);
    console.log("uploaded partner", item.name);
  } else {
    row.logoUrl = `/images/Partner/${item.file}`;
    console.warn("missing partner file", item.file);
  }
  partners.push(row);
}

const introVideo = await uploadFile(
  join(root, "public/videos/intro.mp4"),
  "intro.mp4",
);
const introPosterImage = await uploadImage(
  join(root, "public/images/sign7.jpg"),
  "sign7.jpg",
);
const founderPhoto = await uploadImage(
  join(root, "public/founder.PNG"),
  "founder.PNG",
);
const standImage = await uploadImage(
  join(root, "public/images/nfc/stand-signup.jpg"),
  "stand-signup.jpg",
);
const cardImage = await uploadImage(
  join(root, "public/images/nfc/nfc-card.jpg"),
  "nfc-card.jpg",
);
const ringImage = await uploadImage(
  join(root, "public/images/nfc/nfc-ring.jpg"),
  "nfc-ring.jpg",
);
const medalImage = await uploadImage(
  join(root, "public/images/nfc/nfc-medal.jpg"),
  "nfc-medal.jpg",
);
console.log("uploaded intro, poster, founder, nfc stills");

async function nfcExampleRefs(type) {
  const rows = await client.fetch(
    `*[_type == "project" && type == $type] | order(sortOrder asc, _createdAt desc)[0...2]{ _id }`,
    { type },
  );
  return (rows ?? []).map((row, index) => ({
    _type: "reference",
    _ref: row._id,
    _key: `${type}-${index}`,
  }));
}

const existingNfc = await client.fetch(
  `*[_id == "nfcPage"][0]{ cardExamples, ringExamples, medalExamples }`,
);
const cardExamples = existingNfc?.cardExamples?.length
  ? existingNfc.cardExamples
  : await nfcExampleRefs("nfc_card");
const ringExamples = existingNfc?.ringExamples?.length
  ? existingNfc.ringExamples
  : await nfcExampleRefs("nfc_ring");
const medalExamples = existingNfc?.medalExamples?.length
  ? existingNfc.medalExamples
  : await nfcExampleRefs("nfc_medal");

const docs = [
  {
    _id: "siteMedia",
    _type: "siteMedia",
    intro: {
      _type: "cloudinaryAsset",
      file: introVideo,
      resourceType: "video",
    },
    introPoster: {
      _type: "cloudinaryAsset",
      image: introPosterImage,
      resourceType: "image",
    },
    showreel: {
      _type: "cloudinaryAsset",
      file: introVideo,
      resourceType: "video",
    },
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
    founderPhoto,
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
    openSite: loc(en.nfcPage.openSite, ar.nfcPage.openSite),
    ctaHint: loc(en.nfcPage.ctaHint, ar.nfcPage.ctaHint),
    standKicker: loc(en.nfcPage.standKicker, ar.nfcPage.standKicker),
    standTitle: loc(en.nfcPage.standTitle, ar.nfcPage.standTitle),
    standBody: locText(en.nfcPage.standBody, ar.nfcPage.standBody),
    standImage,
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
    cardImage,
    cardExamples,
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
    ringImage,
    ringExamples,
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
    medalImage,
    medalExamples,
  },
];

const STORE_IMAGES = {
  brand_identity: "identity.jpg",
  packaging: "packaging.jpg",
  prints: "prints.jpg",
  social_media: "social.jpg",
  outdoors: "outdoors.jpg",
  brand_strategy: "strategy.jpg",
  marketing_strategy: "marketing.jpg",
  photos: "photos.jpg",
  videos: "film.jpg",
  nfc_card: "nfc-card.jpg",
  nfc_ring: "nfc-ring.jpg",
  nfc_medal: "nfc-medal.jpg",
};

async function uploadStoreImage(filename) {
  const uploaded = await client.assets.upload(
    "image",
    createReadStream(join(root, "public/images/store", filename)),
    { filename },
  );
  return {
    _type: "image",
    asset: { _type: "reference", _ref: uploaded._id },
  };
}

async function storeItem(key) {
  return {
    _type: "storeItem",
    title: loc(en.store.items[key].title, ar.store.items[key].title),
    line: locText(en.store.items[key].line, ar.store.items[key].line),
    image: await uploadStoreImage(STORE_IMAGES[key]),
  };
}

const requested = process.argv.slice(2).filter(Boolean);
const knownIds = ["siteMedia", "homePage", "aboutPage", "nfcPage", "storePage"];
const unknown = requested.find((id) => !knownIds.includes(id));
if (unknown) {
  console.error(`Unknown document id: ${unknown}`);
  process.exit(1);
}

if (!requested.length || requested.includes("storePage")) {
  const storeItems = {};
  for (const key of Object.keys(STORE_IMAGES)) {
    storeItems[key] = await storeItem(key);
    console.log("uploaded store image", key);
  }

  docs.push({
    _id: "storePage",
    _type: "storePage",
    eyebrow: loc(en.store.eyebrow, ar.store.eyebrow),
    title: loc(en.store.title, ar.store.title),
    quote: loc(en.store.quote, ar.store.quote),
    groupAll: loc(en.store.groups.all, ar.store.groups.all),
    groupIdentity: loc(en.store.groups.identity, ar.store.groups.identity),
    groupStrategy: loc(en.store.groups.strategy, ar.store.groups.strategy),
    groupCampaign: loc(en.store.groups.campaign, ar.store.groups.campaign),
    groupCapture: loc(en.store.groups.capture, ar.store.groups.capture),
    groupNfc: loc(en.store.groups.nfc, ar.store.groups.nfc),
    items: storeItems,
  });
}

const selected = requested.length
  ? docs.filter((doc) => requested.includes(doc._id))
  : docs;

for (const doc of selected) {
  await client.createOrReplace(doc);
  try {
    await client.delete(`drafts.${doc._id}`);
  } catch {
    // No draft to drop.
  }
  console.log("upserted", doc._id);
}

console.log("Current site copy is in Sanity. Refresh /studio and Publish is already applied.");
