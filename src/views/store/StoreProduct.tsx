"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiPlus, FiMinus, FiShield, FiCpu, FiAward } from "react-icons/fi";
import { useStoreCopy } from "@/components/cms/PageCopy";
import NoisyBg from "@/components/global/NoisyBg";
import { cn } from "@/lib/utils";
import {
  formatStoreAmount,
  formatStorePrice,
  localeOf,
  storeItemCopy,
  storeItemGallery,
  storeItemImage,
  storeItemOffers,
  storeItemPrice,
  storeOfferLabel,
  storeRelatedKeys,
  STORE_PRODUCT_COPY,
  type StoreItemKey,
} from "@/lib/store-catalog";

type AccordionId = "description" | "includes" | "how" | "compatibility";

const DEFAULT_OPEN: AccordionId[] = ["description", "includes"];
const ACCORDION_EASE = [0.16, 1, 0.3, 1] as const;

const ACCENTS = [
  "bg-main-green/10 text-main-green",
  "bg-main-red/10 text-main-red",
  "bg-main-move/10 text-main-move",
] as const;

function RelatedCard({
  itemKey,
  index,
}: {
  itemKey: StoreItemKey;
  index: number;
}) {
  const { i18n } = useTranslation();
  const cms = useStoreCopy();
  const title = storeItemCopy(cms, i18n.language, itemKey, "title");
  const kicker = storeItemCopy(cms, i18n.language, itemKey, "kicker");
  const image = storeItemImage(cms, itemKey);

  return (
    <Link
      href={`/store/${itemKey}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#e7e2d8] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(40,30,20,0.08)]"
    >
      <div className="relative aspect-square overflow-hidden bg-[#f3efe8]">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
            ACCENTS[index % ACCENTS.length],
          )}
        >
          {kicker}
        </span>
        <p className="mt-2 text-sm font-semibold text-neutral-950">{title}</p>
      </div>
    </Link>
  );
}

export default function StoreProduct({ itemKey }: { itemKey: StoreItemKey }) {
  const { i18n } = useTranslation();
  const cms = useStoreCopy();
  const isArabic = i18n.language.startsWith("ar");
  const copy = STORE_PRODUCT_COPY[localeOf(i18n.language)];
  const gallery = storeItemGallery(cms, itemKey);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Set<AccordionId>>(
    () => new Set(DEFAULT_OPEN),
  );

  const kicker = storeItemCopy(cms, i18n.language, itemKey, "kicker");
  const title = storeItemCopy(cms, i18n.language, itemKey, "title");
  const line = storeItemCopy(cms, i18n.language, itemKey, "line");
  const body = storeItemCopy(cms, i18n.language, itemKey, "body");
  const includes = storeItemCopy(cms, i18n.language, itemKey, "includes");
  const how = storeItemCopy(cms, i18n.language, itemKey, "how");
  const compatibility = storeItemCopy(
    cms,
    i18n.language,
    itemKey,
    "compatibility",
  );
  const price = storeItemPrice(cms, itemKey);
  const offers = storeItemOffers(cms, i18n.language, itemKey);
  const related = storeRelatedKeys(itemKey);
  const hero = gallery[active] ?? gallery[0];
  const mosaic = gallery.slice(1, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(0);
    setOpen(new Set(DEFAULT_OPEN));
  }, [itemKey]);

  function toggleSection(id: AccordionId) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const trust = [
    { icon: FiShield, title: copy.lifetimeTitle, line: copy.lifetimeLine },
    { icon: FiCpu, title: copy.chipTitle, line: copy.chipLine },
    { icon: FiAward, title: copy.qualityTitle, line: copy.qualityLine },
  ];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-x-clip bg-white text-neutral-950"
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
        <NoisyBg />
      </div>
      <section className="relative z-10 mx-auto max-w-[1180px] px-5 pb-10 pt-24 md:px-8 md:pt-28">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-neutral-500 transition hover:text-neutral-950"
        >
          {isArabic ? <FaArrowRight size={11} /> : <FaArrowLeft size={11} />}
          {copy.back}
        </Link>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,400px)] lg:gap-12">
          <div>
            <div className="flex gap-3">
              <div className="hidden w-16 shrink-0 flex-col gap-2 sm:flex">
                {gallery.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl bg-white ring-1 ring-[#e7e2d8] transition",
                      active === index
                        ? "ring-2 ring-main-green"
                        : "hover:ring-neutral-400",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-[1.4rem] bg-white ring-1 ring-[#e7e2d8] sm:min-h-[28rem] md:min-h-[32rem]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={hero}
                    src={hero}
                    alt={title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: ACCORDION_EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3 flex gap-2 sm:hidden">
              {gallery.map((src, index) => (
                <button
                  key={`m-${src}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded-lg bg-white ring-1 ring-[#e7e2d8]",
                    active === index ? "ring-2 ring-main-green" : "",
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            {mosaic.length >= 3 ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActive(1)}
                  className="relative min-h-[16rem] overflow-hidden rounded-[1.15rem] bg-white ring-1 ring-[#e7e2d8] md:row-span-2 md:min-h-[26rem]"
                >
                  <img
                    src={mosaic[0]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setActive(2)}
                  className="relative min-h-[12rem] overflow-hidden rounded-[1.15rem] bg-white ring-1 ring-[#e7e2d8]"
                >
                  <img
                    src={mosaic[1]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setActive(3)}
                  className="relative min-h-[12rem] overflow-hidden rounded-[1.15rem] bg-white ring-1 ring-[#e7e2d8]"
                >
                  <img
                    src={mosaic[2]}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </button>
              </div>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24">
            <span className="inline-flex rounded-full bg-main-green/10 px-2.5 py-0.5 text-[11px] font-medium text-main-green">
              {kicker}
            </span>
            <h1 className="mt-3 text-[32px] font-bold leading-tight tracking-tight text-neutral-950 md:text-[40px]">
              {title}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
              {line}
            </p>

            <div className="mt-6">
              <div className="flex items-end gap-2">
                <span className="pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {copy.currency}
                </span>
                <span className="text-[40px] font-bold leading-none tracking-tight text-neutral-950">
                  {formatStoreAmount(price, i18n.language)}
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-neutral-400">{copy.perPiece}</p>

              {offers.length ? (
                <div
                  className={cn(
                    "mt-4 grid gap-2",
                    offers.length === 1 ? "grid-cols-1" : "grid-cols-2",
                  )}
                >
                  {offers.map((offer) => {
                    const save = price * offer.qty - offer.price;
                    return (
                      <div
                        key={`${offer.qty}-${offer.price}`}
                        className={cn(
                          "relative rounded-2xl bg-white px-4 py-3.5 ring-1 ring-[#e7e2d8]",
                          offer.badge && "ring-main-green/35",
                        )}
                      >
                        {offer.badge ? (
                          <span className="absolute -top-2 right-3 rounded-full bg-main-green px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white rtl:left-3 rtl:right-auto">
                            {offer.badge}
                          </span>
                        ) : null}
                        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                          {storeOfferLabel(offer.qty, i18n.language)}
                        </p>
                        <p className="mt-1 text-[17px] font-semibold tracking-tight text-neutral-950">
                          {formatStorePrice(offer.price, i18n.language)}
                        </p>
                        {save > 0 ? (
                          <p className="mt-0.5 text-[11px] text-main-green">
                            {copy.save} {formatStorePrice(save, i18n.language)}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <Link
              href={`/store/${itemKey}/request`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-main-green px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_32px_rgba(14,152,93,0.25)] transition hover:bg-main-dark-green"
            >
              {copy.request}
            </Link>

            <div className="mt-8 divide-y divide-[#e7e2d8] border-y border-[#e7e2d8]">
              {(
                [
                  {
                    id: "description" as const,
                    label: copy.description,
                    text: body,
                  },
                  {
                    id: "includes" as const,
                    label: copy.includes,
                    text: includes,
                  },
                  {
                    id: "how" as const,
                    label: copy.how,
                    text: how,
                  },
                  {
                    id: "compatibility" as const,
                    label: copy.compatibility,
                    text: compatibility,
                  },
                ] satisfies { id: AccordionId; label: string; text: string }[]
              ).map((section) => {
                const expanded = open.has(section.id);
                return (
                  <div key={section.id}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => toggleSection(section.id)}
                      className="flex w-full items-center justify-between py-4 text-start text-[15px] font-semibold text-neutral-950"
                    >
                      {section.label}
                      <span className="relative h-4 w-4 shrink-0">
                        <AnimatePresence initial={false} mode="wait">
                          <motion.span
                            key={expanded ? "minus" : "plus"}
                            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                            transition={{
                              duration: 0.22,
                              ease: ACCORDION_EASE,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            {expanded ? (
                              <FiMinus size={16} />
                            ) : (
                              <FiPlus size={16} />
                            )}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: expanded ? "auto" : 0,
                        opacity: expanded ? 1 : 0,
                      }}
                      transition={{
                        height: { duration: 0.48, ease: ACCORDION_EASE },
                        opacity: {
                          duration: expanded ? 0.32 : 0.2,
                          ease: ACCORDION_EASE,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm leading-relaxed text-neutral-500">
                        {section.text}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="mt-12 grid gap-3 rounded-[1.4rem] bg-white p-5 ring-1 ring-[#e7e2d8] sm:grid-cols-3 sm:p-6">
          {trust.map((item) => (
            <div key={item.title} className="flex gap-3 px-2 py-3">
              <item.icon className="mt-0.5 shrink-0 text-main-green" size={22} />
              <div>
                <p className="text-sm font-bold text-neutral-950">{item.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                  {item.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight text-main-move md:text-[28px]">
            {copy.related}
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((key, index) => (
              <RelatedCard key={key} itemKey={key} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
