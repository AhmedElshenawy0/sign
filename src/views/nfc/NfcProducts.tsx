"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Project } from "@/types/project";
import { useNfcCopy } from "@/components/cms/PageCopy";
import { cmsText } from "@/lib/cms-text";

const NFC_TYPES = ["nfc_card", "nfc_ring", "nfc_medal"] as const;
const NFC_STILLS = {
  nfc_card: "/images/nfc/nfc-card.jpg",
  nfc_ring: "/images/nfc/nfc-ring.jpg",
  nfc_medal: "/images/nfc/nfc-medal.jpg",
} as const;
const STAND_STILL = "/images/nfc/stand-signup.jpg";

function VisitStoreButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <Link
      href="/store"
      className={`inline-flex items-center justify-center rounded-full bg-main-green px-7 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(14,152,93,0.35)] transition hover:bg-main-dark-green hover:shadow-[0_18px_46px_rgba(14,152,93,0.5)] ${className}`}
    >
      {label}
    </Link>
  );
}

function ProductStill({
  src,
  alt = "",
  compact = false,
  aspect = "aspect-[16/10]",
}: {
  src: string;
  alt?: string;
  compact?: boolean;
  aspect?: string;
}) {
  return (
    <motion.div
      className={`relative mx-auto w-full overflow-hidden rounded-[1.2rem] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)] ${
        compact ? "max-w-[220px]" : "max-w-[420px]"
      }`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <img src={src} alt={alt} className={`w-full object-cover ${compact ? "aspect-[4/3]" : aspect}`} />
    </motion.div>
  );
}

export function CardShape({ compact = false }: { compact?: boolean }) {
  return <ProductStill src={NFC_STILLS.nfc_card} compact={compact} />;
}

export function RingShape({ compact = false }: { compact?: boolean }) {
  return <ProductStill src={NFC_STILLS.nfc_ring} compact={compact} aspect="aspect-square" />;
}

export function MedalShape({ compact = false }: { compact?: boolean }) {
  return <ProductStill src={NFC_STILLS.nfc_medal} compact={compact} aspect="aspect-square" />;
}

const SHAPES = {
  nfc_card: CardShape,
  nfc_ring: RingShape,
  nfc_medal: MedalShape,
} as const;

export default function NfcProducts({ items }: { items: Project[] }) {
  const { t, i18n } = useTranslation();
  const cms = useNfcCopy();
  const isArabic = i18n.language.startsWith("ar");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-black text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center">
        <motion.img
          src="/images/sign8.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,152,93,0.18),transparent_55%)]" />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-start">
            <motion.p
              className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-main-green"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {cmsText(cms?.eyebrow, i18n.language, t("nfcPage.eyebrow"))}
            </motion.p>
            <motion.h1
              className="mb-5 text-5xl font-black uppercase tracking-tight md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {cmsText(cms?.title, i18n.language, t("nfcPage.title"))}
            </motion.h1>
            <motion.p
              className="mx-auto mb-10 max-w-xl text-base font-medium leading-relaxed text-white/75 md:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              {cmsText(cms?.description, i18n.language, t("nfcPage.description"))}
            </motion.p>
            <motion.div
              className="mb-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              <VisitStoreButton
                label={cmsText(cms?.openSite, i18n.language, t("nfcPage.openSite"))}
              />
              <p className="pt-3 text-[10px] font-black uppercase tracking-[0.28em] text-white/40">
                {cmsText(cms?.ctaHint, i18n.language, t("nfcPage.ctaHint"))}
              </p>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-lg"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pointer-events-none absolute inset-8 rounded-full bg-white/15 blur-3xl" />
            <img
              src={cms?.standImageUrl || STAND_STILL}
              alt={cmsText(cms?.standTitle, i18n.language, t("nfcPage.standTitle"))}
              className="relative z-10 w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
            />
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mt-16 grid w-full max-w-4xl grid-cols-3 items-end gap-4 md:gap-8"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#nfc_ring" className="pb-4 opacity-90 transition hover:opacity-100">
            <RingShape compact />
          </a>
          <a href="#nfc_card" className="opacity-100 transition hover:opacity-100">
            <CardShape compact />
          </a>
          <a href="#nfc_medal" className="pb-4 opacity-90 transition hover:opacity-100">
            <MedalShape compact />
          </a>
        </motion.div>
      </section>

      <div className="relative z-10 rounded-t-[2rem] border-t border-white/10 bg-gradient-to-b from-zinc-950 to-black md:rounded-t-[3rem]">
        <p className="pt-16 text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/35">
          {t("nfcPage.shapes")}
        </p>

        <section id="nfc_stand" className="mx-auto max-w-6xl px-6 py-20 md:px-12">
          <div className="grid items-center gap-12 rounded-[2rem] border border-white/8 bg-white/[0.03] px-6 py-12 md:grid-cols-2 md:px-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-main-green">
                {cmsText(cms?.standKicker, i18n.language, t("nfcPage.standKicker"))}
              </p>
              <h2 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-5xl">
                {cmsText(cms?.standTitle, i18n.language, t("nfcPage.standTitle"))}
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                {cmsText(cms?.standBody, i18n.language, t("nfcPage.standBody"))}
              </p>
              <VisitStoreButton
                label={cmsText(cms?.openSite, i18n.language, t("nfcPage.openSite"))}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex min-h-[300px] items-center justify-center"
            >
              <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-main-green/15 blur-3xl" />
              <ProductStill
                src={cms?.standImageUrl || STAND_STILL}
                alt={cmsText(cms?.standTitle, i18n.language, t("nfcPage.standTitle"))}
              />
            </motion.div>
          </div>
        </section>

        {NFC_TYPES.map((type, index) => {
          const Shape = SHAPES[type];
          const work = items.filter((item) => item.type === type);
          const reverse = index % 2 === 1;
          const typeCopy =
            type === "nfc_card"
              ? { kicker: cms?.cardKicker, title: cms?.cardTitle, body: cms?.cardBody }
              : type === "nfc_ring"
                ? { kicker: cms?.ringKicker, title: cms?.ringTitle, body: cms?.ringBody }
                : { kicker: cms?.medalKicker, title: cms?.medalTitle, body: cms?.medalBody };

          return (
            <section
              key={type}
              id={type}
              className="mx-auto max-w-6xl px-6 py-20 md:px-12"
            >
              <div
                className={`grid items-center gap-12 rounded-[2rem] border border-white/8 bg-white/[0.03] px-6 py-12 md:grid-cols-2 md:px-12 md:py-16 ${
                  reverse ? "md:[&>div:first-child]:order-2" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-main-green">
                    {cmsText(typeCopy.kicker, i18n.language, t(`nfcPage.types.${type}.kicker`))}
                  </p>
                  <h2 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-5xl">
                    {cmsText(typeCopy.title, i18n.language, t(`nfcPage.types.${type}.title`))}
                  </h2>
                  <p className="mb-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                    {cmsText(typeCopy.body, i18n.language, t(`nfcPage.types.${type}.body`))}
                  </p>
                  <VisitStoreButton
                    label={cmsText(cms?.openSite, i18n.language, t("nfcPage.openSite"))}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex min-h-[300px] items-center justify-center"
                >
                  <div className="pointer-events-none absolute h-56 w-56 rounded-full bg-main-green/15 blur-3xl" />
                  <Shape />
                </motion.div>
              </div>

              {work.length ? (
                <div className="mt-10">
                  <p className="mb-5 text-[10px] font-black uppercase tracking-[0.28em] text-white/40">
                    {t("nfcPage.work")}
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {work.map((item) => (
                      <Link
                        key={item.id}
                        href={`/projects/${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                      >
                        <img
                          src={item.media_url || NFC_STILLS[type]}
                          alt={item.title}
                          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <p className="px-4 py-3 text-xs font-black uppercase tracking-wider text-white/80">
                          {item.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          );
        })}

        <section className="mx-auto max-w-3xl px-6 pb-28 pt-8 text-center">
          <p className="mb-6 text-sm font-medium text-white/55">
            {cmsText(cms?.ctaHint, i18n.language, t("nfcPage.ctaHint"))}
          </p>
          <VisitStoreButton
            label={cmsText(cms?.openSite, i18n.language, t("nfcPage.openSite"))}
          />
        </section>
      </div>
    </div>
  );
}
