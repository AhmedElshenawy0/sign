import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuroraBackground } from "../ui/aurora-background";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-6 max-w-4xl mx-auto text-center z-20"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-400 dark:text-neutral-500 select-none">
          Get In Touch
        </span>

        <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] text-slate-900 dark:text-white uppercase max-w-3xl">
          {t("home.contact.headline")}
        </h2>

        <p className="font-medium text-base md:text-xl text-slate-500 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          {t("home.contact.subtext")}
        </p>

        <div className="pt-4">
          <button className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent dark:hover:bg-transparent dark:hover:text-white dark:hover:border-white/20">
            {t("home.contact.subtext")}
          </button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default Contact;
