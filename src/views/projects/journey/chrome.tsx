"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { groupIdForType, type Project } from "@/types/project";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-main-red via-main-move to-main-green"
      style={{ scaleX }}
    />
  );
}

export function JourneyShell({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const groupId = groupIdForType(project.type);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-black text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <ScrollProgress />
      <header className="pointer-events-none sticky top-0 z-40 flex items-start justify-between gap-4 px-6 py-6 md:px-12">
        <Link
          href="/projects"
          className="pointer-events-auto inline-flex rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 backdrop-blur-md transition hover:border-white hover:text-white"
        >
          {t("projects.journey.back")}
        </Link>
        <p className="max-w-[55%] text-end text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
          {t(`projects.groups.${groupId}.label`)}
          <span className="mx-2 text-main-green">·</span>
          {t(`projects.types.${project.type}`)}
        </p>
      </header>
      {children}
    </div>
  );
}

export function JourneyClose({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[56vh] flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t("projects.journey.eyebrow")}
      </motion.p>
      <motion.h1
        className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.title}
      </motion.h1>
      <motion.p
        className="mx-auto mb-10 max-w-xl text-base font-medium leading-relaxed text-white/70 md:text-lg"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.16 }}
      >
        {t(`projects.journey.lines.${project.type}`)}
      </motion.p>
      <Link
        href="/projects"
        className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 transition hover:border-white hover:text-white"
      >
        {t("projects.journey.back")}
      </Link>
    </section>
  );
}

export function TiltFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 140,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 140,
    damping: 18,
  });

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
      >
        <img src={src} alt={alt} className="w-full object-contain" />
      </motion.div>
    </div>
  );
}

export function CopyChapter({
  kicker,
  title,
  body,
  image,
  alt,
  reverse = false,
}: {
  kicker: string;
  title: string;
  body: string;
  image?: string;
  alt?: string;
  reverse?: boolean;
}) {
  return (
    <section
      className={`mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-main-red">
          {kicker}
        </p>
        <h2 className="mb-5 text-3xl font-black uppercase tracking-tight md:text-5xl">
          {title}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-white/70 md:text-lg">
          {body}
        </p>
      </motion.div>
      {image ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]"
        >
          <img src={image} alt={alt ?? title} className="w-full object-contain" />
        </motion.div>
      ) : null}
    </section>
  );
}
