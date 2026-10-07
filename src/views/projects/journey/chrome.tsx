"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { copyLine, stillCaption } from "@/lib/journey-copy";
import { groupIdForType, type Project, type ProjectGalleryItem } from "@/types/project";

const EASE = [0.16, 1, 0.3, 1] as const;

export function useHeroScroll(target: RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.72]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], reduce ? [1, 1] : [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 80]);
  return { scale, opacity, y };
}

export function projectLine(project: Project, t: (key: string) => string) {
  const story = project.story?.trim();
  return story || t(`projects.journey.lines.${project.type}`);
}

export function roleLabel(
  item: Pick<ProjectGalleryItem, "role"> | undefined,
  t: (key: string, options?: { defaultValue?: string }) => string,
  fallback = "",
) {
  if (item?.role) {
    return t(`projects.journey.roles.${item.role}`, {
      defaultValue: item.role.replace(/_/g, " "),
    });
  }
  return fallback;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-main-red via-main-move to-main-green"
      style={{ scaleX }}
    />
  );
}

export function frameLabel(
  item: Pick<ProjectGalleryItem, "caption" | "role"> | undefined,
  t: (key: string, options?: { defaultValue?: string }) => string,
  fallback = "",
) {
  if (item?.caption?.trim()) return item.caption.trim();
  return roleLabel(item, t, fallback);
}

export function JourneyIntro({
  project,
  groupLabel,
  typeLabel,
  onOpen,
  onDone,
}: {
  project: Project;
  groupLabel: string;
  typeLabel: string;
  onOpen: () => void;
  onDone: () => void;
}) {
  const opened = useRef(false);

  useEffect(() => {
    const open = window.setTimeout(() => {
      if (opened.current) return;
      opened.current = true;
      onOpen();
    }, 1450);
    return () => window.clearTimeout(open);
  }, [onOpen]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#05070c]"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "-101%" }}
        transition={{ duration: 0.78, ease: EASE }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#05070c]"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        exit={{ x: "101%" }}
        transition={{ duration: 0.78, ease: EASE }}
        onAnimationComplete={(definition) => {
          if (definition === "exit") onDone();
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col items-center justify-center px-6 text-center">
        <motion.span
          className="mb-7 h-px w-10 bg-main-green"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        />
        <motion.p
          className="mb-5 text-[10px] font-black uppercase tracking-[0.38em] text-main-green"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
        >
          {groupLabel}
          <span className="mx-2 text-white/35">·</span>
          {typeLabel}
        </motion.p>
        <motion.h2
          className="max-w-4xl text-4xl font-black uppercase tracking-tight md:text-6xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ delay: 0.34, duration: 0.7, ease: EASE }}
        >
          {project.title}
        </motion.h2>
      </div>
    </motion.div>
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
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(() => Boolean(reduce));
  const [intro, setIntro] = useState(() => !reduce);
  const openPage = useCallback(() => {
    setReady(true);
    setIntro(false);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden bg-[#05070c] text-white ${
        ready ? "" : "h-screen overflow-hidden"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(14,152,93,0.12),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(232,80,91,0.08),transparent_38%)]" />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.09]"
        style={{ backgroundImage: "url('/images/noisy3.png')" }}
      />
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
      <motion.div
        className="relative z-[1]"
        initial={false}
        animate={
          ready || reduce
            ? { opacity: 1, filter: "blur(0px)" }
            : { opacity: 0, filter: "blur(12px)" }
        }
        transition={{ duration: 0.75, ease: EASE }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {intro ? (
          <JourneyIntro
            key="journey-intro"
            project={project}
            groupLabel={t(`projects.groups.${groupId}.label`)}
            typeLabel={t(`projects.types.${project.type}`)}
            onOpen={openPage}
            onDone={openPage}
          />
        ) : null}
      </AnimatePresence>
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
        transition={{ delay: 0.08, duration: 0.6, ease: EASE }}
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
        {projectLine(project, t)}
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

export function isJourneyVideo(src?: string) {
  if (!src) return false;
  return (
    /\.(mp4|webm|ogg|mov)(\?|$)/i.test(src) ||
    (/cdn\.sanity\.io\/files\//.test(src) && !/cdn\.sanity\.io\/images\//.test(src))
  );
}

export function JourneyMedia({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (isJourneyVideo(src)) {
    return (
      <video
        src={src}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
      />
    );
  }
  return <img src={src} alt={alt} className={className} />;
}

export function RevealMedia({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.05, ease: EASE }}
      >
        <JourneyMedia src={src} alt={alt} className={className} />
      </motion.div>
    </div>
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
  const reduce = useReducedMotion();
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
    if (reduce) return;
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
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
      >
        <RevealMedia src={src} alt={alt} className="w-full object-contain" />
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
  caption,
  reverse = false,
}: {
  kicker: string;
  title: string;
  body: string;
  image?: string;
  alt?: string;
  caption?: string;
  reverse?: boolean;
}) {
  return (
    <section
      className={`mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-16 md:px-12 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <motion.p
          className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-main-green"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {kicker}
        </motion.p>
        <motion.h2
          className="mb-5 text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06, duration: 0.55, ease: EASE }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="max-w-md text-base leading-relaxed text-white/70 md:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.55, ease: EASE }}
        >
          {body}
        </motion.p>
      </motion.div>
      {image ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            <RevealMedia src={image} alt={alt ?? title} className="w-full object-contain" />
          </div>
          {caption ? (
            <p className="mt-4 text-sm leading-relaxed text-white/55">{caption}</p>
          ) : null}
        </motion.div>
      ) : null}
    </section>
  );
}

export function FrameChapter({
  item,
  index,
  fallbackLabel,
}: {
  item: ProjectGalleryItem;
  index: number;
  fallbackLabel?: string;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const defaultKicker = roleLabel(item, t, fallbackLabel ?? "");
  const kicker = copyLine(item.kicker, lang, defaultKicker);
  const headline = copyLine(item.title, lang, "");
  const caption = stillCaption(item, lang, "");
  const number = String(index + 1).padStart(2, "0");

  return (
    <section className="relative mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-6 py-20">
      <span className="pointer-events-none absolute top-10 select-none text-[22vw] font-black leading-none text-white/[0.035] md:text-[8rem]">
        {number}
      </span>
      <motion.p
        className="relative mb-6 text-[10px] font-black uppercase tracking-[0.32em] text-main-green"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {kicker ? `${number} — ${kicker}` : number}
      </motion.p>
      {headline ? (
        <motion.h2
          className="relative mb-8 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {headline}
        </motion.h2>
      ) : null}
      <motion.div
        className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <RevealMedia src={item.url} alt={caption || headline || kicker || ""} className="w-full object-contain" />
      </motion.div>
      {caption ? (
        <motion.p
          className="relative mt-6 max-w-md text-center text-sm leading-relaxed text-white/65 md:text-base"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {caption}
        </motion.p>
      ) : null}
    </section>
  );
}
