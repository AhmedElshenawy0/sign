"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Film,
  Image as ImageIcon,
  Layers3,
  Nfc,
  PlayCircle,
  Plus,
  Sparkles,
  Video,
} from "lucide-react";
import { ADMIN_COPY } from "@/lib/admin-copy";
import {
  PROJECT_TYPE_LABELS,
  SERVICE_GROUPS,
  SERVICE_GROUP_LABELS,
  groupIdForType,
  isVideoProjectType,
  type Project,
} from "@/types/project";

const GROUP_COLORS: Record<string, string> = {
  branding: "#552583",
  marketing: "#0e985d",
  photoVideo: "#e54411",
  nfc: "#c9a66b",
};

function CountUp({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {value}
    </motion.span>
  );
}

function weekAgoMs() {
  return Date.now() - 7 * 24 * 60 * 60 * 1000;
}

function formatDate(value: string) {
  const stamp = Date.parse(value);
  if (!Number.isFinite(stamp)) return "";
  return new Date(stamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Donut({
  slices,
  total,
}: {
  slices: { label: string; value: number; color: string }[];
  total: number;
}) {
  const size = 228;
  const stroke = 28;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeTotal = total || 1;
  let offset = 0;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[228px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90 h-full w-full">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        {slices.map((slice) => {
          const length = (slice.value / safeTotal) * circumference;
          const dashoffset = -offset;
          offset += length;
          return (
            <motion.circle
              key={slice.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={slice.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              strokeDasharray={`${length} ${circumference}`}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashoffset }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[34px] font-semibold leading-none text-white">{total}</p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          Total
        </p>
      </div>
    </div>
  );
}

export default function StatsDashboard({ items }: { items: Project[] }) {
  const copy = ADMIN_COPY.dashboard;
  const videos = items.filter((item) => isVideoProjectType(item.type)).length;
  const stills = items.length - videos;
  const nfc = items.filter((item) => groupIdForType(item.type) === "nfc").length;
  const recent = items.filter((item) => {
    const stamp = Date.parse(item.updated_at || item.created_at);
    return Number.isFinite(stamp) && stamp >= weekAgoMs();
  }).length;

  const groupCounts = useMemo(
    () =>
      SERVICE_GROUPS.map((group) => ({
        id: group.id,
        label:
          group.id === "photoVideo"
            ? "Photo & Video"
            : group.id === "nfc"
              ? "NFC"
              : SERVICE_GROUP_LABELS[group.id],
        value: items.filter((item) => groupIdForType(item.type) === group.id).length,
        color: GROUP_COLORS[group.id],
      })),
    [items],
  );
  const maxGroup = Math.max(1, ...groupCounts.map((group) => group.value));

  const latest = useMemo(
    () =>
      [...items]
        .sort((a, b) => {
          const aStamp = Date.parse(a.updated_at || a.created_at);
          const bStamp = Date.parse(b.updated_at || b.created_at);
          return (Number.isFinite(bStamp) ? bStamp : 0) - (Number.isFinite(aStamp) ? aStamp : 0);
        })
        .slice(0, 5),
    [items],
  );

  const donutSlices = [
    { label: copy.stills, value: stills, color: "#0e985d" },
    { label: copy.videos, value: videos, color: "#e54411" },
  ];

  const cards = [
    { key: "total", label: copy.total, value: items.length, icon: Layers3, accent: true },
    { key: "stills", label: copy.stills, value: stills, icon: ImageIcon, accent: false },
    { key: "videos", label: copy.videos, value: videos, icon: Film, accent: false },
    { key: "nfc", label: copy.nfc, value: nfc, icon: Nfc, accent: false },
    { key: "recent", label: copy.recent, value: recent, icon: Sparkles, accent: false },
  ] as const;

  const actions: {
    href: string;
    label: string;
    icon: typeof Plus;
    primary: boolean;
    external: boolean;
  }[] = [
    {
      href: "/admin/projects/new",
      label: copy.addProject,
      icon: Plus,
      primary: true,
      external: false,
    },
    {
      href: "/admin/intro",
      label: ADMIN_COPY.nav.intro,
      icon: PlayCircle,
      primary: false,
      external: false,
    },
    {
      href: "/admin/showreel",
      label: ADMIN_COPY.nav.showreel,
      icon: Video,
      primary: false,
      external: false,
    },
    {
      href: "/",
      label: ADMIN_COPY.nav.site,
      icon: ExternalLink,
      primary: false,
      external: true,
    },
  ];

  return (
    <motion.main
      className="relative mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-5 md:px-8 md:py-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <section className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1220]/80">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0e985d] to-transparent" />
        <div className="p-5 sm:p-6 md:px-8 md:py-7">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#0e985d]">
            {copy.statsKicker}
          </p>
          <h1 className="mt-2 max-w-xl text-[32px] font-semibold leading-[1.05] tracking-tight text-white md:text-[40px]">
            {copy.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-3.5 rounded-2xl border px-4 py-4 ${
                card.accent
                  ? "border-[#0e985d]/40 bg-[linear-gradient(180deg,rgba(14,152,93,0.16),rgba(12,18,32,0.9))]"
                  : "border-white/10 bg-[#0c1220]/80"
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#0e985d]">
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-slate-500">
                  {card.label}
                </p>
                <p className="mt-1 text-[26px] font-semibold leading-none tracking-tight text-white">
                  <CountUp value={card.value} />
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-5 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-[#0c1220]/80 p-4 sm:p-6"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#0e985d]">
            {copy.donutTitle}
          </p>
          <p className="mt-1.5 text-sm text-slate-500">{copy.donutHint}</p>
          <div className="mt-6">
            {items.length === 0 ? (
              <p className="py-16 text-center text-sm text-slate-500">{copy.mixEmpty}</p>
            ) : (
              <Donut slices={donutSlices} total={items.length} />
            )}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {donutSlices.map((slice) => (
              <div key={slice.label} className="flex items-center gap-2 text-sm text-slate-400">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: slice.color }}
                />
                <span>
                  {slice.label}{" "}
                  <span className="tabular-nums text-white">{slice.value}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-[#0c1220]/80 p-4 sm:p-6"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#0e985d]">
            {copy.barTitle}
          </p>
          <p className="mt-1.5 text-sm text-slate-500">{copy.barHint}</p>
          {items.length === 0 ? (
            <p className="py-16 text-center text-sm text-slate-500">{copy.mixEmpty}</p>
          ) : (
            <div className="mt-8 flex h-64 items-end gap-3 sm:gap-5">
              {groupCounts.map((group, index) => {
                const pct = Math.max(group.value ? 10 : 0, (group.value / maxGroup) * 100);
                return (
                  <div
                    key={group.id}
                    className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                  >
                    <span className="text-sm font-semibold tabular-nums text-white">
                      {group.value}
                    </span>
                    <div className="flex w-full flex-1 items-end justify-center">
                      <motion.div
                        className="w-[70%] max-w-[58px] rounded-t-xl"
                        style={{
                          background: `linear-gradient(180deg, ${group.color}, ${group.color}88)`,
                          boxShadow: `0 12px 28px ${group.color}33`,
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${pct}%` }}
                        transition={{
                          delay: 0.2 + index * 0.08,
                          duration: 0.7,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                    <p className="h-10 px-1 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-slate-500">
                      {group.label}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-[#0c1220]/80 p-4 sm:p-6"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#0e985d]">
                {copy.latestTitle}
              </p>
              <p className="mt-1.5 text-sm text-slate-500">{copy.latestHint}</p>
            </div>
            <Link
              href="/admin/projects"
              className="shrink-0 text-[12px] font-semibold text-[#86efac] transition hover:text-white"
            >
              {copy.viewAll}
            </Link>
          </div>
          {latest.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">{copy.latestEmpty}</p>
          ) : (
            <ul className="divide-y divide-white/10">
              {latest.map((item) => {
                const video = isVideoProjectType(item.type);
                return (
                  <li key={item.id}>
                    <Link
                      href={`/admin/projects/${item.id}`}
                      className="flex items-center gap-3 py-3 transition hover:bg-white/[0.03]"
                    >
                      <div className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded-xl bg-slate-950">
                        {video ? (
                          <video
                            src={item.media_url}
                            poster={item.poster_url ?? undefined}
                            className="h-full w-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-semibold tracking-tight text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 truncate text-[12px] text-slate-500">
                          {PROJECT_TYPE_LABELS[item.type]}
                          <span className="mx-1.5 text-white/20">·</span>
                          {formatDate(item.updated_at || item.created_at)}
                        </p>
                      </div>
                      <span className="hidden text-[12px] font-semibold text-slate-400 sm:inline">
                        {copy.edit}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-[#0c1220]/80 p-4 sm:p-6"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[#0e985d]">
            {copy.quickActions}
          </p>
          <p className="mt-1.5 text-sm text-slate-500">{copy.quickActionsHint}</p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  className={`flex min-h-[96px] flex-col items-start justify-between rounded-2xl border p-3.5 transition ${
                    action.primary
                      ? "border-[#0e985d]/45 bg-[#0e985d] text-white shadow-[0_10px_24px_rgba(14,152,93,0.22)] hover:bg-[#12b06c]"
                      : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-[#0e985d]/40 hover:bg-[#0e985d]/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span className="text-[13px] font-semibold leading-tight tracking-tight">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.section>
      </div>
    </motion.main>
  );
}
