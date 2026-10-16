"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  isVideoProjectType,
  type Project,
  type ProjectType,
} from "@/types/project";
import NoisyBg from "@/components/global/NoisyBg";
import {
  DEFAULT_RESOLVED_GROUPS,
  serviceGroupIntro,
  serviceGroupLabel,
  type ResolvedServiceGroup,
  type ServiceAccent,
} from "@/lib/service-groups";

const GROUP_ACCENT: Record<
  ServiceAccent,
  { pill: string; type: string; number: string; rule: string; page: string; dot: string }
> = {
  green: {
    pill: "bg-main-green text-white shadow-[0_8px_20px_rgba(14,152,93,0.28)]",
    type: "border-main-green bg-main-green text-white",
    number: "text-main-green",
    rule: "bg-main-green/80",
    page: "bg-main-green text-white",
    dot: "bg-main-green",
  },
  red: {
    pill: "bg-main-red text-white shadow-[0_8px_20px_rgba(229,68,17,0.28)]",
    type: "border-main-red bg-main-red text-white",
    number: "text-main-red",
    rule: "bg-main-red/80",
    page: "bg-main-red text-white",
    dot: "bg-main-red",
  },
  move: {
    pill: "bg-main-move text-white shadow-[0_8px_20px_rgba(85,37,131,0.28)]",
    type: "border-main-move bg-main-move text-white",
    number: "text-main-move",
    rule: "bg-main-move/80",
    page: "bg-main-move text-white",
    dot: "bg-main-move",
  },
};

function CropMarks() {
  return (
    <span className="pointer-events-none absolute inset-3 z-[3]" aria-hidden>
      <span className="absolute start-0 top-0 h-4 w-4 border-s-2 border-t-2 border-white/40" />
      <span className="absolute end-0 top-0 h-4 w-4 border-e-2 border-t-2 border-white/40" />
      <span className="absolute bottom-0 start-0 h-4 w-4 border-s-2 border-b-2 border-white/40" />
      <span className="absolute bottom-0 end-0 h-4 w-4 border-e-2 border-t-2 border-white/40" />
    </span>
  );
}

