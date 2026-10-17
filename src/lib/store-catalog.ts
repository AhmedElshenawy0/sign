import { cmsText, type LocaleField } from "@/lib/cms-text";
import type { SanityStorePage } from "@/lib/sanity.queries";

export const STORE_ITEM_KEYS = [
  "nfc_card",
  "nfc_stand",
  "nfc_ring",
  "nfc_medal",
  "nfc_keytag",
  "nfc_sticker",
  "nfc_band",
  "nfc_badge",
] as const;

export type StoreItemKey = (typeof STORE_ITEM_KEYS)[number];
export type StoreItemField =
  | "kicker"
  | "title"
  | "line"
  | "body"
  | "includes"
  | "how"
  | "compatibility";
export type StoreIntent = "quote" | "order";

export function isStoreItemKey(value: string): value is StoreItemKey {
  return (STORE_ITEM_KEYS as readonly string[]).includes(value);
}

export const STORE_VISUALS: Record<StoreItemKey, string> = {
  nfc_card: "/images/store/nfc-card.jpg",
  nfc_stand: "/images/nfc/stand-signup.jpg",
  nfc_ring: "/images/store/nfc-ring.jpg",
  nfc_medal: "/images/store/nfc-medal.jpg",
  nfc_keytag: "/images/store/nfc-medal.jpg",
  nfc_sticker: "/images/store/nfc-card.jpg",
  nfc_band: "/images/store/nfc-ring.jpg",
  nfc_badge: "/images/store/nfc-card.jpg",
};

export const STORE_GALLERY: Record<StoreItemKey, string[]> = {
  nfc_card: [
    "/images/store/nfc-card.jpg",
    "/images/nfc/nfc-card.jpg",
    "/images/nfc/stand-signup.jpg",
    "/images/store/nfc-ring.jpg",
  ],
  nfc_stand: [
    "/images/nfc/stand-signup.jpg",
    "/images/nfc/stand.jpg",
    "/images/nfc/stand-client.jpg",
    "/images/store/nfc-card.jpg",
  ],
  nfc_ring: [
    "/images/store/nfc-ring.jpg",
    "/images/nfc/nfc-ring.jpg",
    "/images/store/nfc-card.jpg",
    "/images/nfc/stand-signup.jpg",
  ],
  nfc_medal: [
    "/images/store/nfc-medal.jpg",
    "/images/nfc/nfc-medal.jpg",
    "/images/store/nfc-card.jpg",
    "/images/nfc/stand.jpg",
  ],
  nfc_keytag: [
    "/images/store/nfc-medal.jpg",
    "/images/nfc/nfc-medal.jpg",
    "/images/store/nfc-ring.jpg",
    "/images/nfc/stand-client.jpg",
  ],
  nfc_sticker: [
    "/images/store/nfc-card.jpg",
    "/images/nfc/nfc-card.jpg",
    "/images/nfc/stand.jpg",
    "/images/store/nfc-medal.jpg",
  ],
  nfc_band: [
    "/images/store/nfc-ring.jpg",
    "/images/nfc/nfc-ring.jpg",
    "/images/store/nfc-medal.jpg",
    "/images/nfc/stand-signup.jpg",
  ],
  nfc_badge: [
    "/images/store/nfc-card.jpg",
    "/images/nfc/nfc-card.jpg",
    "/images/store/nfc-medal.jpg",
    "/images/nfc/stand-client.jpg",
  ],
};

type LocalePair = { en: string; ar: string };

const COMPAT: LocalePair = {
  en: "Compatible with iPhone and Android devices that support NFC. No app required — one tap opens the destination you choose.",
  ar: "متوافق مع أجهزة آيفون وأندرويد الداعمة لـ NFC. بدون تطبيق — لمسة واحدة تفتح الصفحة أو الحساب الذي تختاره.",
};

const HOW: LocalePair = {
  en: "The client taps the piece, the phone reads the chip, and the destination you set opens — website, social, or a page you choose.",
  ar: "يلمس العميل القطعة، يقرأ الهاتف الشريحة، وتفتح الوجهة التي تحددها — الموقع، أو الحساب، أو الصفحة التي تختارها.",
};

