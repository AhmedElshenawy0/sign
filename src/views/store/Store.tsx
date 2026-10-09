"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappRequestUrl } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

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

const VISUALS: Record<string, { image?: string; blob?: string }> = {
  brand_identity: { image: "/images/store/identity.jpg" },
  packaging: { image: "/images/store/packaging.jpg" },
  prints: { image: "/images/store/prints.jpg" },
  outdoors: { image: "/images/store/outdoors.jpg" },
  brand_strategy: { image: "/images/store/strategy.jpg" },
  videos: { image: "/images/store/film.jpg" },
  nfc_card: { image: "/images/store/nfc-card.jpg" },
  nfc_ring: { image: "/images/store/nfc-ring.jpg" },
  social_media: { image: "/images/store/social.jpg" },
  marketing_strategy: { image: "/images/store/marketing.jpg" },
  photos: { image: "/images/store/photos.jpg" },
  nfc_medal: { image: "/images/store/nfc-medal.jpg" },
};

type GroupId = (typeof GROUPS)[number]["id"];
type Filter = "all" | GroupId;
type ItemKey = (typeof GROUPS)[number]["keys"][number];

const FILTERS: Filter[] = [
  "all",
  "identity",
  "strategy",
  "campaign",
  "capture",
  "nfc",
];

const catalogVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

function LookbookTile({
  itemKey,
  requestHref,
  featured = false,
  className = "",
}: {
  itemKey: ItemKey;
  requestHref: (key: string) => string;
  featured?: boolean;
  className?: string;
}) {
  const { t } = useTranslation();
  const visual = VISUALS[itemKey];

  return (
    <motion.div
      variants={tileVariants}
      className={`h-full min-h-0 ${className}`}
    >
      <a
        href={requestHref(itemKey)}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative isolate flex h-full min-h-[inherit] flex-col overflow-hidden rounded-[12px] bg-[#0a0d12] ring-1 ring-white/[0.08]"
      >
        {visual?.image ? (
          <img
            src={visual.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,152,93,0.18),transparent_62%)] ${visual?.blob ?? ""}`}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div
          className={`relative z-[2] mt-auto flex flex-col justify-end ${
            featured ? "p-5 md:p-7" : "p-4 md:p-5"
          }`}
        >
          <h3
            className={`font-bold uppercase tracking-tight text-white ${
              featured
                ? "text-[22px] md:text-[28px]"
                : "text-[15px] md:text-[17px]"
            }`}
          >
            {t(`store.items.${itemKey}.title`)}
          </h3>
          <p
            className={`mt-1 max-w-[16rem] leading-snug text-white/70 ${
              featured ? "text-[13px] md:text-[14px]" : "text-[12px]"
            }`}
          >
            {t(`store.items.${itemKey}.line`)}
          </p>

          {featured ? (
            <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition group-hover:border-main-green group-hover:text-main-green">
              {t("store.quote")}
              <FaWhatsapp size={13} />
            </span>
          ) : (
            <span className="absolute bottom-4 end-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/35 text-white/80 transition group-hover:border-main-green group-hover:text-main-green">
              <FaWhatsapp size={14} />
            </span>
          )}
        </div>
      </a>
    </motion.div>
  );
}

function FilterChips({
  filter,
  selectFilter,
}: {
  filter: Filter;
  selectFilter: (id: Filter) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="mt-5 flex w-full min-w-0 flex-nowrap gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:overflow-visible">
      {FILTERS.map((id) => {
        const active = filter === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => selectFilter(id)}
            className={`relative shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition ${
              active ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            {active ? (
              <motion.span
                layoutId="lookbook-chip"
                className="absolute inset-0 rounded-full bg-main-green"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : (
              <span className="absolute inset-0 rounded-full border border-white/20" />
            )}
            <span className="relative z-10 whitespace-nowrap">
              {id === "all"
                ? t("store.groups.all")
                : t(`store.groups.${id}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Store() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("store-page");
    return () => document.documentElement.classList.remove("store-page");
  }, []);

  const visibleGroups =
    filter === "all" ? GROUPS : GROUPS.filter((group) => group.id === filter);
  const categoryKeys = visibleGroups[0]?.keys ?? [];
  const featuredKey: ItemKey =
    filter === "all" ? "packaging" : categoryKeys[0];
  const stackKeys: readonly ItemKey[] =
    filter === "all"
      ? ["brand_identity", "nfc_card"]
      : categoryKeys.slice(1);

  function selectFilter(id: Filter) {
    setFilter(id);
  }

  function requestHref(itemKey: string) {
    const name = t(`store.items.${itemKey}.title`);
    return whatsappRequestUrl(t("store.waMessage", { item: name }));
  }

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-clip bg-[#05070c] text-white"
    >
      <section className="relative z-10 mx-auto max-w-[1320px] px-6 pb-20 pt-24 md:px-8 md:pt-28">
        <div
          id="store-catalog"
          className="grid min-w-0 scroll-mt-24 items-stretch gap-3 md:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]"
        >
          <div className="flex min-h-0 min-w-0 flex-col gap-4">
            <header className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-main-green">
                {t("store.eyebrow")}
              </p>
              <h1 className="mt-1 text-[42px] font-black italic uppercase leading-none tracking-tight md:text-[58px]">
                {t("store.title")}
              </h1>
              <FilterChips filter={filter} selectFilter={selectFilter} />
            </header>

            <LookbookTile
              key={featuredKey}
              itemKey={featuredKey}
              featured
              requestHref={requestHref}
              className="min-h-[240px] flex-1 sm:min-h-[280px] md:min-h-[340px]"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="flex min-h-0 min-w-0 flex-col gap-3"
              variants={catalogVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {stackKeys.map((key) => (
                <LookbookTile
                  key={key}
                  itemKey={key}
                  requestHref={requestHref}
                  className="min-h-[180px] flex-1 sm:min-h-[200px]"
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filter === "all" ? (
            <>
              <LookbookTile
                itemKey="outdoors"
                requestHref={requestHref}
                className="min-h-[180px] md:col-start-1 md:min-h-[220px]"
              />
              <LookbookTile
                itemKey="nfc_ring"
                requestHref={requestHref}
                className="min-h-[180px] md:min-h-[220px]"
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-2 md:grid-cols-3">
                <LookbookTile
                  itemKey="prints"
                  requestHref={requestHref}
                  className="min-h-[180px] md:min-h-[210px]"
                />
                <LookbookTile
                  itemKey="videos"
                  requestHref={requestHref}
                  className="min-h-[180px] md:min-h-[210px]"
                />
                <LookbookTile
                  itemKey="brand_strategy"
                  requestHref={requestHref}
                  className="min-h-[180px] sm:col-span-2 md:col-span-1 md:min-h-[210px]"
                />
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