function CasePoster({
  item,
  number,
  line,
  variant,
  className = "",
  numberClass = "text-main-green",
  ruleClass = "bg-main-green/80",
}: {
  item: Project;
  number: string;
  line: string;
  variant: "featured" | "stack";
  className?: string;
  numberClass?: string;
  ruleClass?: string;
}) {
  const featured = variant === "featured";

  return (
    <motion.a
      href={`/projects/${item.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative isolate block w-full min-w-0 shrink-0 overflow-hidden rounded-[1.35rem] bg-[#0a0d12] ring-1 ring-white/10 ${
        featured
          ? "aspect-[3/4] min-h-[20rem]"
          : "aspect-[16/10] min-h-[11rem]"
      } ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {isVideoProjectType(item.type) ? (
        <video
          src={item.media_url}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          poster={item.poster_url ?? undefined}
          preload="metadata"
          muted
        />
      ) : (
        <img
          src={item.media_url}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
      <CropMarks />

      <span className="absolute start-5 top-5 z-[4] flex flex-col items-start gap-2">
        <span
          className={`font-black tabular-nums ${numberClass} ${
            featured ? "text-[15px]" : "text-[13px]"
          }`}
        >
          {number}
        </span>
        {featured ? <span className={`h-9 w-px ${ruleClass}`} /> : null}
      </span>

      <div className={`absolute inset-x-0 bottom-0 z-[4] ${featured ? "p-5 md:p-7" : "p-4 md:p-5"}`}>
        <h3
          className={`font-black uppercase leading-[1.05] tracking-tight text-white ${
            featured ? "text-[26px] md:text-[32px]" : "text-[18px] md:text-[22px]"
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`mt-2 max-w-[32rem] text-pretty leading-relaxed text-white/75 ${
            featured ? "text-[13px] md:text-[14px]" : "text-[12px] md:text-[13px]"
          }`}
        >
          {line}
        </p>
      </div>
    </motion.a>
  );
}

const ShowReels = ({
  items,
  groups = DEFAULT_RESOLVED_GROUPS,
}: {
  items: Project[];
  groups?: ResolvedServiceGroup[];
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const tabs = groups.length ? groups : DEFAULT_RESOLVED_GROUPS;
  const [groupId, setGroupId] = useState(tabs[0].id);
  const [subType, setSubType] = useState<ProjectType>(tabs[0].types[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const group = tabs.find((item) => item.id === groupId) ?? tabs[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!group.types.includes(subType)) {
      setSubType(group.types[0]);
    }
    setCurrentPage(1);
  }, [group.types, subType]);

  const filtered = useMemo(
    () => items.filter((item) => item.type === subType),
    [items, subType],
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const pageOffset = (currentPage - 1) * itemsPerPage;
  const hasLeftover = paginated.length % 2 === 1;
  const accent = GROUP_ACCENT[group.accent];

  return (
    <div className="relative min-h-screen select-none" dir={isArabic ? "rtl" : "ltr"}>
      <section className="relative h-[calc(100dvh+2rem)] min-h-screen overflow-hidden bg-black md:h-[calc(100dvh+3rem)]">
        <motion.img
          src="/images/sign8.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/75 to-black" />
        <div className="absolute inset-x-0 top-0 z-10 flex h-dvh min-h-screen flex-col items-center justify-center px-6 text-center">
          <motion.span
            className="mb-6 inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-hidden
          >
            <span className="h-1.5 w-1.5 rounded-full bg-main-red" />
            <span className="h-1.5 w-1.5 rounded-full bg-main-move" />
            <span className="h-1.5 w-1.5 rounded-full bg-main-green" />
          </motion.span>
          <motion.h1
            className="mb-4 max-w-4xl text-center text-4xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("projects.hero.title")}
          </motion.h1>
          <motion.span
            className="mb-5 h-px w-16 bg-gradient-to-r from-main-red via-main-move to-main-green"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            aria-hidden
          />
          <motion.p
            className="mx-auto max-w-xl text-center text-base font-medium leading-relaxed text-white/60 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t("projects.hero.description")}
          </motion.p>
        </div>
      </section>

      <div className="relative z-20 -mt-8 overflow-hidden rounded-t-[2.5rem] bg-white text-slate-900 shadow-[0_-20px_50px_rgba(0,0,0,0.3)] md:-mt-12 md:rounded-t-[4rem]">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden>
          <NoisyBg />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-main-red/[0.04] via-main-move/[0.03] to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-[22rem] w-[22rem] rounded-full bg-gradient-to-tr from-main-green/[0.05] to-transparent blur-3xl"
        />

        <section className="relative z-10 px-6 pb-16 pt-16 md:px-14 md:pt-20">
          <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 inline-flex max-w-full flex-wrap justify-center gap-1 rounded-3xl bg-slate-50 p-1.5 shadow-sm ring-1 ring-slate-200/80">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setGroupId(item.id);
                    setSubType(item.types[0]);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex cursor-pointer items-center rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    groupId === item.id
                      ? GROUP_ACCENT[item.accent].pill
                      : "text-slate-500 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {groupId !== item.id ? (
                    <span className={`me-1.5 inline-block h-1.5 w-1.5 rounded-full ${GROUP_ACCENT[item.accent].dot}`} />
                  ) : null}
                  {serviceGroupLabel(item, i18n.language)}
                </button>
              ))}
            </div>

            {serviceGroupIntro(group, i18n.language) ? (
            <p className="mb-6 max-w-2xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
              {serviceGroupIntro(group, i18n.language)}
            </p>
            ) : null}

            <div className="flex flex-wrap justify-center gap-2">
              {group.types.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setSubType(type);
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                    subType === type
                      ? accent.type
                      : "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900"
                  }`}
                >
                  {t(`projects.types.${type}`)}
                </button>
              ))}
            </div>
          </div>

          {paginated.length === 0 ? (
            <p className="py-16 text-center text-slate-400">{t("projects.empty")}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {paginated.map((item, index) => {
                const leftover = hasLeftover && index === paginated.length - 1;
                return (
                  <CasePoster
                    key={item.id}
                    item={item}
                    variant="stack"
                    className={leftover ? "md:col-span-2" : undefined}
                    number={String(pageOffset + index + 1).padStart(2, "0")}
                    numberClass={accent.number}
                    ruleClass={accent.rule}
                    line={t(`projects.journey.lines.${item.type}`)}
                  />
                );
              })}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-14 flex flex-wrap justify-center gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const activePage = i + 1;
                return (
                  <button
                    key={activePage}
                    type="button"
                    onClick={() => setCurrentPage(activePage)}
                    className={`h-11 w-11 rounded-full text-xs font-black transition-all ${
                      currentPage === activePage
                        ? accent.page
                        : "border border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {activePage}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="relative z-10 px-6 pb-24 pt-8 md:px-14">
          <div className="mb-8 h-px w-full bg-gradient-to-r from-main-red via-main-move to-main-green opacity-40" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-3">
              <motion.h4
                className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t("projects.cta.title")}
              </motion.h4>
              <motion.p
                className="text-base font-medium leading-relaxed text-slate-500 md:text-lg"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t("projects.cta.description")}
              </motion.p>
            </div>
            <motion.a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center self-start rounded-full bg-main-green px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_18px_40px_rgba(14,152,93,0.28)] transition-all hover:bg-main-dark-green md:self-auto"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("projects.cta.button")}
            </motion.a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShowReels;
