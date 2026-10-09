"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SERVICE_GROUPS,
  isVideoProjectType,
  type Project,
  type ProjectType,
  type ServiceGroupId,
} from "@/types/project";

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
}: {
  item: Project;
  number: string;
  line: string;
  variant: "featured" | "stack";
  className?: string;
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
          className={`font-black tabular-nums text-main-green ${
            featured ? "text-[15px]" : "text-[13px]"
          }`}
        >
          {number}
        </span>
        {featured ? <span className="h-9 w-px bg-main-green/80" /> : null}
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

const ShowReels = ({ items }: { items: Project[] }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [groupId, setGroupId] = useState<ServiceGroupId>("branding");
  const [subType, setSubType] = useState<ProjectType>(
    SERVICE_GROUPS[0].types[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const group =
    SERVICE_GROUPS.find((item) => item.id === groupId) ?? SERVICE_GROUPS[0];

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
  const featured = paginated[0];
  const stacked = paginated.slice(1);

  return (
    <div
      className="relative min-h-screen bg-[#05070c] text-white select-none"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="relative z-10 px-6 pb-16 pt-24 md:px-14">
        <div className="mb-5 max-w-3xl">
          <h1 className="text-[32px] font-black uppercase leading-none tracking-tight md:text-[44px]">
            {t("projects.hero.title")}
          </h1>
        </div>

        <div className="mb-4 flex flex-wrap gap-2.5">
          {SERVICE_GROUPS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setGroupId(item.id);
                setSubType(item.types[0]);
                setCurrentPage(1);
              }}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                groupId === item.id
                  ? "border-main-green bg-main-green text-white"
                  : "border-white/15 bg-white/5 text-white/65 hover:border-white/35 hover:text-white"
              }`}
            >
              {t(`projects.groups.${item.id}.label`)}
            </button>
          ))}
        </div>

        <p className="mb-5 max-w-2xl text-sm font-medium text-white/45">
          {t(`projects.groups.${groupId}.intro`)}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
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
                  ? "border-white bg-white text-slate-900"
                  : "border-white/15 bg-transparent text-white/55 hover:border-white/40 hover:text-white"
              }`}
            >
              {t(`projects.types.${type}`)}
            </button>
          ))}
        </div>

        {paginated.length === 0 ? (
          <p className="py-16 text-white/40">{t("projects.empty")}</p>
        ) : stacked.length > 0 ? (
          <div className="grid items-start gap-4 md:grid-cols-12 md:gap-5">
            {featured ? (
              <CasePoster
                key={featured.id}
                item={featured}
                variant="featured"
                className="md:col-span-5"
                number={String((currentPage - 1) * itemsPerPage + 1).padStart(2, "0")}
                line={t(`projects.journey.lines.${featured.type}`)}
              />
            ) : null}
            <div className="flex w-full min-w-0 flex-col gap-4 md:col-span-7">
              {stacked.map((item, index) => (
                <CasePoster
                  key={item.id}
                  item={item}
                  variant="stack"
                  number={String(
                    (currentPage - 1) * itemsPerPage + index + 2,
                  ).padStart(2, "0")}
                  line={t(`projects.journey.lines.${item.type}`)}
                />
              ))}
            </div>
          </div>
        ) : featured ? (
          <CasePoster
            key={featured.id}
            item={featured}
            variant="featured"
            className="w-full max-w-[32rem]"
            number={String((currentPage - 1) * itemsPerPage + 1).padStart(2, "0")}
            line={t(`projects.journey.lines.${featured.type}`)}
          />
        ) : null}

        {totalPages > 1 && (
          <div className="mt-14 flex flex-wrap gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const activePage = i + 1;
              return (
                <button
                  key={activePage}
                  type="button"
                  onClick={() => setCurrentPage(activePage)}
                  className={`h-11 w-11 rounded-full text-xs font-black transition-all ${
                    currentPage === activePage
                      ? "bg-main-green text-white"
                      : "border border-white/15 bg-white/5 text-white/60 hover:border-white/35 hover:text-white"
                  }`}
                >
                  {activePage}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="relative z-10 px-6 pb-24 pt-14 md:px-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl space-y-3">
            <motion.h4
              className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("projects.cta.title")}
            </motion.h4>
            <motion.p
              className="text-base font-medium leading-relaxed text-white/55 md:text-lg"
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
  );
};

export default ShowReels;