export const STORE_ITEM_COPY: Record<
  StoreItemKey,
  Record<StoreItemField, LocalePair>
> = {
  nfc_card: {
    kicker: { en: "Card", ar: "كارت" },
    title: { en: "NFC Card", ar: "كارت NFC" },
    line: {
      en: "Wallet size. Kept in the pocket — one tap opens the brand.",
      ar: "مقاس المحفظة. يُحفظ في الجيب، ولمسة واحدة تفتح الهوية.",
    },
    body: {
      en: "A wallet-size NFC card printed to brand guidelines. It is kept, tapped, and the destination you set opens — no app required. Artwork, chip, and finish as one piece.",
      ar: "كارت NFC بمقاس المحفظة، مطبوع وفق دليل الهوية. يُحفظ ويُلمس، وتفتح الوجهة التي تحددها — بدون تطبيق. التصميم والشريحة واللمسة النهائية في قطعة واحدة.",
    },
    includes: {
      en: "Artwork to brand guidelines, NFC chip, wallet-size print, and a pocket-ready finish.",
      ar: "تصميم وفق دليل الهوية، شريحة NFC، طباعة بمقاس المحفظة، ولمسة نهائية مناسبة للجيب.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_stand: {
    kicker: { en: "Stand", ar: "استاند" },
    title: { en: "Counter stand", ar: "استاند الكاونتر" },
    line: {
      en: "Social, pay, and reviews in one piece on the counter.",
      ar: "الحسابات والدفع والتقييمات في قطعة واحدة على الكاونتر.",
    },
    body: {
      en: "A counter stand that holds social, pay, and reviews in one tap. It sits where clients already wait — the brand is present before they ask.",
      ar: "استاند كاونتر يجمع الحسابات والدفع والتقييمات في لمسة واحدة. يبقى حيث ينتظر العملاء — والهوية حاضرة قبل أن يسألوا.",
    },
    includes: {
      en: "Counter piece, NFC chip, artwork, and the links you choose — social, pay, reviews.",
      ar: "قطعة الكاونتر، شريحة NFC، التصميم، والروابط التي تختارها — حسابات، دفع، تقييمات.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_ring: {
    kicker: { en: "Wear", ar: "لبس" },
    title: { en: "NFC Ring", ar: "خاتم NFC" },
    line: {
      en: "Worn, not carried. A tap from the hand.",
      ar: "يُلبس، لا يُحمل. لمسة من اليد.",
    },
    body: {
      en: "A ring they wear, not a card they look for. One tap from the hand and the brand is in the room.",
      ar: "خاتم يُلبس، لا كارت يُبحث عنه. لمسة من اليد، والهوية حاضرة في المكان.",
    },
    includes: {
      en: "Worn ring, NFC chip, and a finish designed for daily wear.",
      ar: "خاتم للارتداء، شريحة NFC، ولمسة نهائية مصممة للاستخدام اليومي.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_medal: {
    kicker: { en: "Keep", ar: "تحفظ" },
    title: { en: "NFC Medal", ar: "ميدالية NFC" },
    line: {
      en: "Hung, worn, shown. A piece they tap and keep.",
      ar: "تُعلَّق وتُلبس وتُعرض. قطعة تُلمس وتُحفظ.",
    },
    body: {
      en: "A medal to hang, wear, and display. They tap it and they keep it — a piece that stays with the brand.",
      ar: "ميدالية للتعليق والارتداء والعرض. تُلمس وتُحفظ — قطعة تبقى مع الهوية.",
    },
    includes: {
      en: "Medal, NFC chip, artwork, and a keep-piece finish.",
      ar: "الميدالية، شريحة NFC، التصميم، ولمسة نهائية لقطعة تُحفظ.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_keytag: {
    kicker: { en: "Keys", ar: "مفاتيح" },
    title: { en: "NFC Keytag", ar: "ميدالية مفاتيح NFC" },
    line: {
      en: "On the keys they already carry. One tap, the brand is there.",
      ar: "على المفاتيح التي يحملونها. لمسة واحدة، والهوية حاضرة.",
    },
    body: {
      en: "A keytag on the keys they already carry. One tap and the brand is there — no extra pocket, no extra step.",
      ar: "ميدالية على المفاتيح التي يحملونها. لمسة واحدة والهوية حاضرة — بدون جيب إضافي وبدون خطوة زائدة.",
    },
    includes: {
      en: "Keytag, NFC chip, artwork, and a ring that sits on the keys they already carry.",
      ar: "ميدالية المفاتيح، شريحة NFC، التصميم، وحلقة تثبت على المفاتيح التي يحملونها.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_sticker: {
    kicker: { en: "Tap", ar: "لمسة" },
    title: { en: "NFC Sticker", ar: "استيكر NFC" },
    line: {
      en: "On a pack, a table, a window. They tap where they already look.",
      ar: "على عبوة أو طاولة أو واجهة. يلمسون حيث ينظرون بالفعل.",
    },
    body: {
      en: "A tap sticker for a pack, a table, or a window. They already look there — the tap meets them in that place.",
      ar: "استيكر للمس على عبوة أو طاولة أو واجهة. ينظرون إلى هناك بالفعل — واللمسة تقابلهم في المكان.",
    },
    includes: {
      en: "NFC sticker, chip, artwork, and a face for pack, table, or glass.",
      ar: "استيكر NFC، الشريحة، التصميم، وواجهة للعبوة أو الطاولة أو الزجاج.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_band: {
    kicker: { en: "Strap", ar: "سوار" },
    title: { en: "NFC Wristband", ar: "سوار NFC" },
    line: {
      en: "On the wrist like a strap — tap without pulling a card.",
      ar: "على المعصم كسوار — لمسة دون إخراج كارت.",
    },
    body: {
      en: "A wristband worn like a strap. They tap without pulling a card — the brand stays with them.",
      ar: "سوار يُلبس على المعصم. يُلمس دون إخراج كارت — والهوية تبقى معهم.",
    },
    includes: {
      en: "Wristband, NFC chip, and a strap finish designed to be worn.",
      ar: "السوار، شريحة NFC، ولمسة نهائية مصممة للارتداء.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
  nfc_badge: {
    kicker: { en: "Name", ar: "اسم" },
    title: { en: "NFC Badge", ar: "بادج NFC" },
    line: {
      en: "On the chest, in the room. A name they can tap.",
      ar: "على الصدر، في المكان. اسم يمكن لمسه.",
    },
    body: {
      en: "A name badge worn in the room. They read the name, tap it, and the destination opens.",
      ar: "بادج اسم يُرتدى في المكان. يُقرأ الاسم، يُلمس، وتفتح الوجهة.",
    },
    includes: {
      en: "Name badge, NFC chip, artwork, and a chest piece worn in the room.",
      ar: "بادج الاسم، شريحة NFC، التصميم، وقطعة تُرتدى على الصدر.",
    },
    how: HOW,
    compatibility: COMPAT,
  },
};

export const STORE_HEADER_COPY = {
  en: {
    eyebrow: "The product",
    title: "Everything you need, in one tap.",
    description:
      "Physical NFC — card, stand, ring, medal, and the pieces they wear and keep.",
    cta: "Request a piece",
  },
  ar: {
    eyebrow: "المنتج",
    title: "كل اللي تحتاجه، لمسة واحدة.",
    description:
      "NFC فيزيائي — كارت، استاند، خاتم، ميدالية، والقطع اللي بيتلبسوها ويلمسوها.",
    cta: "اطلب قطعة",
  },
} as const;

export const STORE_PRODUCT_COPY = {
  en: {
    back: "Back to store",
    request: "Request this piece",
    description: "Description",
    includes: "What's included",
    how: "How it works",
    compatibility: "Compatibility",
    related: "You may also like",
    currency: "EGP",
    perPiece: "per piece",
    save: "Save",
    lifetimeTitle: "Made to last",
    lifetimeLine: "A physical piece designed for daily use, and to stay with the brand.",
    chipTitle: "Genuine NFC chip",
    chipLine: "One tap opens the page or profile you choose. No app to install.",
    qualityTitle: "Printed to brand guidelines",
    qualityLine: "Finish, mark, and color follow the brand book.",
  },
  ar: {
    back: "رجوع للمتجر",
    request: "اطلب هذه القطعة",
    description: "الوصف",
    includes: "ما الذي تتضمنه",
    how: "آلية العمل",
    compatibility: "التوافق",
    related: "قطع أخرى قد تناسبك",
    currency: "ج.م",
    perPiece: "للقطعة",
    save: "وفّر",
    lifetimeTitle: "صُممت لتدوم",
    lifetimeLine: "قطعة ملموسة تبقى مع الهوية، ومصممة للاستخدام اليومي.",
    chipTitle: "شريحة NFC أصلية",
    chipLine: "لمسة واحدة تفتح الصفحة أو الحساب الذي تختاره. بدون تطبيق.",
    qualityTitle: "طباعة وفق دليل الهوية",
    qualityLine: "اللمسة النهائية والألوان والعلامة من دليل البراند.",
  },
} as const;

const POPULAR: LocalePair = { en: "Popular", ar: "الأكثر" };

export type StoreOffer = {
  qty: number;
  price: number;
  badge?: string;
};

export const STORE_PRICING: Record<
  StoreItemKey,
  { price: number; offers: { qty: number; price: number; badge?: LocalePair }[] }
> = {
  nfc_card: {
    price: 450,
    offers: [
      { qty: 2, price: 800 },
      { qty: 3, price: 1050, badge: POPULAR },
    ],
  },
  nfc_stand: {
    price: 950,
    offers: [
      { qty: 2, price: 1700 },
      { qty: 3, price: 2400, badge: POPULAR },
    ],
  },
  nfc_ring: {
    price: 1400,
    offers: [
      { qty: 2, price: 2500 },
      { qty: 3, price: 3600, badge: POPULAR },
    ],
  },
  nfc_medal: {
    price: 650,
    offers: [
      { qty: 2, price: 1150 },
      { qty: 3, price: 1550, badge: POPULAR },
    ],
  },
  nfc_keytag: {
    price: 320,
    offers: [
      { qty: 2, price: 560 },
      { qty: 3, price: 750, badge: POPULAR },
    ],
  },
  nfc_sticker: {
    price: 180,
    offers: [
      { qty: 2, price: 320 },
      { qty: 3, price: 420, badge: POPULAR },
    ],
  },
  nfc_band: {
    price: 550,
    offers: [
      { qty: 2, price: 980 },
      { qty: 3, price: 1350, badge: POPULAR },
    ],
  },
  nfc_badge: {
    price: 380,
    offers: [
      { qty: 2, price: 680 },
      { qty: 3, price: 900, badge: POPULAR },
    ],
  },
};

const OLD_HEADER = new Set([
  "marketplace",
  "the store",
  "departments as aisles. ideas as products. impact by design.",
  "custom quote",
  "الماركت",
  "المتجر",
  "سعر حسب المشروع",
]);

export function localeOf(lang: string): "en" | "ar" {
  return lang.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function looksLikeKey(value: string, key: string) {
  const normalized = value.trim().toLowerCase();
  return !normalized || normalized === key.toLowerCase();
}

export function storeHeaderCopy(
  cmsValue: LocaleField | string | null | undefined,
  lang: string,
  field: keyof (typeof STORE_HEADER_COPY)["en"],
) {
  const fallback = STORE_HEADER_COPY[localeOf(lang)][field];
  const value = cmsText(cmsValue, lang, "");
  if (
    !value ||
    looksLikeKey(value, `store.${field}`) ||
    OLD_HEADER.has(value.trim().toLowerCase())
  ) {
    return fallback;
  }
  return value;
}

export function storeItemCopy(
  cms: SanityStorePage | null | undefined,
  lang: string,
  itemKey: StoreItemKey,
  field: StoreItemField,
) {
  const fallback = STORE_ITEM_COPY[itemKey][field][localeOf(lang)];
  const fromCms = cmsText(cms?.items?.[itemKey]?.[field], lang, "");
  if (fromCms && !looksLikeKey(fromCms, `store.items.${itemKey}.${field}`)) {
    return fromCms;
  }
  return fallback;
}

export function storeItemImage(
  cms: SanityStorePage | null | undefined,
  itemKey: StoreItemKey,
) {
  return cms?.items?.[itemKey]?.imageUrl?.trim() || STORE_VISUALS[itemKey];
}

export function storeItemGallery(
  cms: SanityStorePage | null | undefined,
  itemKey: StoreItemKey,
) {
  const hero = storeItemImage(cms, itemKey);
  const extras = (cms?.items?.[itemKey]?.photos ?? [])
    .map((photo) => photo?.imageUrl?.trim())
    .filter((url): url is string => Boolean(url) && url !== hero);
  if (extras.length) return [hero, ...extras];
  const rest = STORE_GALLERY[itemKey].filter((src) => src !== hero);
  return [hero, ...rest];
}

export type StoreCaseMedia = {
  src: string;
  kind: "image" | "video";
  caption: string;
};

export function storeItemCases(
  cms: SanityStorePage | null | undefined,
  lang: string,
  itemKey: StoreItemKey,
): StoreCaseMedia[] {
  const hero = storeItemImage(cms, itemKey);
  const fromCms = (cms?.items?.[itemKey]?.photos ?? [])
    .map((photo) => {
      const video = photo?.videoUrl?.trim();
      const image = photo?.imageUrl?.trim();
      const src = video || image;
      if (!src || src === hero) return null;
      return {
        src,
        kind: (video ? "video" : "image") as StoreCaseMedia["kind"],
        caption: cmsText(photo?.caption, lang, ""),
      };
    })
    .filter((item): item is StoreCaseMedia => Boolean(item));
  if (fromCms.length) return fromCms.slice(0, 3);
  return STORE_GALLERY[itemKey]
    .filter((src) => src !== hero)
    .slice(0, 3)
    .map((src) => ({ src, kind: "image" as const, caption: "" }));
}

export function storeTrustItems(
  cms: SanityStorePage | null | undefined,
  lang: string,
) {
  const copy = STORE_PRODUCT_COPY[localeOf(lang)];
  const defaults = [
    { title: copy.lifetimeTitle, line: copy.lifetimeLine },
    { title: copy.chipTitle, line: copy.chipLine },
    { title: copy.qualityTitle, line: copy.qualityLine },
  ] as const;
  const slots = [cms?.trust?.one, cms?.trust?.two, cms?.trust?.three] as const;
  return defaults.map((item, index) => ({
    title: cmsText(slots[index]?.title, lang, item.title),
    line: cmsText(slots[index]?.line, lang, item.line),
  }));
}

export function storeRelatedKeys(itemKey: StoreItemKey, count = 4) {
  return STORE_ITEM_KEYS.filter((key) => key !== itemKey).slice(0, count);
}

export function storeItemPrice(
  cms: SanityStorePage | null | undefined,
  itemKey: StoreItemKey,
) {
  const fromCms = cms?.items?.[itemKey]?.price;
  if (typeof fromCms === "number" && fromCms > 0) return fromCms;
  return STORE_PRICING[itemKey].price;
}

export function storeItemOffers(
  cms: SanityStorePage | null | undefined,
  lang: string,
  itemKey: StoreItemKey,
): StoreOffer[] {
  const fromCms = (cms?.items?.[itemKey]?.offers ?? []).filter(
    (offer) =>
      typeof offer?.qty === "number" &&
      offer.qty > 1 &&
      typeof offer?.price === "number" &&
      offer.price > 0,
  );
  const source = fromCms.length ? fromCms : STORE_PRICING[itemKey].offers;
  return source.map((offer) => ({
    qty: offer.qty as number,
    price: offer.price as number,
    badge: cmsText(offer.badge, lang, ""),
  }));
}

export function formatStoreAmount(amount: number, lang: string) {
  return Math.round(amount).toLocaleString(
    localeOf(lang) === "ar" ? "ar-EG" : "en-US",
  );
}

export function formatStorePrice(amount: number, lang: string) {
  const n = formatStoreAmount(amount, lang);
  return localeOf(lang) === "ar" ? `${n} ج.م` : `EGP ${n}`;
}

export function storeOfferLabel(qty: number, lang: string) {
  if (localeOf(lang) === "ar") {
    if (qty === 1) return "قطعة واحدة";
    if (qty === 2) return "قطعتين";
    return `${formatStoreAmount(qty, lang)} قطع`;
  }
  return qty === 1 ? "1 piece" : `${qty} pieces`;
}
