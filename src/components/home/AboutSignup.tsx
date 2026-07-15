import MainBtn from "../global/MainBtn";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import NoisyBg from "../global/NoisyBg";
import GridBg from "../global/GridBg";

const PANELS = [
  {
    key: "different",
    eyebrow: "01",
    label: "Distinction",
    fig: "FIG. 01 — BASELINE",
    accent: "main-red",
    // path height: lower number = higher on the curve
    y: 64,
    titleKey: "home.about.whatMakesUsDifferentTitle",
    descKey: "home.about.whatMakesUsDifferentDesc",
  },
  {
    key: "vision",
    eyebrow: "02",
    label: "Horizon",
    fig: "FIG. 02 — MIDPOINT",
    accent: "main-move",
    y: 34,
    titleKey: "home.about.visionTitle",
    descKey: "home.about.visionDesc",
  },
  {
    key: "mission",
    eyebrow: "03",
    label: "Activation",
    fig: "FIG. 03 — APEX",
    accent: "main-green",
    y: 10,
    titleKey: "home.about.missionTitle",
    descKey: "home.about.missionDesc",
  },
];

const accentMap: Record<
  string,
  { text: string; bg: string; border: string; fill: string; ring: string }
> = {
  "main-red": {
    text: "text-main-red",
    bg: "bg-main-red",
    border: "border-main-red/25",
    fill: "#e5484d",
    ring: "group-hover:ring-main-red/15",
  },
  "main-move": {
    text: "text-main-move",
    bg: "bg-main-move",
    border: "border-main-move/25",
    fill: "#6e56cf",
    ring: "group-hover:ring-main-move/15",
  },
  "main-green": {
    text: "text-main-green",
    bg: "bg-main-green",
    border: "border-main-green/25",
    fill: "#30a46c",
    ring: "group-hover:ring-main-green/15",
  },
};

// Builds a smooth ascending curve through the three panel coordinates.
const buildPath = (points: { x: number; y: number }[]) => {
  const [p0, p1, p2] = points;
  return `M ${p0.x} ${p0.y} Q ${(p0.x + p1.x) / 2} ${p0.y}, ${p1.x} ${p1.y} T ${p2.x} ${p2.y}`;
};

const AboutSignup = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const curvePoints = [
    { x: 8, y: PANELS[0].y },
    { x: 50, y: PANELS[1].y },
    { x: 92, y: PANELS[2].y },
  ];
  const curveD = buildPath(curvePoints);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      ref={sectionRef}
      className="relative bg-white text-slate-900 px-6 md:px-14 py-28 md:py-40  overflow-hidden"
    >
      <GridBg variant="light" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 md:inset-10 hidden md:block"
      >
        <span className="absolute top-0 left-0 w-6 h-6 border-t border-l border-slate-300" />
        <span className="absolute top-0 right-0 w-6 h-6 border-t border-r border-slate-300" />
        <span className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-slate-300" />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-slate-300" />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute top-10 right-12 hidden md:block text-[10px] font-mono tracking-widest text-slate-300 select-none"
      >
        SEC. 02 / 03
      </span>

      {/* Ambient corner mark — quiet texture, not decoration for its own sake */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-main-red/[0.04] via-main-move/[0.03] to-transparent blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto space-y-24">
        {/* Header Layout Grid Block */}
        <header className="max-w-3xl mx-auto text-center space-y-5">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-red bg-main-red/5 px-4 py-1.5 rounded-full border border-main-red/10 select-none">
            <span className="w-1 h-1 rounded-full bg-main-red" />
            Corporate Blueprint
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] uppercase text-slate-900">
            {t("home.about.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {t("home.about.description")}
          </p>
        </header>

        {/* Narrative Feature Layout Panels */}
        <div className="relative">
          {/* Signature: an ascending horizon line tracing Distinction → Horizon → Activation.
              The rise is literal — panel two is even labeled "Horizon" — so the curve
              encodes the same arc the copy already describes, rather than just linking dots. */}
          <div className="hidden md:block absolute inset-x-0 -top-2 h-20 pointer-events-none">
            <svg
              viewBox="0 0 100 74"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              <path
                d={curveD}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={curveD}
                fill="none"
                stroke="url(#riseGradient)"
                strokeWidth="1"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  pathLength: prefersReducedMotion ? 1 : pathLength,
                }}
              />
              <defs>
                <linearGradient id="riseGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e5484d" />
                  <stop offset="50%" stopColor="#6e56cf" />
                  <stop offset="100%" stopColor="#30a46c" />
                </linearGradient>
              </defs>
              {curvePoints.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="1.4"
                  fill={accentMap[PANELS[i].accent].fill}
                  stroke="white"
                  strokeWidth="0.8"
                />
              ))}
            </svg>
          </div>

          {/* Mobile echo: a quiet vertical rise instead of the horizontal curve */}
          <div
            aria-hidden
            className="md:hidden absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-main-red/25 via-main-move/25 to-main-green/25"
          />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {PANELS.map((panel, index) => {
              const accent = accentMap[panel.accent];
              return (
                <motion.div
                  key={panel.key}
                  className={`relative pl-8 pr-7 py-8 rounded-xl bg-neutral-50/60 border border-neutral-100 flex flex-col gap-4 group transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/60 hover:border-transparent hover:-translate-y-1 ring-1 ring-transparent ${accent.ring}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Accent bar replaces the filled circle chip — reads as a
                      technical reference edge rather than a decorative badge */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-6 bottom-6 w-[3px] rounded-full ${accent.bg}`}
                  />

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono tracking-[0.2em] uppercase ${accent.text} select-none`}
                    >
                      {panel.fig}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 select-none">
                      {panel.eyebrow}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-[11px] font-black tracking-[0.3em] uppercase ${accent.text} select-none`}
                    >
                      {panel.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 leading-snug">
                    {t(panel.titleKey)}
                  </h3>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    {t(panel.descKey)}
                  </p>

                  {/* Quiet directional cue, appears on hover/focus */}
                  <div
                    className={`mt-auto pt-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${accent.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    <span className={isArabic ? "rotate-180" : ""}>→</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global Button Action Anchor Alignment wrapper */}
        <div className="text-center pt-4">
          <MainBtn text={t("home.about.cta")} />
        </div>
      </div>
    </section>
  );
};

export default AboutSignup;
