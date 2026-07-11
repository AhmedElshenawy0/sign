import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaLightbulb,
  FaShieldAlt,
  FaHandshake,
  FaGem,
  FaLeaf,
  FaUsers,
  FaPenNib,
  FaFont,
  FaPalette,
  FaCommentDots,
  FaBook,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

const VALUE_ICONS = [
  FaLightbulb, // Innovation
  FaShieldAlt, // Integrity
  FaHandshake, // Collaboration
  FaGem, // Excellence
  FaLeaf, // Sustainability
  FaUsers, // Community
];

const VALUE_COUNT = 6;

const DELIVERABLES = [
  { key: "logo", icon: FaPenNib },
  { key: "typography", icon: FaFont },
  { key: "color", icon: FaPalette },
  { key: "voice", icon: FaCommentDots },
  { key: "guidelines", icon: FaBook },
  { key: "templates", icon: FaLayerGroup },
];

const accentCycle = [
  {
    text: "text-main-red",
    softBg: "bg-main-red/10",
    border: "border-main-red/15",
  },
  {
    text: "text-main-move",
    softBg: "bg-main-move/10",
    border: "border-main-move/15",
  },
  {
    text: "text-main-green",
    softBg: "bg-main-green/10",
    border: "border-main-green/15",
  },
];

const BrandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    // 1. Root container بدون ألوان صلبة لتمرير الخلفية الثابتة لجميع العناصر الشفافة
    <div
      className="relative min-h-screen text-white select-none"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 2. FIXED BACKDROP WINDOW: النافذة الثابتة الخلفية للصورة */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <motion.img
          src="/images/sign11.jpg"
          alt=""
          className="w-full h-full object-cover opacity-25 pointer-events-none"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        {/* تعميق تدريجي وظلال للخلفية */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/40 to-slate-950" /> */}
      </div>

      {/* 3. HERO LAYER (شفاف z-10) - النصوص ترتفع طبيعياً للأعلى */}
      <section className="h-screen w-full relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <motion.span
            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-green bg-main-green/10 px-4 py-1.5 rounded-full border border-main-green/20 select-none mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1 h-1 rounded-full bg-main-green" />
            {t("branding.hero.eyebrow")}
          </motion.span>

          <motion.h1
            className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6 text-white max-w-4xl leading-[1.05]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t("branding.hero.title")}
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("branding.hero.description")}
          </motion.p>

          {/* Quick credibility strip */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12 pt-8 border-t border-white/10 max-w-lg w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-main-green">
                8+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {t("branding.hero.statYears")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-main-move">
                120+
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {t("branding.hero.statBrands")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-black text-main-red">
                6
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {t("branding.hero.statValues")}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CONTENT PRESENTATION DECK (معتم z-20 يرتفع ليغطي خلفية الـ Fixed تماماً) */}
      <section className="relative z-20 bg-white text-slate-900 px-6 py-24 md:py-32 rounded-t-[2.5rem] md:rounded-t-[3.5rem] shadow-[-0px_-20px_50px_rgba(0,0,0,0.3)]">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-red bg-main-red/5 px-4 py-1.5 rounded-full border border-main-red/10 select-none">
            <span className="w-1 h-1 rounded-full bg-main-red" />
            {t("branding.coreValues.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
            {t("branding.coreValues.title")}
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
            {t("branding.coreValues.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.from({ length: VALUE_COUNT }).map((_, index) => {
            const accent = accentCycle[index % accentCycle.length];
            const Icon = VALUE_ICONS[index];
            return (
              <motion.div
                key={index}
                className={`relative p-8 rounded-[1.75rem] bg-neutral-50/60 border ${accent.border} flex flex-col gap-4 group transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/60 hover:-translate-y-1`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex items-center justify-center w-12 h-12 rounded-2xl ${accent.softBg} ${accent.text} text-lg`}
                  >
                    <Icon />
                  </span>
                  <span className="text-[11px] font-black text-slate-300 tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={`text-lg font-black uppercase tracking-tight text-slate-900 group-hover:${accent.text} transition-colors`}
                >
                  {t(`branding.coreValues.values.${index}.title`)}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {t(`branding.coreValues.values.${index}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Deliverables strip */}
        <div className="max-w-4xl mx-auto text-center mt-24 space-y-8">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
            {t("branding.deliverables.title")}
          </h3>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {DELIVERABLES.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.key}
                  className="inline-flex items-center gap-2.5 text-xs font-bold text-slate-600 bg-neutral-50 border border-neutral-100 rounded-full px-4 py-2.5"
                >
                  <Icon className="text-main-move" size={13} />
                  {t(`branding.deliverables.${item.key}`)}
                </span>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (شفاف z-10 يكشف الستار عن الخلفية مجدداً في نهاية الصفحة) */}
      <section className="relative z-10 py-24 px-6 text-center flex justify-center items-center overflow-hidden min-h-[65vh]">
        {/* توهج ضوئي خفيف فوق صورة الخلفية لمنع حدوث حدة بصرية */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-white/5 blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
          <motion.span
            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-slate-400 bg-neutral-900/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-neutral-800 select-none mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("branding.cta.eyebrow")}
          </motion.span>

          <motion.h4
            className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("branding.cta.title")}
          </motion.h4>

          <motion.p
            className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed font-medium text-sm md:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("branding.cta.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a
              href="/contact"
              className="group inline-flex items-center gap-3 bg-white hover:bg-neutral-100 text-slate-950 font-black uppercase tracking-widest text-xs py-4 px-10 rounded-full transition-all shadow-xl cursor-pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("branding.cta.button")}
              <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 text-slate-950" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrandingPage;
