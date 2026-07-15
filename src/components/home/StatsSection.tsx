import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaBriefcase,
  FaUsers,
  FaBullhorn,
  FaSmileBeam,
  FaArrowUp,
  FaAward,
  FaGlobeAfrica,
  FaHeadset,
  FaChartLine,
} from "react-icons/fa";
import GridBg from "../global/GridBg";

const STATS = [
  {
    key: "experience",
    value: 8,
    suffix: "+",
    trend: "+2",
    accent: "main-red",
    icon: FaBriefcase,
    labelKey: "home.stats.experience",
    contextKey: "home.stats.experienceContext",
  },
  {
    key: "clients",
    value: 120,
    suffix: "+",
    trend: "+24",
    accent: "main-move",
    icon: FaUsers,
    labelKey: "home.stats.clients",
    contextKey: "home.stats.clientsContext",
  },
  {
    key: "campaigns",
    value: 350,
    suffix: "+",
    trend: "+56",
    accent: "main-green",
    icon: FaBullhorn,
    labelKey: "home.stats.campaigns",
    contextKey: "home.stats.campaignsContext",
  },
  {
    key: "satisfaction",
    value: 98,
    suffix: "%",
    trend: "+3",
    accent: "main-red",
    icon: FaSmileBeam,
    labelKey: "home.stats.satisfaction",
    contextKey: "home.stats.satisfactionContext",
  },
];

const HIGHLIGHTS = [
  { key: "award", icon: FaAward, labelKey: "home.stats.highlightAward" },
  { key: "reach", icon: FaGlobeAfrica, labelKey: "home.stats.highlightReach" },
  { key: "support", icon: FaHeadset, labelKey: "home.stats.highlightSupport" },
  { key: "data", icon: FaChartLine, labelKey: "home.stats.highlightData" },
];

const accentMap: Record<
  string,
  { text: string; bg: string; border: string; softBg: string }
> = {
  "main-red": {
    text: "text-main-red",
    bg: "bg-main-red",
    border: "border-main-red/15",
    softBg: "bg-main-red/10",
  },
  "main-move": {
    text: "text-main-move",
    bg: "bg-main-move",
    border: "border-main-move/15",
    softBg: "bg-main-move/10",
  },
  "main-green": {
    text: "text-main-green",
    bg: "bg-main-green",
    border: "border-main-green/15",
    softBg: "bg-main-green/10",
  },
};

// Isolated counter — animates its own number from 0 to target once in view
const Counter = ({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
};

const StatCard = ({
  stat,
  index,
  t,
}: {
  stat: (typeof STATS)[number];
  index: number;
  t: (key: string) => string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const accent = accentMap[stat.accent];
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className={`relative p-6 md:p-8 rounded-[1.5rem] bg-neutral-50/60 border ${accent.border} flex flex-col gap-4 group transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/60 hover:-translate-y-1`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex items-center justify-center w-11 h-11 rounded-2xl ${accent.softBg} ${accent.text} text-lg`}
        >
          <Icon />
        </span>
        <span
          className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${accent.text} ${accent.softBg} rounded-full px-2.5 py-1`}
        >
          <FaArrowUp size={9} />
          {stat.trend}
        </span>
      </div>

      <div className="text-center flex flex-col items-center gap-1.5">
        <span
          className={`text-4xl md:text-5xl font-black tracking-tight ${accent.text}`}
        >
          <Counter
            value={stat.value}
            suffix={stat.suffix}
            isInView={isInView}
          />
        </span>
        <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-slate-400">
          {t(stat.labelKey)}
        </span>
      </div>

      <p className="text-xs text-slate-500 text-center font-medium leading-relaxed border-t border-neutral-100 pt-3">
        {t(stat.contextKey)}
      </p>
    </motion.div>
  );
};

const StatsSection = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative bg-white text-slate-900 px-6 md:px-14 py-24 md:py-32 overflow-hidden"
    >
      <GridBg variant="light" />

      {/* Ambient corner glow — quiet texture, consistent with AboutSignup's ambient mark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-main-move/[0.05] via-main-red/[0.03] to-transparent blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto space-y-16">
        <header className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-move bg-main-move/5 px-4 py-1.5 rounded-full border border-main-move/10 select-none">
            <span className="w-1 h-1 rounded-full bg-main-move" />
            {t("home.stats.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
            {t("home.stats.title")}
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-lg mx-auto">
            {t("home.stats.subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <StatCard key={stat.key} stat={stat} index={index} t={t} />
          ))}
        </div>

        {/* Trust-badge strip — quick, scannable credibility markers below the headline numbers */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <span
                key={h.key}
                className="inline-flex items-center gap-2.5 text-xs font-bold text-slate-600 bg-neutral-50 border border-neutral-100 rounded-full px-4 py-2.5"
              >
                <Icon className="text-main-move" size={13} />
                {t(h.labelKey)}
              </span>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
