import MainBtn from "../global/MainBtn";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AboutSignup = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-white text-slate-900 px-6 md:px-14 py-28 md:py-36 border-b border-neutral-100"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header Layout Grid Block */}
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-main-red bg-main-red/5 px-4 py-1.5 rounded-full border border-main-red/10 select-none">
            Corporate Blueprint
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.15] uppercase text-slate-900">
            {t("home.about.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
            {t("home.about.description")}
          </p>
        </header>

        {/* Narrative Feature Layout Panels */}
        <div className="grid md:grid-cols-3 gap-8 pt-6">
          {/* Card Module 1 — Custom Value Proposition */}
          <motion.div
            className="p-8 rounded-[1.5rem] bg-neutral-50/60 border border-neutral-100 flex flex-col gap-4 group transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-neutral-100 hover:border-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-xs font-black tracking-widest text-main-red uppercase select-none">
              // Distinction
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
              {t("home.about.whatMakesUsDifferentTitle")}
            </h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              {t("home.about.whatMakesUsDifferentDesc")}
            </p>
          </motion.div>

          {/* Card Module 2 — Vision Framework */}
          <motion.div
            className="p-8 rounded-[1.5rem] bg-neutral-50/60 border border-neutral-100 flex flex-col gap-4 group transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-neutral-100 hover:border-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-xs font-black tracking-widest text-main-move uppercase select-none">
              // Horizon
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
              {t("home.about.visionTitle")}
            </h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              {t("home.about.visionDesc")}
            </p>
          </motion.div>

          {/* Card Module 3 — Core Mission Platform */}
          <motion.div
            className="p-8 rounded-[1.5rem] bg-neutral-50/60 border border-neutral-100 flex flex-col gap-4 group transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-neutral-100 hover:border-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-xs font-black tracking-widest text-main-green uppercase select-none">
              // Activation
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
              {t("home.about.missionTitle")}
            </h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              {t("home.about.missionDesc")}
            </p>
          </motion.div>
        </div>

        {/* Global Button Action Anchor Alignment wrapper */}
        <div className="text-center pt-8">
          <MainBtn text={t("home.about.cta")} />
        </div>
      </div>
    </section>
  );
};

export default AboutSignup;
