import { motion } from "framer-motion";
import Contact from "../home/Contact";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaRocket, FaGlobeAfrica, FaAward } from "react-icons/fa";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    initial: {
      y: direction === "up" ? 40 : 0,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay },
    },
  };
};

const MILESTONES = [
  { key: "founded", icon: FaRocket, accent: "main-red" },
  { key: "reach", icon: FaGlobeAfrica, accent: "main-move" },
  { key: "recognition", icon: FaAward, accent: "main-green" },
];

const accentMap: Record<
  string,
  { text: string; softBg: string; border: string }
> = {
  "main-red": {
    text: "text-main-red",
    softBg: "bg-main-red/10",
    border: "border-main-red/15",
  },
  "main-move": {
    text: "text-main-move",
    softBg: "bg-main-move/10",
    border: "border-main-move/15",
  },
  "main-green": {
    text: "text-main-green",
    softBg: "bg-main-green/10",
    border: "border-main-green/15",
  },
};

const AboutContent = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <>
      {/* Founder Section */}
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="flex flex-col gap-16 md:gap-20 px-6 md:px-[160px] py-10 md:py-20 bg-neutral-50/40"
      >
        <motion.div
          className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-8 md:gap-12 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Text Section */}
          <motion.div
            className="flex flex-col flex-2 gap-6 py-6 md:py-14"
            variants={fadeIn("up", 0.1)}
          >
            <span className="inline-flex items-center gap-2 w-fit text-[10px] font-black tracking-[0.35em] uppercase text-main-red bg-main-red/5 px-4 py-1.5 rounded-full border border-main-red/10 select-none">
              <span className="w-1 h-1 rounded-full bg-main-red" />
              {t("about.content.eyebrow")}
            </span>

            <h1 className="font-black text-3xl md:text-4xl tracking-tight uppercase text-slate-900">
              {t("about.content.founderName")}
            </h1>
            <h3 className="font-bold text-sm tracking-[0.25em] uppercase text-slate-400">
              {t("about.content.founderJob")}
            </h3>
            <p className="leading-8 tracking-wide text-slate-600 font-medium whitespace-pre-line">
              {t("about.content.aboutFounder")}
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div className="flex-1 relative" variants={fadeIn("up", 0.3)}>
            <img
              src="/founder.PNG"
              alt={t("about.content.founderName")}
              className="h-full w-full object-cover rounded-[1.75rem] shadow-xl"
            />
          </motion.div>
        </motion.div>

        {/* Milestones Strip — real, translated markers instead of placeholder boxes */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {MILESTONES.map((milestone, index) => {
            const accent = accentMap[milestone.accent];
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.key}
                className={`flex flex-col items-center text-center gap-3 p-8 rounded-[1.5rem] bg-white border ${accent.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                variants={fadeIn("up", 0.4 + index * 0.1)}
              >
                <span
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl ${accent.softBg} ${accent.text} text-lg`}
                >
                  <Icon />
                </span>
                <span className="text-lg font-black text-slate-900">
                  {t(`about.milestones.${milestone.key}.value`)}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {t(`about.milestones.${milestone.key}.label`)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Contact />
    </>
  );
};

export default AboutContent;
