"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import { useStoreCopy } from "@/components/cms/PageCopy";
import NoisyBg from "@/components/global/NoisyBg";
import { cn } from "@/lib/utils";
import {
  STORE_ITEM_KEYS,
  storeHeaderCopy,
  storeItemCopy,
  storeItemImage,
  type StoreItemKey,
} from "@/lib/store-catalog";

const EASE = [0.16, 1, 0.3, 1] as const;

const ACCENTS = [
  { pill: "bg-main-green/10 text-main-green" },
  { pill: "bg-main-red/10 text-main-red" },
  { pill: "bg-main-move/10 text-main-move" },
] as const;

const tileVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

function NfcTile({
  itemKey,
  featured,
  index,
}: {
  itemKey: StoreItemKey;
  featured?: boolean;
  index: number;
}) {
  const { i18n } = useTranslation();
  const cms = useStoreCopy();
  const accent = ACCENTS[index % ACCENTS.length];
  const image = storeItemImage(cms, itemKey);
  const kicker = storeItemCopy(cms, i18n.language, itemKey, "kicker");
  const title = storeItemCopy(cms, i18n.language, itemKey, "title");
  const line = storeItemCopy(cms, i18n.language, itemKey, "line");

  return (
    <motion.div
      variants={tileVariants}
      className={cn("h-full", featured ? "md:col-span-2" : "")}
    >
      <Link
        href={`/store/${itemKey}`}
        className="group flex h-full w-full flex-col rounded-[1.6rem] bg-white p-5 text-start ring-1 ring-[#e7e2d8] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(40,30,20,0.08)] md:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                accent.pill,
              )}
            >
              {kicker}
            </span>
            <h3
              className={cn(
                "mt-2 font-bold tracking-tight text-neutral-950",
                featured
                  ? "text-[22px] leading-tight md:text-[28px]"
                  : "text-[18px] leading-snug md:text-[20px]",
              )}
            >
              {title}
            </h3>
            <p
              className={cn(
                "mt-1.5 text-[13px] leading-relaxed text-neutral-500",
                featured ? "max-w-md md:text-[15px]" : "line-clamp-2",
              )}
            >
              {line}
            </p>
          </div>
          <span
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition group-hover:border-neutral-400"
            aria-hidden
          >
            <FaArrowRight className="rtl:rotate-180" size={12} />
          </span>
        </div>

        <div
          className={cn(
            "relative mt-5 flex-1 overflow-hidden rounded-[1.15rem] bg-[#f3efe8]",
            featured ? "min-h-[16rem] md:min-h-[20rem]" : "min-h-[14.5rem]",
          )}
        >
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Store() {
  const { i18n } = useTranslation();
  const cms = useStoreCopy();
  const isArabic = i18n.language.startsWith("ar");
  const lang = i18n.language;

  const title = storeHeaderCopy(cms?.title, lang, "title");
  const description = storeHeaderCopy(cms?.description, lang, "description");
  const cta = storeHeaderCopy(cms?.quote, lang, "cta");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("store-page");
    return () => document.documentElement.classList.remove("store-page");
  }, []);

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-clip bg-white text-neutral-950"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
        <NoisyBg />
      </div>
      <section className="relative z-10 mx-auto max-w-[1220px] px-5 pb-24 pt-28 md:px-8 md:pt-32">
        <header
          id="store-catalog"
          className="mx-auto max-w-2xl scroll-mt-24 text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="text-[34px] font-bold leading-[1.12] tracking-tight text-neutral-950 md:text-[52px]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4, ease: EASE }}
            className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-500 md:text-base"
          >
            {description}
          </motion.p>
        </header>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.08 },
            },
          }}
        >
          {STORE_ITEM_KEYS.map((key, index) => (
            <NfcTile
              key={key}
              itemKey={key}
              featured={index === 0}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35, ease: EASE }}
        >
          <Link
            href="/store/nfc_card"
            className="inline-flex items-center gap-2 rounded-full bg-main-green px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_32px_rgba(14,152,93,0.25)] transition hover:bg-main-dark-green"
          >
            {cta}
            <FaArrowRight className="rtl:rotate-180" size={11} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
