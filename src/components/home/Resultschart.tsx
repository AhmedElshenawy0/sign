import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GridBg from "../global/GridBg";

// Growth in completed campaigns per year — replace with real numbers when available
const GROWTH_DATA = [
  { year: "2020", value: 22 },
  { year: "2021", value: 40 },
  { year: "2022", value: 65 },
  { year: "2023", value: 98 },
  { year: "2024", value: 140 },
  { year: "2025", value: 190 },
];

// Share of work by service line — replace with real numbers when available
const SPLIT_DATA = [
  {
    key: "social",
    value: 38,
    color: "var(--color-main-red)",
    accent: "main-red",
  },
  {
    key: "branding",
    value: 27,
    color: "var(--color-main-move)",
    accent: "main-move",
  },
  {
    key: "production",
    value: 22,
    color: "var(--color-main-green)",
    accent: "main-green",
  },
  { key: "ads", value: 13, color: "#94a3b8", accent: "slate-400" },
];

// Core capability scores — replace with real numbers when available
const SKILL_DATA = [
  { key: "strategy", value: 96, accent: "main-red" },
  { key: "creative", value: 92, accent: "main-move" },
  { key: "production", value: 88, accent: "main-green" },
  { key: "growth", value: 90, accent: "main-red" },
];

const CHART_HEIGHT = 220;
const MAX_VALUE = Math.max(...GROWTH_DATA.map((d) => d.value));

const accentTextMap: Record<string, string> = {
  "main-red": "text-main-red",
  "main-move": "text-main-move",
  "main-green": "text-main-green",
  "slate-400": "text-slate-400",
};

const accentBgMap: Record<string, string> = {
  "main-red": "bg-main-red",
  "main-move": "bg-main-move",
  "main-green": "bg-main-green",
  "slate-400": "bg-slate-400",
};

// Simple donut chart built from stacked SVG circle strokes — no charting library required
const DonutChart = ({ isArabic }: { isArabic: boolean }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-[200px] h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="24"
          />
          {SPLIT_DATA.map((slice, index) => {
            const dash = (slice.value / 100) * circumference;
            const offset = circumference - (cumulative / 100) * circumference;
            cumulative += slice.value;
            return (
              <motion.circle
                key={slice.key}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={slice.color}
                strokeWidth="24"
                strokeDasharray={`${dash} ${circumference - dash}`}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: offset }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                strokeLinecap="butt"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900">100%</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Coverage
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-xs">
        {SPLIT_DATA.map((slice) => (
          <div key={slice.key} className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${accentBgMap[slice.accent]}`}
            />
            <span className="text-xs font-semibold text-slate-600 truncate">
              {slice.key === "social" && "Social Media"}
              {slice.key === "branding" && "Branding"}
              {slice.key === "production" && "Production"}
              {slice.key === "ads" && "Paid Ads"}
            </span>
            <span
              className={`ms-auto text-xs font-black ${accentTextMap[slice.accent]}`}
            >
              {slice.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillBars = () => (
  <div className="flex flex-col justify-center gap-6 w-full max-w-sm">
    {SKILL_DATA.map((skill, index) => (
      <div key={skill.key} className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black uppercase tracking-wide text-slate-900">
            {skill.key === "strategy" && "Strategy"}
            {skill.key === "creative" && "Creative"}
            {skill.key === "production" && "Production"}
            {skill.key === "growth" && "Growth"}
          </span>
          <span className={`text-sm font-black ${accentTextMap[skill.accent]}`}>
            {skill.value}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${accentBgMap[skill.accent]}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.value}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

const ResultsChart = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative bg-white text-slate-900 px-6 md:px-14 py-24 md:py-32"
    >
      <GridBg variant="light" />
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-red bg-main-red/5 px-4 py-1.5 rounded-full border border-main-red/10 select-none">
            <span className="w-1 h-1 rounded-full bg-main-red" />
            {t("home.chart.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
            {t("home.chart.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
            {t("home.chart.description")}
          </p>
        </header>
        {/* Primary chart: year-over-year growth, full width */}
        <motion.div
          className="relative bg-neutral-50/60 border border-neutral-100 rounded-[1.75rem] p-8 md:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
              {t("home.chart.growthTitle")}
            </h3>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              2020 — 2025
            </span>
          </div>

          {/* Bars grow from baseline on scroll-into-view; direction-agnostic since it's a time series read left-to-right regardless of page direction */}
          <div
            className="flex items-end justify-between gap-3 md:gap-6"
            style={{ height: CHART_HEIGHT }}
            dir="ltr"
          >
            {GROWTH_DATA.map((point, index) => {
              const heightPct = (point.value / MAX_VALUE) * 100;
              return (
                <div
                  key={point.year}
                  className="flex-1 flex flex-col items-center justify-end h-full gap-3"
                >
                  <span className="text-xs md:text-sm font-black text-slate-900">
                    {point.value}
                  </span>
                  <motion.div
                    className="w-full max-w-[52px] rounded-t-xl bg-gradient-to-t from-main-red via-main-move to-main-green"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {point.year}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Secondary charts: service split (donut) + capability scores (bars), side by side */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="bg-neutral-50/60 border border-neutral-100 z-50 rounded-[1.75rem] p-8 md:p-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 self-start">
              {t("home.chart.splitTitle")}
            </h3>
            <DonutChart isArabic={isArabic} />
          </motion.div>

          <motion.div
            className="bg-neutral-50/60 border z-50 border-neutral-100 rounded-[1.75rem] p-8 md:p-10 flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
              {t("home.chart.skillsTitle")}
            </h3>
            <div className="flex-1 flex items-center">
              <SkillBars />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsChart;
