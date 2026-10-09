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
      <span className="absolute bottom-0 end-0 h-4 w-4 border-e-2 border-b-2 border-white/40" />
    </span>
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
  const itemsPerPage = 8;

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

  return (
    <div
      className="relative min-h-screen bg-[#05070c] text-white select-none"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <section className="relative z-10 px-6 pb-16 pt-24 md:px-14 md:pb-20 md:pt-28">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-[36px] font-black uppercase leading-none tracking-tight md:text-[52px]">
            {t("projects.hero.title")}
          </h1>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2.5">
          {SERVICE_GROUPS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setGroupId(item.id)}
              className={`rounded-full border px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                groupId === item.id
                  ? "border-main-green bg-main-green text-white"
                  : "border-white/15 bg-white/5 text-white/65 hover:border-white/35 hover:text-white"
              }`}
            >
              {t(`projects.groups.${item.id}.label`)}
            </button>
          ))}
        </div>

        <p className="mx-auto mb-8 max-w-2xl text-center text-sm font-medium text-white/45">
          {t(`projects.groups.${groupId}.intro`)}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {group.types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setSubType(type);
                setCurrentPage(1);
              }}
              className={`rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
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
          <p className="py-16 text-center text-white/40">{t("projects.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {paginated.map((item, index) => {
              const number = String(
                (currentPage - 1) * itemsPerPage + index + 1,
              ).padStart(2, "0");

              return (
                <motion.a
                  key={item.id}
                  href={`/projects/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate aspect-[3/4] overflow-hidden rounded-[18px] bg-[#0a0d12] ring-1 ring-white/10"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {isVideoProjectType(item.type) ? (
                    <video
                      src={item.media_url}
                      className="absolute inset-0 h-full w-full object-cover pointer-events-none transition duration-700 group-hover:scale-[1.05]"
                      poster={item.poster_url ?? undefined}
                      preload="metadata"
                      muted
                    />
                  ) : (
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10" />
                  <CropMarks />

                  <span className="absolute start-5 top-5 z-[4] text-[15px] font-black tabular-nums text-main-green">
                    {number}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 z-[4] p-5 md:p-6">
                    <h3 className="text-[26px] font-black uppercase leading-[0.9] tracking-tight text-white md:text-[30px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[16rem] text-[13px] leading-snug text-white/70">
                      {t(`projects.journey.lines.${item.type}`)}
                    </p>
                  </div>
                </motion.a>
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

      <section className="relative z-10 flex min-h-[50vh] items-center justify-center overflow-hidden px-6 py-20 text-center md:px-14">
        <div className="mx-auto max-w-2xl space-y-8">
          <motion.h4
            className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("projects.cta.title")}
          </motion.h4>
          <motion.p
            className="mx-auto max-w-xl text-base font-medium leading-relaxed text-white/55 md:text-lg"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("projects.cta.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/contact"
              className="inline-block rounded-full bg-main-green px-10 py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-main-green/10 transition-all hover:bg-main-dark-green"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("projects.cta.button")}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShowReels;
