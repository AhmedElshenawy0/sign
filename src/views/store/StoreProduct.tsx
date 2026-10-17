"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiPlus, FiMinus, FiShield, FiCpu, FiAward } from "react-icons/fi";
import { useStoreCopy } from "@/components/cms/PageCopy";
import GridBg from "@/components/global/GridBg";
import { cn } from "@/lib/utils";
import {
  formatStorePrice,
  localeOf,
  storeItemCases,
  storeItemCopy,
  storeItemGallery,
  storeItemImage,
  storeItemOffers,
  storeItemPrice,
  storeOfferLabel,
  storeRelatedKeys,
  storeTrustItems,
  STORE_PRODUCT_COPY,
  type StoreCaseMedia,
  type StoreItemKey,
} from "@/lib/store-catalog";

type AccordionId = "description" | "includes" | "how" | "compatibility";

const DEFAULT_OPEN: AccordionId[] = ["description", "includes"];
const ACCORDION_EASE = [0.16, 1, 0.3, 1] as const;

const ACCENTS = [
  "text-main-green",
  "text-main-red",
  "text-main-move",
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
  const price = storeItemPrice(cms, itemKey);

  return (
    <Link
      href={`/store/${itemKey}`}
      className="group overflow-hidden rounded-2xl bg-white ring-1 ring-[#e7e2d8] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(40,30,20,0.08)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f3efe8] sm:aspect-square">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span
          className={cn(
            "absolute top-2.5 right-2.5 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold shadow-sm backdrop-blur-sm rtl:left-2.5 rtl:right-auto",
            ACCENTS[index % ACCENTS.length],
          )}
        >
          {kicker}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-10">
          <p className="text-[13px] font-semibold leading-snug text-white">
            {title}
          </p>
          <p className="mt-0.5 text-[12px] font-medium text-white/90">
            {formatStorePrice(price, i18n.language)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function CaseTile({
  item,
  className,
  onImageClick,
}: {
  item: StoreCaseMedia;
  className?: string;
  onImageClick?: (src: string) => void;
}) {
  const media =
    item.kind === "video" ? (
      <video
        src={item.src}
        className="absolute inset-0 h-full w-full object-cover"
        controls
        playsInline
        preload="metadata"
      />
    ) : (
      <img src={item.src} alt={item.caption || ""} className="absolute inset-0 h-full w-full object-cover" />
    );

  const body = (
    <>
      {media}
      {item.caption ? (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-[12px] font-medium text-white">
          {item.caption}
        </span>
      ) : null}
    </>
  );

  if (item.kind === "image" && onImageClick) {
    return (
      <button
        type="button"
        onClick={() => onImageClick(item.src)}
        className={cn(
          "relative overflow-hidden rounded-[1rem] bg-white ring-1 ring-[#e7e2d8]",
          className,
        )}
      >
        {body}
      </button>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1rem] bg-white ring-1 ring-[#e7e2d8]",
        className,
      )}
    >
      {body}
    </div>
  );
}

function CasesGrid({
  items,
  className,
  onImageClick,
}: {
  items: StoreCaseMedia[];
  className?: string;
  onImageClick?: (src: string) => void;
}) {
  if (!items.length) return null;
  const [first, second, third] = items;
  if (!first) return null;
  return (
    <div className={cn("grid grid-cols-2 gap-2.5", className)}>
      <CaseTile
        item={first}
        onImageClick={onImageClick}
        className={cn(
          "min-h-[11rem]",
          items.length === 1 ? "col-span-2" : "col-span-2 sm:col-span-1 sm:row-span-2 sm:min-h-[18rem]",
        )}
      />
      {second ? (
        <CaseTile
          item={second}
          onImageClick={onImageClick}
          className="min-h-[8.5rem]"
        />
      ) : null}
      {third ? (
        <CaseTile
          item={third}
          onImageClick={onImageClick}
          className="min-h-[8.5rem]"
        />
      ) : null}
    </div>
  );
}

export default function StoreProduct({ itemKey }: { itemKey: StoreItemKey }) {
  const { i18n } = useTranslation();
  const cms = useStoreCopy();
  const isArabic = i18n.language.startsWith("ar");
  const copy = STORE_PRODUCT_COPY[localeOf(i18n.language)];
  const gallery = storeItemGallery(cms, itemKey);
  const [active, setActive] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
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
  const cases = storeItemCases(cms, i18n.language, itemKey);
  const related = storeRelatedKeys(itemKey);
  const hero = gallery[active] ?? gallery[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    setActive(0);
    setSelectedQty(1);
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

  const trustIcons = [FiShield, FiCpu, FiAward] as const;
  const trust = storeTrustItems(cms, i18n.language).map((item, index) => ({
    ...item,
    icon: trustIcons[index] ?? FiShield,
  }));

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen bg-white text-neutral-950"
    >
      <GridBg variant="light" />
      <section className="relative z-10 mx-auto max-w-[1180px] px-5 pb-10 pt-24 md:px-8 md:pt-28">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-[12px] font-semibold text-neutral-500 transition hover:text-neutral-950"
        >
          {isArabic ? <FaArrowRight size={11} /> : <FaArrowLeft size={11} />}
          {copy.back}
        </Link>

        <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,360px)] lg:gap-10">
          <div>
            <div className="flex gap-2.5">
              <div className="hidden w-14 shrink-0 flex-col gap-2 sm:flex">
                {gallery.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg bg-white ring-1 ring-[#e7e2d8] transition",
                      active === index
                        ? "ring-2 ring-main-green"
                        : "hover:ring-neutral-400",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem] bg-white ring-1 ring-[#e7e2d8] sm:aspect-square sm:max-h-[28rem]">
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
                <span className="absolute top-3 right-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-main-green shadow-sm rtl:left-3 rtl:right-auto">
                  {kicker}
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex gap-2 overflow-x-auto overflow-y-hidden overscroll-x-contain sm:hidden">
              {gallery.map((src, index) => (
                <button
                  key={`m-${src}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-[#e7e2d8]",
                    active === index ? "ring-2 ring-main-green" : "",
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <CasesGrid
              items={cases}
              className="mt-2.5 hidden sm:grid"
              onImageClick={(src) => {
                const index = gallery.indexOf(src);
                if (index >= 0) setActive(index);
              }}
            />
          </div>

          <aside className="lg:sticky lg:top-24">
            <h1 className="text-[24px] font-bold leading-tight tracking-tight text-neutral-950 md:text-[28px]">
              {title}
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
              {line}
            </p>

            <div className="mt-4 border-t border-[#e7e2d8] pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-[22px] font-semibold tracking-tight text-neutral-950 md:text-[24px]">
                  {formatStorePrice(price, i18n.language)}
                </span>
                <span className="text-[12px] text-neutral-400">{copy.perPiece}</span>
              </div>

              {offers.length ? (
                <div
                  className={cn(
                    "mt-3 grid gap-2",
                    offers.length === 1 ? "grid-cols-1" : "grid-cols-2",
                  )}
                >
                  {offers.map((offer) => {
                    const save = price * offer.qty - offer.price;
                    const selected = selectedQty === offer.qty;
                    return (
                      <button
                        key={`${offer.qty}-${offer.price}`}
                        type="button"
                        onClick={() =>
                          setSelectedQty((qty) => (qty === offer.qty ? 1 : offer.qty))
                        }
                        className={cn(
                          "relative rounded-xl bg-white px-3 py-2.5 text-start ring-1 transition",
                          selected
                            ? "bg-main-green/5 ring-main-green/45"
                            : offer.badge
                              ? "ring-main-green/35 hover:ring-main-green/50"
                              : "ring-[#e7e2d8] hover:ring-neutral-400",
                        )}
                      >
                        {offer.badge ? (
                          <span className="absolute -top-2 right-2 rounded-full bg-main-green px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white rtl:left-2 rtl:right-auto">
                            {offer.badge}
                          </span>
                        ) : null}
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                          {storeOfferLabel(offer.qty, i18n.language)}
                        </p>
                        <p className="mt-0.5 text-[15px] font-semibold tracking-tight text-neutral-950">
                          {formatStorePrice(offer.price, i18n.language)}
                        </p>
                        {save > 0 ? (
                          <p className="text-[11px] text-main-green">
                            {copy.save} {formatStorePrice(save, i18n.language)}
                          </p>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <Link
              href={`/store/${itemKey}/request?qty=${selectedQty}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-main-green px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_14px_32px_rgba(14,152,93,0.25)] transition hover:bg-main-dark-green"
            >
              {copy.request}
            </Link>

            <div className="mt-6 divide-y divide-[#e7e2d8] border-y border-[#e7e2d8]">
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
                      className="flex w-full items-center justify-between py-3 text-start text-[14px] font-semibold text-neutral-950"
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
                      <p className="pb-3 text-[13px] leading-relaxed text-neutral-500">
                        {section.text}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <CasesGrid
          items={cases}
          className="mt-6 sm:hidden"
          onImageClick={(src) => {
            const index = gallery.indexOf(src);
            if (index >= 0) setActive(index);
          }}
        />

        <div className="mt-8 grid gap-2 rounded-[1.2rem] bg-white p-4 ring-1 ring-[#e7e2d8] sm:grid-cols-3 sm:p-5">
          {trust.map((item) => (
            <div key={item.title} className="flex gap-2.5 px-1 py-2">
              <item.icon className="mt-0.5 shrink-0 text-main-green" size={18} />
              <div>
                <p className="text-[13px] font-bold text-neutral-950">{item.title}</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-neutral-500">
                  {item.line}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-main-move md:text-[22px]">
            {copy.related}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {related.map((key, index) => (
              <RelatedCard key={key} itemKey={key} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
