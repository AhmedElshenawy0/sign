import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import GridBg from "../global/GridBg";

const GROWTH_DATA = [
  { year: "2020", value: 22 },
  { year: "2021", value: 40 },
  { year: "2022", value: 65 },
  { year: "2023", value: 98 },
  { year: "2024", value: 140 },
  { year: "2025", value: 190 },
];

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
  { key: "ads", value: 13, color: "#64748b", accent: "slate-400" },
];

const MAX_VALUE = Math.max(...GROWTH_DATA.map((d) => d.value));

const accent = {
  "main-red": {
    text: "text-main-red",
    bar: "from-[#e54411] to-[#fb7185]",
    hex: "#e54411",
  },
  "main-move": {
    text: "text-main-move",
    bar: "from-[#552583] to-[#8b5cf6]",
    hex: "#552583",
  },
  "main-green": {
    text: "text-main-green",
    bar: "from-[#08563a] to-[#0e985d]",
    hex: "#0e985d",
  },
  "slate-400": {
    text: "text-slate-500",
    bar: "from-slate-400 to-slate-500",
    hex: "#64748b",
  },
} as const;

type AccentName = keyof typeof accent;

const SKILL_DATA: { key: string; value: number; accent: AccentName }[] = [
  { key: "strategy", value: 96, accent: "main-red" },
  { key: "creative", value: 92, accent: "main-move" },
  { key: "production", value: 88, accent: "main-green" },
  { key: "growth", value: 90, accent: "main-red" },
];

const cardClass =
  "relative bg-white border border-[#e8edf2] rounded-[28px] p-5 md:p-7 shadow-[0_1px_1px_rgba(15,23,42,0.03),0_10px_28px_rgba(15,23,42,0.06)]";

function polar(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const a = polar(cx, cy, r, start);
  const b = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

function curve(points: Array<{ x: number; y: number }>) {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    d += ` C ${mx} ${p0.y} ${mx} ${p1.y} ${p1.x} ${p1.y}`;
  }
  return d;
}

const Tooltip = ({
  title,
  value,
  hint,
  color,
}: {
  title: string;
  value: string;
  hint: string;
  color: string;
}) => (
  <div className="pointer-events-none min-w-[148px] rounded-[14px] bg-[#0d1b2a] px-3.5 py-2.5 text-white shadow-[0_12px_30px_rgba(13,27,42,0.28)]">
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-[3px]" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-semibold tracking-wide text-white/70">
        {title}
      </span>
    </div>
    <div className="mt-1 text-[22px] font-black leading-none tracking-tight">
      {value}
    </div>
    <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
      {hint}
    </div>
  </div>
);

