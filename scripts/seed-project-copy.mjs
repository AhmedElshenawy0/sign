/**
 * Fills existing Project documents with the live default EN/AR sentences
 * so Studio fields match what the journey already shows.
 * Does not replace covers, extra photos, titles, or service type.
 *
 * Run: npm run sanity:seed:project-copy
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
    "Missing Sanity write access. Add SANITY_API_WRITE_TOKEN in .env.local, then: npm run sanity:seed:project-copy",
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

function loc(existing, enText, arText) {
  return {
    _type: "localeString",
    en: existing?.en?.trim() || enText,
    ar: existing?.ar?.trim() || arText,
  };
}

function locText(existing, enText, arText) {
  return {
    _type: "localeText",
    en: existing?.en?.trim() || enText,
    ar: existing?.ar?.trim() || arText,
  };
}

function chapter(existing, enCh, arCh) {
  return {
    _type: "journeyChapter",
    kicker: loc(existing?.kicker, enCh.kicker, arCh.kicker),
    title: loc(existing?.title, enCh.title, arCh.title),
    body: locText(existing?.body, enCh.body, arCh.body),
  };
}

function journeyCopyFor(type, existing, story) {
  const enCh = en.projects.journey.chapters;
  const arCh = ar.projects.journey.chapters;
  const enLine = en.projects.journey.lines[type] || "";
  const arLine = ar.projects.journey.lines[type] || "";
  const lineEn = story?.trim() || enLine;
  const lineAr = story?.trim() || arLine;
  const copy = existing && typeof existing === "object" ? existing : {};

  if (type === "brand_identity") {
    return {
      _type: "journeyCopy",
      scroll: loc(copy.scroll, enCh.identity.scroll, arCh.identity.scroll),
      mark: chapter(copy.mark, enCh.identity.mark, arCh.identity.mark),
      voice: chapter(copy.voice, enCh.identity.voice, arCh.identity.voice),
      world: chapter(copy.world, enCh.identity.world, arCh.identity.world),
      applications: (enCh.identity.applications || []).map((label, index) => ({
        _key: copy.applications?.[index]?._key || `app-${index}`,
        ...loc(
          copy.applications?.[index],
          label,
          arCh.identity.applications?.[index] || label,
        ),
      })),
    };
  }

  if (type === "packaging") {
    return {
      _type: "journeyCopy",
      kicker: loc(copy.kicker, enCh.packaging.kicker, arCh.packaging.kicker),
      range: chapter(copy.range, {
        ...enCh.packaging.range,
        body: lineEn,
      }, {
        ...arCh.packaging.range,
        body: lineAr,
      }),
      skus: loc(copy.skus, enCh.packaging.skus, arCh.packaging.skus),
    };
  }

  if (type === "prints") {
    return {
      _type: "journeyCopy",
      kicker: loc(copy.kicker, enCh.prints.kicker, arCh.prints.kicker),
    };
  }

  if (type === "social_media") {
    return {
      _type: "journeyCopy",
      kicker: loc(copy.kicker, enCh.social.kicker, arCh.social.kicker),
    };
  }

  if (type === "brand_strategy" || type === "marketing_strategy") {
    const enSteps = enCh[type].steps;
    const arSteps = arCh[type].steps;
    return {
      _type: "journeyCopy",
      kicker: loc(copy.kicker, enCh[type].kicker, arCh[type].kicker),
      steps: enSteps.map((step, index) => ({
        _key: copy.steps?.[index]?._key || `step-${index}`,
        ...chapter(copy.steps?.[index], step, arSteps[index]),
      })),
    };
  }

  if (type === "photos") {
    return {
      _type: "journeyCopy",
      kicker: loc(copy.kicker, enCh.photos.kicker, arCh.photos.kicker),
    };
  }

  if (type === "videos") {
    return {
      _type: "journeyCopy",
      kicker: loc(copy.kicker, enCh.videos.kicker, arCh.videos.kicker),
    };
  }

  if (type === "nfc_card" || type === "nfc_ring" || type === "nfc_medal") {
    return {
      _type: "journeyCopy",
      wear: loc(copy.wear, enCh[type].wear, arCh[type].wear),
    };
  }

  return { _type: "journeyCopy", ...copy };
}

function fillGallery(type, gallery, copy) {
  if (!Array.isArray(gallery) || !gallery.length) return null;
  const slotChapter = {
    logo_on_product: copy?.mark,
    brand_book: copy?.voice,
    detail: type === "packaging" ? copy?.range : null,
  };
  const stepRoles =
    type === "brand_strategy"
      ? ["now", "horizon", "path"]
      : type === "marketing_strategy"
        ? ["budget", "time", "mix"]
        : [];

  let changed = false;
  const next = gallery.map((item) => {
    const role = item.role;
    let chapterCopy = role ? slotChapter[role] : null;
    if (!chapterCopy && stepRoles.includes(role)) {
      chapterCopy = copy?.steps?.[stepRoles.indexOf(role)];
    }
    if (!chapterCopy) return item;
    changed = true;
    return {
      ...item,
      kicker: loc(item.kicker, chapterCopy.kicker?.en, chapterCopy.kicker?.ar),
      title: loc(item.title, chapterCopy.title?.en, chapterCopy.title?.ar),
      body: locText(item.body, chapterCopy.body?.en, chapterCopy.body?.ar),
    };
  });
  return changed ? next : null;
}

const docs = await client.fetch(
  `*[_type == "project"]{ _id, title, type, story, journeyCopy, gallery }`,
);

for (const doc of docs) {
  const journeyCopy = journeyCopyFor(doc.type, doc.journeyCopy, doc.story);
  const patch = { journeyCopy };
  if (!doc.story?.trim()) {
    patch.story =
      en.projects.journey.lines[doc.type] || doc.title || "";
  }
  const gallery = fillGallery(doc.type, doc.gallery, journeyCopy);
  if (gallery) patch.gallery = gallery;

  await client.patch(doc._id).set(patch).commit();
  try {
    await client.patch(`drafts.${doc._id}`).set(patch).commit();
  } catch {
    // No draft.
  }
  console.log("filled", doc.title || doc._id);
}

console.log(`Filled ${docs.length} project(s). Refresh /studio.`);
