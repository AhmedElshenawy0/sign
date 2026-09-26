"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiExternalLink } from "react-icons/fi";
import type { Project, ProjectType } from "@/types/project";

const NFC_TYPES: ProjectType[] = ["nfc_card", "nfc_ring", "nfc_medal"];
const NFC_SITE = "https://nfc.signuptap.com";

function VisitNfcButton({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={NFC_SITE}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-main-green px-7 py-3.5 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(14,152,93,0.35)] transition hover:bg-main-dark-green hover:shadow-[0_18px_46px_rgba(14,152,93,0.5)] ${className}`}
    >
      {label}
      <FiExternalLink size={14} />
    </a>
  );
}

function NfcWaves({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none flex h-10 items-end gap-[3px] ${className}`}>
      {[1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-main-green"
          animate={{ height: ["6px", "22px", "6px"] }}
          transition={{
            repeat: Infinity,
            duration: 1.1,
            delay: i * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CardShape({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      className={`relative mx-auto w-full ${compact ? "max-w-[220px]" : "max-w-[360px]"}`}
      style={{ perspective: 1200 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="relative aspect-[1.586] overflow-hidden rounded-[1.4rem] border border-white/20 bg-gradient-to-br from-[#f3f1ec] via-[#c9c4b8] to-[#6f6a62] shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
        style={{ transform: "rotateY(-16deg) rotateX(8deg)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.45)_0%,transparent_40%,rgba(0,0,0,0.18)_100%)]" />
        <div className="absolute left-6 top-6 h-9 w-12 rounded-md bg-gradient-to-br from-amber-200 to-amber-500 shadow-inner" />
        <div className="absolute right-6 top-6 h-9 w-9 rounded-full border border-black/15 bg-black/10">
          <div className="absolute inset-1.5 rounded-full border border-black/20" />
          <div className="absolute inset-3 rounded-full bg-main-green/40" />
        </div>
        <img
          src="/images/SignUp Logo White.png"
          alt=""
          className="absolute bottom-14 left-6 h-8 w-8 rounded-full object-cover opacity-80"
        />
        <p className="absolute bottom-6 left-6 text-[10px] font-black uppercase tracking-[0.32em] text-black/60">
          NFC · Card
        </p>
        <NfcWaves className="absolute right-5 top-5 opacity-80" />
      </div>
    </motion.div>
  );
}

function RingShape({ compact = false }: { compact?: boolean }) {
  const size = compact ? "h-[160px] w-[160px]" : "h-[230px] w-[230px]";
  const hole = compact ? "inset-[34px]" : "inset-[48px]";
  return (
    <motion.div
      className="relative mx-auto flex flex-col items-center"
      animate={{ y: [0, -12, 0], rotateZ: [0, 6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className={`relative ${size}`}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-800 shadow-[0_30px_70px_rgba(0,0,0,0.55),inset_0_2px_10px_rgba(255,255,255,0.4)]" />
        <div className={`absolute ${hole} rounded-full bg-[#070707] ring-1 ring-white/20 shadow-[inset_0_0_28px_rgba(0,0,0,0.9)]`} />
        <div className="absolute right-9 top-10 h-16 w-8 rounded-full bg-white/30 blur-[1px]" />
      </div>
      {!compact ? (
        <p className="mt-5 text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
          NFC · Ring
        </p>
      ) : null}
    </motion.div>
  );
}

function MedalShape({ compact = false }: { compact?: boolean }) {
  const medal = compact ? "h-[150px] w-[150px]" : "h-[210px] w-[210px]";
  return (
    <motion.div
      className="relative mx-auto flex flex-col items-center"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="h-7 w-9 rounded-t-md bg-gradient-to-b from-zinc-300 to-zinc-700" />
      <div
        className={`relative ${medal} rounded-full bg-gradient-to-br from-amber-200 via-yellow-600 to-amber-950 shadow-[0_30px_70px_rgba(229,68,17,0.18)]`}
      >
        <div className="absolute inset-3 rounded-full border border-amber-100/50" />
        <div className="absolute inset-8 rounded-full border border-black/20 bg-gradient-to-br from-amber-200/25 to-transparent" />
        <img
          src="/images/SignUp Logo White.png"
          alt=""
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full object-cover opacity-90"
        />
      </div>
      {!compact ? (
        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
          NFC · Medal
        </p>
      ) : null}
    </motion.div>
  );
}

const SHAPES = {
  nfc_card: CardShape,
  nfc_ring: RingShape,
  nfc_medal: MedalShape,
} as const;

export default function NfcProducts({ items }: { items: Project[] }) {
  const { t, i18n } = useTranslation();
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
              {t("nfcPage.eyebrow")}
            </motion.p>
            <motion.h1
              className="mb-5 text-5xl font-black uppercase tracking-tight md:text-7xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {t("nfcPage.title")}
            </motion.h1>
            <motion.p
              className="mx-auto mb-10 max-w-xl text-base font-medium leading-relaxed text-white/75 md:text-lg lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
            >
              {t("nfcPage.description")}
            </motion.p>
            <motion.div
              className="mb-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
            >
              <VisitNfcButton label={t("nfcPage.openSite")} />
              <p className="pt-3 text-[10px] font-black uppercase tracking-[0.28em] text-white/40">
                {t("nfcPage.ctaHint")}
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
              src="/images/nfc/stand.jpg"
              alt={t("nfcPage.standTitle")}
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
                {t("nfcPage.standKicker")}
              </p>
              <h2 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-5xl">
                {t("nfcPage.standTitle")}
              </h2>
              <p className="mb-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                {t("nfcPage.standBody")}
              </p>
              <VisitNfcButton label={t("nfcPage.openSite")} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[1.5rem] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              <img
                src="/images/nfc/stand.jpg"
                alt={t("nfcPage.standTitle")}
                className="mx-auto w-full max-w-md object-contain"
              />
            </motion.div>
          </div>
        </section>

        {NFC_TYPES.map((type, index) => {
          const Shape = SHAPES[type];
          const work = items.filter((item) => item.type === type);
          const reverse = index % 2 === 1;

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
                    {t(`nfcPage.types.${type}.kicker`)}
                  </p>
                  <h2 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-5xl">
                    {t(`nfcPage.types.${type}.title`)}
                  </h2>
                  <p className="mb-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                    {t(`nfcPage.types.${type}.body`)}
                  </p>
                  <VisitNfcButton label={t("nfcPage.openSite")} />
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
                          src={item.media_url}
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
          <p className="mb-6 text-sm font-medium text-white/55">{t("nfcPage.ctaHint")}</p>
          <VisitNfcButton label={t("nfcPage.openSite")} />
        </section>
      </div>
    </div>
  );
}
