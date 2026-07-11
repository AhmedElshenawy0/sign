import { useEffect, useState } from "react";
import AboutContent from "../../components/about/AboutContent";
import AboutText from "../../components/about/AboutText";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="relative flex justify-center flex-col items-center h-screen overflow-hidden bg-black"
      >
        {/* Background Image */}
        <motion.img
          src="/images/sign8.jpg"
          alt="Who Are We Background"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Overlay — vertical gradient reads better than a flat tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black z-0" />

        <div className="z-10 px-6 flex flex-col items-center">
          <motion.span
            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-green bg-main-green/10 px-4 py-1.5 rounded-full border border-main-green/20 select-none mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1 h-1 rounded-full bg-main-green" />
            {t("about.hero.eyebrow")}
          </motion.span>

          <motion.h1
            className="uppercase text-center text-4xl md:text-7xl font-black tracking-tight text-white mb-4 max-w-4xl leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("about.hero.title")}
          </motion.h1>

          <motion.p
            className="text-center text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {t("about.hero.description")}
          </motion.p>

          {/* Credibility strip — same pattern as Branding's hero */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12 pt-8 border-t border-white/10 max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-main-green">
                8+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {t("about.hero.statYears")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-main-move">
                120+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {t("about.hero.statClients")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-main-red">
                350+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {t("about.hero.statCampaigns")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>
      <AboutText />
      <AboutContent />
    </>
  );
};

export default About;
