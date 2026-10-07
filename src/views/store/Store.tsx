"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappRequestUrl } from "@/lib/constants";
import { CardShape, MedalShape, RingShape } from "@/views/nfc/NfcProducts";

const EASE = [0.16, 1, 0.3, 1] as const;

const NFC_SHAPES = {
  nfc_card: CardShape,
  nfc_ring: RingShape,
  nfc_medal: MedalShape,
} as const;

const GROUPS = [
  {
    id: "identity",
    keys: ["brand_identity", "packaging", "prints"],
  },
  {
    id: "strategy",
    keys: ["brand_strategy", "marketing_strategy"],
  },
  {
    id: "campaign",
    keys: ["social_media", "outdoors"],
  },
  {
    id: "capture",
    keys: ["photos", "videos"],
  },
  {
    id: "nfc",
    keys: ["nfc_card", "nfc_ring", "nfc_medal"],
  },
] as const;

const VISUALS: Record<string, { image?: string; blob: string }> = {
  brand_identity: { image: "/images/noor-haus/logo.png", blob: "bg-main-green/30" },
  packaging: { image: "/images/noor-haus/pack.png", blob: "bg-main-red/25" },
  prints: { image: "/images/noor-haus/brand-book.png", blob: "bg-main-move/30" },
  social_media: { blob: "bg-main-green/25" },
  outdoors: { image: "/images/noor-haus/street.png", blob: "bg-main-red/25" },
  brand_strategy: { blob: "bg-main-move/30" },
  marketing_strategy: { blob: "bg-main-green/25" },
  photos: { image: "/images/noor-haus/product.png", blob: "bg-main-red/20" },
  videos: { blob: "bg-main-red/30" },
};

type GroupId = (typeof GROUPS)[number]["id"];
type Filter = "all" | GroupId;

const FILTERS: Filter[] = [
  "all",
  "identity",
  "strategy",
  "campaign",
  "capture",
  "nfc",
];

const OFFERING_COUNT = GROUPS.reduce((sum, group) => sum + group.keys.length, 0);

const catalogVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

export default function Store() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const visibleGroups =
    filter === "all" ? GROUPS : GROUPS.filter((group) => group.id === filter);

  function selectFilter(id: Filter) {
    setFilter(id);
    requestAnimationFrame(() => {
      document.getElementById("store-catalog")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function requestHref(itemKey: string) {
    const name = t(`store.items.${itemKey}.title`);
    return whatsappRequestUrl(t("store.waMessage", { item: name }));
  }

  function includesOf(itemKey: string) {
    const value = t(`store.items.${itemKey}.includes`, { returnObjects: true });
    return Array.isArray(value) ? (value as string[]) : [];
  }

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-clip bg-[#05070c] text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(14,152,93,0.12),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(229,68,17,0.08),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[2px] bg-gradient-to-r from-main-red via-main-move to-main-green" />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-32 md:px-12 md:pt-36">
        <motion.p
          className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-main-green"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {t("store.eyebrow")}
        </motion.p>
        <motion.h1
          className="max-w-3xl text-4xl font-black uppercase tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {t("store.title")}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35, ease: EASE }}
        >
          {t("store.description")}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-black uppercase tracking-[0.18em] text-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.3 }}
        >
          <span className="text-main-green">
            {t("store.offerings", { n: OFFERING_COUNT })}
          </span>
          <span>{t("store.categories", { n: GROUPS.length })}</span>
          <span>{t("store.channel")}</span>
        </motion.div>

        <div className="-mx-6 mt-8 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {FILTERS.map((id) => {
            const active = filter === id;
            const count =
              id === "all"
                ? OFFERING_COUNT
                : GROUPS.find((group) => group.id === id)?.keys.length ?? 0;
            return (
              <button
                key={id}
                type="button"
                onClick={() => selectFilter(id)}
                className={`relative snap-start shrink-0 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition sm:px-5 sm:text-[11px] ${
                  active ? "text-main-green" : "text-white/55 hover:text-white"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="market-chip"
                    className="absolute inset-0 rounded-full border-2 border-main-green bg-main-green/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full border-2 border-white/15" />
                )}
                <span className="relative z-10">
                  {id === "all" ? t("store.groups.all") : t(`store.groups.${id}`)}
                  <span className="ms-2 text-white/35">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        id="store-catalog"
        className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 pb-28 pt-6 md:px-12"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="space-y-14"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {visibleGroups.map((group, groupIndex) => (
              <div key={group.id}>
                <header className="mb-6 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.32em] text-main-green">
                      {String(groupIndex + 1).padStart(2, "0")} · {group.keys.length}
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
                      {t(`store.groups.${group.id}`)}
                    </h2>
                    <p className="mt-2 text-sm text-white/50">
                      {t(`store.groups.${group.id}Line`)}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="hidden h-[2px] w-24 shrink-0 bg-gradient-to-r from-main-red via-main-move to-main-green sm:block"
                  />
                </header>

                <motion.div
                  className={`grid items-stretch gap-4 sm:gap-5 ${
                    group.keys.length === 3
                      ? "md:grid-cols-2 xl:grid-cols-3"
                      : "md:grid-cols-2"
                  }`}
                  variants={catalogVariants}
                  initial="hidden"
                  animate="show"
                >
                  {group.keys.map((key, index) => {
                    const Shape =
                      group.id === "nfc"
                        ? NFC_SHAPES[key as keyof typeof NFC_SHAPES]
                        : null;
                    const visual = VISUALS[key];
                    const includes = includesOf(key);
                    return (
                      <motion.article
                        key={key}
                        variants={cardVariants}
                        className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
                        whileHover={{
                          y: -12,
                          boxShadow: "0 24px 40px rgba(14,152,93,0.18)",
                          transition: { type: "spring", stiffness: 380, damping: 22 },
                        }}
                      >
                        <div className="relative h-[190px] shrink-0 overflow-hidden bg-black/50">
                          <span className="absolute start-4 top-4 z-10 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                            {t("store.quote")}
                          </span>
                          {Shape ? (
                            <div className="flex h-full items-center justify-center px-4">
                              <Shape compact />
                            </div>
                          ) : visual?.image ? (
                            <>
                              <img
                                src={visual.image}
                                alt=""
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-black/20" />
                            </>
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent">
                              <motion.div
                                aria-hidden
                                className={`absolute -end-10 -top-10 h-44 w-44 rounded-full blur-3xl ${visual?.blob ?? "bg-main-green/25"}`}
                                animate={{ x: [0, 22, 0], y: [0, 14, 0], scale: [1, 1.12, 1] }}
                                transition={{
                                  duration: 4.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                              <p className="absolute inset-0 flex items-center justify-center text-6xl font-black tracking-tight text-white/10">
                                {String(index + 1).padStart(2, "0")}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-black uppercase tracking-tight">
                              {t(`store.items.${key}.title`)}
                            </h3>
                            <span className="shrink-0 pt-1 text-[10px] font-black uppercase tracking-widest text-white/35">
                              {t(`store.items.${key}.time`)}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-white/60">
                            {t(`store.items.${key}.line`)}
                          </p>
                          <ul className="mt-4 min-h-[4.75rem] space-y-1.5 text-[12px] text-white/55">
                            {includes.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-main-green" />
                                {item}
                              </li>
                            ))}
                          </ul>
                          <a
                            href={requestHref(key)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-main-green px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_16px_36px_rgba(14,152,93,0.35)] transition hover:bg-main-dark-green hover:shadow-[0_18px_40px_rgba(14,152,93,0.45)]"
                          >
                            <FaWhatsapp size={14} />
                            {t("store.request")}
                          </a>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}
