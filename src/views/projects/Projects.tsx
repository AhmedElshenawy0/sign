"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import GridBg from "../../components/global/GridBg";
import {
  SERVICE_GROUPS,
  isVideoProjectType,
  type Project,
  type ProjectType,
  type ServiceGroupId,
} from "@/types/project";

const ShowReels = ({ items }: { items: Project[] }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [groupId, setGroupId] = useState<ServiceGroupId>("branding");
  const [subType, setSubType] = useState<ProjectType>(
    SERVICE_GROUPS[0].types[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const group = SERVICE_GROUPS.find((item) => item.id === groupId) ?? SERVICE_GROUPS[0];

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
      className="relative min-h-screen text-white select-none"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <motion.img
          src="/images/sign3.jpg"
          className="w-full h-full object-cover opacity-25 pointer-events-none"
          alt=""
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <section className="h-screen w-full relative z-10 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tight text-main-green uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t("projects.hero.title")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {t("projects.hero.description")}
          </motion.p>
          <motion.div
            className="pt-16 flex justify-center text-slate-400 text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <IoIosArrowDown />
          </motion.div>
        </div>
      </section>

      <section className="px-6 relative md:px-14 py-28 bg-neutral-50 text-slate-900 rounded-t-[2rem] md:rounded-t-[3rem] z-20 shadow-[-0px_-20px_50px_rgba(0,0,0,0.3)]">
        <GridBg variant="light" />

        <div className="flex flex-col items-center text-center mb-12 max-w-2xl mx-auto space-y-4">
          <motion.div
            className="p-3 border border-white/20 rounded-full bg-main-move shadow-lg backdrop-blur-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="/images/SignUp Logo White.png"
              className="w-[72px] h-[72px] object-contain"
              alt="Sign Up Logo"
              loading="lazy"
            />
          </motion.div>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
            {t("projects.moreProjects.heading")}
          </h3>
          <p className="text-slate-500 font-medium max-w-md">
            {t("projects.moreProjects.description")}
          </p>
        </div>

        <div className="flex justify-center gap-2.5 mb-6 flex-wrap">
          {SERVICE_GROUPS.map((item) => (
            <button
              key={item.id}
              onClick={() => setGroupId(item.id)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-full border transition-all duration-200 cursor-pointer ${
                groupId === item.id
                  ? "bg-main-dark-green text-white border-main-dark-green shadow-md shadow-main-dark-green/10"
                  : "bg-white border-neutral-200 text-slate-600 hover:border-main-dark-green hover:text-main-dark-green"
              }`}
            >
              {t(`projects.groups.${item.id}.label`)}
            </button>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm font-medium max-w-2xl mx-auto mb-8">
          {t(`projects.groups.${groupId}.intro`)}
        </p>

        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {group.types.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSubType(type);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 text-[11px] font-black uppercase tracking-wider rounded-full border transition-all duration-200 cursor-pointer ${
                subType === type
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white border-neutral-200 text-slate-500 hover:border-slate-900 hover:text-slate-900"
              }`}
            >
              {t(`projects.types.${type}`)}
            </button>
          ))}
        </div>

        {paginated.length === 0 ? (
          <p className="text-center text-slate-400 py-16">{t("projects.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((item) => (
              <motion.div
                key={item.id}
                className="relative overflow-hidden rounded-2xl shadow-sm border border-neutral-200/60 group bg-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={`/projects/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="w-full h-64 overflow-hidden relative bg-neutral-900">
                    {isVideoProjectType(item.type) ? (
                      <video
                        src={item.media_url}
                        className="w-full h-full object-cover pointer-events-none"
                        poster={item.poster_url ?? undefined}
                        preload="metadata"
                        muted
                      />
                    ) : (
                      <img
                        src={item.media_url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-10 text-xs font-bold tracking-wide uppercase text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.title}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-16 gap-2 flex-wrap">
            {[...Array(totalPages)].map((_, i) => {
              const activePage = i + 1;
              return (
                <button
                  key={activePage}
                  onClick={() => setCurrentPage(activePage)}
                  className={`w-11 h-11 rounded-full text-xs font-black transition-all ${
                    currentPage === activePage
                      ? "bg-main-dark-green text-white shadow-md shadow-main-dark-green/10"
                      : "bg-white text-slate-600 border border-neutral-200 hover:border-main-dark-green hover:text-main-dark-green"
                  }`}
                >
                  {activePage}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section className="px-6 md:px-14 min-h-[70vh] text-center relative z-10 flex justify-center items-center overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.h4
            className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("projects.cta.title")}
          </motion.h4>
          <motion.p
            className="text-slate-300 font-medium text-base md:text-lg max-w-xl mx-auto leading-relaxed"
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
              className="inline-block bg-main-move text-white text-xs font-black uppercase tracking-widest py-4 px-10 rounded-full hover:bg-main-medium-move transition-all shadow-lg shadow-main-move/10"
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
