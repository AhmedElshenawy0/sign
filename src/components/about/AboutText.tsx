import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const AboutText = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="relative text-slate-900 bg-white px-6 py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient corner glow — consistent with the site's quiet texture marks */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[26rem] h-[26rem] rounded-full bg-gradient-to-br from-main-red/[0.04] via-main-move/[0.03] to-transparent blur-3xl"
      />

      <motion.div
        className="relative max-w-3xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-move bg-main-move/5 px-4 py-1.5 rounded-full border border-main-move/10 select-none">
          <span className="w-1 h-1 rounded-full bg-main-move" />
          {t("about.text.eyebrow")}
        </span>

        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900">
          {t("about.text.title")}
        </h2>

        <p className="text-[15px] md:text-lg leading-8 tracking-wide text-slate-600 font-medium whitespace-pre-line text-left">
          {t("about.text.description")}
        </p>
      </motion.div>
    </div>
  );
};

export default AboutText;