const DonutChart = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);

  const size = 220;
  const cx = 110;
  const cy = 110;
  const radius = 78;
  const gap = 9.5;
  const stroke = 28;

  let cursor = 0;
  const slices = SPLIT_DATA.map((slice) => {
    const sweep = (slice.value / 100) * 360;
    const start = cursor + gap / 2;
    const end = cursor + sweep - gap / 2;
    cursor += sweep;
    return { ...slice, start, end };
  });

  const current = SPLIT_DATA.find((s) => s.key === active);

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
        onMouseLeave={() => setActive(null)}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="#eef2f6"
            strokeWidth={stroke}
          />
          {slices.map((slice) => {
            if (slice.end <= slice.start) return null;
            const isOn = active === null || active === slice.key;
            return (
              <g key={slice.key}>
                <path
                  d={arc(cx, cy, radius, slice.start, slice.end)}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={active === slice.key ? stroke + 4 : stroke}
                  strokeLinecap="round"
                  className="origin-center transition-[stroke-width,opacity] duration-300"
                  style={{ opacity: isOn ? 1 : 0.18 }}
                />
                <path
                  d={arc(cx, cy, radius, slice.start, slice.end)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={42}
                  strokeLinecap="round"
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(slice.key)}
                  onFocus={() => setActive(slice.key)}
                  tabIndex={0}
                />
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[36px] font-black leading-none tracking-[-0.04em] text-slate-900">
            {current ? `${current.value}%` : "100%"}
          </span>
          <span className="mt-2 max-w-[128px] text-[11px] font-semibold uppercase leading-tight tracking-[0.16em] text-slate-400">
            {current
              ? t(`home.chart.split.${current.key}`)
              : t("home.chart.coverage")}
          </span>
          {current ? (
            <span className="mt-1 text-[10px] font-medium tracking-wide text-slate-300">
              {t("home.chart.hoverShare")}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-2">
        {SPLIT_DATA.map((slice) => {
          const on = active === slice.key;
          return (
            <button
              key={slice.key}
              type="button"
              onMouseEnter={() => setActive(slice.key)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(slice.key)}
              onBlur={() => setActive(null)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 ${
                on
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span
                className="h-2 w-2 rounded-[3px]"
                style={{ backgroundColor: on ? "#fff" : slice.color }}
              />
              <span className="text-[12px] font-semibold">
                {t(`home.chart.split.${slice.key}`)}
              </span>
              <span className={`text-[12px] font-black ${on ? "text-white" : ""}`}>
                {slice.value}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const GrowthChart = () => {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState<number | null>(null);

  const vbW = 840;
  const vbH = 260;
  const top = 20;
  const chartBottom = 228;
  const trackH = chartBottom - top;
  const colW = vbW / GROWTH_DATA.length;
  const barW = 34;

  const layout = useMemo(
    () =>
      GROWTH_DATA.map((point, index) => {
        const height = (point.value / MAX_VALUE) * trackH;
        const x = index * colW + (colW - barW) / 2;
        const y = chartBottom - height;
        const cx = index * colW + colW / 2;
        return { ...point, index, height, x, y, cx };
      }),
    [colW, trackH],
  );

  const line = curve(layout.map((p) => ({ x: p.cx, y: p.y })));
  const area = `${line} L ${layout[layout.length - 1].cx} ${chartBottom} L ${layout[0].cx} ${chartBottom} Z`;
  const active = hovered !== null ? layout[hovered] : null;

  return (
    <div className="relative" dir="ltr" onMouseLeave={() => setHovered(null)}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="h-auto w-full"
        role="img"
        aria-label={t("home.chart.growthTitle")}
      >
        <defs>
          <linearGradient id="growthBar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#0e985d" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1b2a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0d1b2a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {layout.map((point) => (
          <rect
            key={`track-${point.year}`}
            x={point.x}
            y={top}
            width={barW}
            height={trackH}
            rx={barW / 2}
            fill="#eef2f6"
          />
        ))}

        <path d={area} fill="url(#growthArea)" />

        {layout.map((point) => (
          <motion.rect
            key={`bar-${point.year}`}
            x={point.x}
            width={barW}
            rx={barW / 2}
            fill="url(#growthBar)"
            initial={{ height: 0, y: chartBottom }}
            whileInView={{ height: point.height, y: point.y }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: point.index * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              filter:
                hovered === point.index
                  ? "brightness(1.08)"
                  : hovered === null
                    ? "none"
                    : "saturate(0.55) brightness(1.05)",
            }}
          />
        ))}

        <motion.path
          d={line}
          fill="none"
          stroke="#0d1b2a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />

        {layout.map((point) => {
          const on = hovered === point.index;
          return (
            <circle
              key={`dot-${point.year}`}
              cx={point.cx}
              cy={point.y}
              r={on ? 7 : 5.5}
              fill="#fff"
              stroke="#0d1b2a"
              strokeWidth={on ? 3 : 2.5}
            />
          );
        })}

        {layout.map((point) => (
          <text
            key={`year-${point.year}`}
            x={point.cx}
            y={252}
            textAnchor="middle"
            fill={hovered === point.index ? "#0d1b2a" : "#94a3b8"}
            fontSize="13"
            fontWeight="700"
            letterSpacing="0.08em"
            fontFamily="Montserrat, Cairo, sans-serif"
          >
            {point.year}
          </text>
        ))}

        {layout.map((point) => (
          <rect
            key={`hit-${point.year}`}
            x={point.index * colW}
            y={0}
            width={colW}
            height={vbH}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHovered(point.index)}
            onFocus={() => setHovered(point.index)}
            tabIndex={0}
          />
        ))}
      </svg>

      {active && (
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${((active.index + 0.5) / GROWTH_DATA.length) * 100}%`,
            top: `${(active.y / vbH) * 100}%`,
            marginTop: -14,
          }}
        >
          <Tooltip
            title={active.year}
            value={String(active.value)}
            hint={t("home.chart.hoverCampaigns")}
            color="#0e985d"
          />
        </div>
      )}
    </div>
  );
};

const SkillBars = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex w-full flex-col justify-center gap-1">
      {SKILL_DATA.map((skill, index) => {
        const on = active === skill.key;
        const tone = accent[skill.accent as keyof typeof accent];
        return (
          <div
            key={skill.key}
            className={`relative rounded-[18px] px-3 py-2.5 transition-colors duration-200 ${
              on ? "bg-slate-50" : "hover:bg-slate-50/70"
            }`}
            onMouseEnter={() => setActive(skill.key)}
            onMouseLeave={() => setActive(null)}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-900">
                {t(`home.chart.skills.${skill.key}`)}
              </span>
              <span className={`text-[15px] font-black tabular-nums ${tone.text}`}>
                {skill.value}%
              </span>
            </div>
            <div className="relative h-[10px] overflow-hidden rounded-full bg-[#eef2f6]">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${tone.bar}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.value}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.85,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>

            {on && (
              <div className="absolute right-3 top-0 z-20 hidden -translate-y-[calc(100%+8px)] sm:block">
                <Tooltip
                  title={t(`home.chart.skills.${skill.key}`)}
                  value={`${skill.value}`}
                  hint={t("home.chart.hoverScore")}
                  color={tone.hex}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ResultsChart = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language.startsWith("ar"));
  }, [i18n.language]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative bg-[#f4f6f8] px-6 py-14 text-slate-900 md:px-14 md:py-20"
    >
      <GridBg variant="light" />
      <div className="relative mx-auto max-w-6xl space-y-8">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-main-red/10 bg-main-red/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.35em] text-main-red select-none">
            <span className="h-1 w-1 rounded-full bg-main-red" />
            {t("home.chart.eyebrow")}
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">
            {t("home.chart.title")}
          </h2>
          <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-slate-500 md:text-lg">
            {t("home.chart.description")}
          </p>
        </header>

        <motion.div
          className={cardClass}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <h3 className="text-[17px] font-black uppercase tracking-tight text-slate-900">
              {t("home.chart.growthTitle")}
            </h3>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              2020 — 2025
            </span>
          </div>
          <GrowthChart />
        </motion.div>

        <div className="grid items-stretch gap-5 md:grid-cols-2">
          <motion.div
            className={`${cardClass} flex flex-col`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h3 className="mb-4 text-[17px] font-black uppercase tracking-tight text-slate-900">
              {t("home.chart.splitTitle")}
            </h3>
            <div className="flex flex-1 items-center">
              <DonutChart />
            </div>
          </motion.div>

          <motion.div
            className={`${cardClass} flex flex-col`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <h3 className="mb-2 text-[17px] font-black uppercase tracking-tight text-slate-900">
              {t("home.chart.skillsTitle")}
            </h3>
            <div className="flex flex-1 items-center">
              <SkillBars />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResultsChart;
