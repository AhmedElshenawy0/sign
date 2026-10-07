/**
 * Upserts Nour House demo projects for every public category.
 * Does not touch Express, Prisma, Neon, /admin, homepage copy, or noor moon.
 *
 * Token: SANITY_API_WRITE_TOKEN in .env.local
 * Run: npm run sanity:seed:demos
 */
import { createReadStream } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "next-sanity";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const markPath = join(root, "scripts/demo-assets/nour-house-mark.jpg");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.SANITY_AUTH_TOKEN?.trim();

if (!projectId || !token) {
  console.error(
    "Missing Sanity write access. Add SANITY_API_WRITE_TOKEN in .env.local, then: npm run sanity:seed:demos",
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

const cache = new Map();

function unsplash(id) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
}

function imageAsset(filename, assetId) {
  return {
    _type: "cloudinaryAsset",
    resourceType: "image",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
  };
}

function fileAsset(assetId) {
  return {
    _type: "cloudinaryAsset",
    resourceType: "video",
    file: {
      _type: "file",
      asset: { _type: "reference", _ref: assetId },
    },
  };
}

async function existingAsset(filename) {
  return client.fetch(
    `*[_type in ["sanity.imageAsset", "sanity.fileAsset"] && originalFilename == $filename][0]._id`,
    { filename },
  );
}

async function uploadFromUrl(url, filename, kind = "image") {
  const cached = cache.get(filename);
  if (cached) return cached;
  const found = await existingAsset(filename);
  if (found) {
    cache.set(filename, found);
    return found;
  }
  const res = await fetch(url, {
    headers: { "User-Agent": "SignUpNourHouseSeed/1.0" },
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${filename}: ${res.status} ${url}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const uploaded = await client.assets.upload(kind, buffer, {
    filename,
    contentType: res.headers.get("content-type") || (kind === "file" ? "video/mp4" : "image/jpeg"),
  });
  cache.set(filename, uploaded._id);
  return uploaded._id;
}

async function uploadLocal(path, filename, kind = "image") {
  const cached = cache.get(filename);
  if (cached) return cached;
  const found = await existingAsset(filename);
  if (found) {
    cache.set(filename, found);
    return found;
  }
  const uploaded = await client.assets.upload(kind, createReadStream(path), {
    filename,
    contentType: "image/jpeg",
  });
  cache.set(filename, uploaded._id);
  return uploaded._id;
}

function still(role, caption, assetId, key) {
  return {
    _key: key,
    _type: "galleryItem",
    role,
    caption,
    asset: imageAsset(`${key}.jpg`, assetId),
  };
}

const projects = [
  {
    id: "demo-nour-house-brand-identity",
    type: "brand_identity",
    title: "Nour House",
    sortOrder: 10,
    story: "A quiet home brand — linen, brass, and light you live with.",
    hero: "photo-1616486338812-3dadae4b4ace",
    slots: [
      { role: "logo_on_product", caption: "The mark", local: true },
      { role: "brand_book", caption: "Colors and type", photo: "photo-1544816155-12df9643f363" },
      { role: "pack", caption: "The pack", photo: "photo-1513519245088-0e12902e5a38" },
      { role: "card", caption: "The card", photo: "photo-1589829545856-d10d557cf95f" },
      { role: "street", caption: "On the street", photo: "photo-1441986300917-64674bd600d8" },
    ],
  },
  {
    id: "demo-nour-house-packaging",
    type: "packaging",
    title: "Nour House — Packaging",
    sortOrder: 11,
    story: "Boxes and vessels that sit on a shelf and still feel like home.",
    hero: "photo-1571781926291-c477ebfd024b",
    slots: [
      { role: "sku", caption: "The range", photo: "photo-1526170375885-4d8ecf77b99f" },
      { role: "detail", caption: "Close detail", photo: "photo-1503602642458-232111445657" },
      { role: "in_hand", caption: "In the hand", photo: "photo-1491553895911-0055eca6402d" },
      { role: "shelf", caption: "On the shelf", photo: "photo-1556909114-f6e7ad7d3136" },
    ],
  },
  {
    id: "demo-nour-house-prints",
    type: "prints",
    title: "Nour House — Prints",
    sortOrder: 12,
    story: "Paper, bags, and a poster the brand can hold.",
    hero: "photo-1586281380349-632531db7ed4",
    slots: [
      { role: "bag", caption: "The bag", photo: "photo-1483985988355-763728e1935b" },
      { role: "letterhead", caption: "Letterhead", photo: "photo-1545239351-ef35f43d514b" },
      { role: "poster", caption: "The poster", photo: "photo-1561070791-2526d30994b5" },
    ],
  },
  {
    id: "demo-nour-house-social-media",
    type: "social_media",
    title: "Nour House — Social",
    sortOrder: 13,
    story: "The house on screens — stories first, then the campaign.",
    hero: "photo-1611162617474-5b21e879e113",
    slots: [
      { role: "story_frame", caption: "Story frame", photo: "photo-1606107557195-0e29a4b5b4aa" },
      { role: "campaign", caption: "The campaign", photo: "photo-1524758631624-e2822e304c36" },
    ],
  },
  {
    id: "demo-nour-house-outdoors",
    type: "outdoors",
    title: "Nour House — Outdoors",
    sortOrder: 14,
    story: "The mark on the city, then on the road.",
    hero: "photo-1512917774080-9991f1c4c750",
    slots: [
      { role: "city", caption: "In the city", photo: "photo-1477959858617-67f85cf4f1df" },
      { role: "vehicle", caption: "On the vehicle", photo: "photo-1449965408869-eaa3f722e40d" },
    ],
  },
  {
    id: "demo-nour-house-brand-strategy",
    type: "brand_strategy",
    title: "Nour House — Brand Strategy",
    sortOrder: 15,
    story: "Where the house is now, where it goes, and the path between.",
    hero: "photo-1505693416388-ac5ce068fe85",
    slots: [
      { role: "now", caption: "Now", photo: "photo-1454165804606-c3d57bc86b40" },
      { role: "horizon", caption: "Horizon", photo: "photo-1497366216548-37526070297c" },
      { role: "path", caption: "The path", photo: "photo-1460925895917-afdab827c52f" },
    ],
  },
  {
    id: "demo-nour-house-marketing-strategy",
    type: "marketing_strategy",
    title: "Nour House — Marketing Strategy",
    sortOrder: 16,
    story: "Budget, time, and mix — how the house gets sold.",
    hero: "photo-1554224155-6726b3ff858f",
    slots: [
      { role: "budget", caption: "Budget", photo: "photo-1556740749-887f6717d7e4" },
      { role: "time", caption: "Time", photo: "photo-1434056886845-dac89ffe9b56" },
      { role: "mix", caption: "The mix", photo: "photo-1460925895917-afdab827c52f" },
    ],
  },
  {
    id: "demo-nour-house-photos",
    type: "photos",
    title: "Nour House — Photos",
    sortOrder: 17,
    story: "Portrait, detail, and the wide room — one light, one house.",
    hero: "photo-1560448204-e02f11c3d0e2",
    slots: [
      { role: "portrait", caption: "Portrait", photo: "photo-1438761681033-6461ffad8d80" },
      { role: "detail", caption: "Detail", photo: "photo-1490481651871-ab68de25d43d" },
      { role: "wide", caption: "Wide", photo: "photo-1600607687644-c7171b42498f" },
    ],
  },
  {
    id: "demo-nour-house-videos",
    type: "videos",
    title: "Nour House — Film",
    sortOrder: 18,
    story: "Light moving through the house — one take, no extra chapters.",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "photo-1616486338812-3dadae4b4ace",
  },
  {
    id: "demo-nour-house-nfc-card",
    type: "nfc_card",
    title: "Nour House — NFC Card",
    sortOrder: 19,
    story: "A card they keep and tap.",
    hero: "photo-1563013544-824ae1b704d3",
    slots: [
      { role: "back", caption: "The back", photo: "photo-1556742049-0cfed4f6a45d" },
      { role: "in_hand", caption: "In the hand", photo: "photo-1556740758-90de374c12ad" },
    ],
  },
  {
    id: "demo-nour-house-nfc-ring",
    type: "nfc_ring",
    title: "Nour House — Ring",
    sortOrder: 20,
    story: "Wear the house on one finger.",
    hero: "photo-1605100804763-247f67b3557e",
    slots: [
      { role: "on_hand", caption: "On the hand", photo: "photo-1599643478518-a784e5dc4c8f" },
      { role: "detail", caption: "Detail", photo: "photo-1611591437281-460bfbe1220a" },
    ],
  },
  {
    id: "demo-nour-house-nfc-medal",
    type: "nfc_medal",
    title: "Nour House — Medal",
    sortOrder: 21,
    story: "A medal they wear and tap.",
    hero: "photo-1567427017947-545c5f8d16ad",
    slots: [
      { role: "worn", caption: "Worn", photo: "photo-1490481651871-ab68de25d43d" },
      { role: "detail", caption: "Detail", photo: "photo-1611591437281-460bfbe1220a" },
    ],
  },
];

async function seed() {
  for (const project of projects) {
    let hero;
    let poster;
    const gallery = [];

    if (project.video) {
      const fileId = await uploadFromUrl(
        project.video,
        "nour-house-film.mp4",
        "file",
      );
      hero = fileAsset(fileId);
      if (project.poster) {
        const posterId = await uploadFromUrl(
          unsplash(project.poster),
          "nour-house-film-poster.jpg",
        );
        poster = imageAsset("nour-house-film-poster.jpg", posterId);
      }
    } else {
      const heroId = await uploadFromUrl(
        unsplash(project.hero),
        `${project.id}-hero.jpg`,
      );
      hero = imageAsset(`${project.id}-hero.jpg`, heroId);
    }

    for (const slot of project.slots ?? []) {
      const filename = `${project.id}-${slot.role}.jpg`;
      const assetId = slot.local
        ? await uploadLocal(markPath, "nour-house-mark.jpg")
        : await uploadFromUrl(unsplash(slot.photo), filename);
      gallery.push(still(slot.role, slot.caption, assetId, `${project.id}-${slot.role}`));
    }

    await client.createOrReplace({
      _id: project.id,
      _type: "project",
      title: project.title,
      type: project.type,
      sortOrder: project.sortOrder,
      story: project.story,
      hero,
      ...(poster ? { poster } : {}),
      ...(gallery.length ? { gallery } : {}),
    });

    console.log(`Seeded ${project.title}`);
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
