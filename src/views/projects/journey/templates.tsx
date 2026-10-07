"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { copyChapterPref, copyLine, stillAsChapter, stillCaption } from "@/lib/journey-copy";
import { fillMissingRoles, itemByRole, JOURNEY_SLOT_ROLES } from "@/lib/journey-slots";
import { galleryItems, type Project, type ProjectGalleryItem } from "@/types/project";
import {
  CopyChapter,
  FrameChapter,
  JourneyClose,
  JourneyMedia,
  JourneyShell,
  RevealMedia,
  TiltFrame,
  frameLabel,
  projectLine,
  useHeroScroll,
} from "./chrome";

const EASE = [0.16, 1, 0.3, 1] as const;

function slottedGallery(project: Project, roles: readonly string[]) {
  const extras = fillMissingRoles(project.type, galleryItems(project));
  const reserved = new Set(roles);
  const ordered = roles
    .map((role) => itemByRole(extras, role))
    .filter((item): item is ProjectGalleryItem => Boolean(item));
  const leftover = extras.filter((item) => !item.role || !reserved.has(item.role));
  return { extras, ordered: [...ordered, ...leftover] };
}

function uniqueStills(project: Project, roles: readonly string[]) {
  const { ordered } = slottedGallery(project, roles);
  const seen = new Set<string>();
  const hero: ProjectGalleryItem[] = project.media_url
    ? [{ url: project.media_url, publicId: null, caption: project.title }]
    : [];
  return [...hero, ...ordered].filter((item) => {
    if (!item.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function PackagingJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const copy = project.journeyCopy;
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroScroll(heroRef);
  const roles = JOURNEY_SLOT_ROLES.packaging;
  const { extras } = slottedGallery(project, roles);
  const detail = itemByRole(extras, "detail");
  const range = copyChapterPref(stillAsChapter(detail), copy?.range, lang, {
    kicker: t("projects.journey.chapters.packaging.range.kicker"),
    title: t("projects.journey.chapters.packaging.range.title"),
    body: projectLine(project, t),
  });
  const grid = ["sku", "in_hand", "shelf"]
    .map((role) => itemByRole(extras, role))
    .filter((item): item is ProjectGalleryItem => Boolean(item));
  const leftover = extras.filter(
    (item) => item !== detail && !grid.some((entry) => entry.url === item.url && entry.role === item.role),
  );
  const cards = [...grid, ...leftover];
  const hero = project.media_url;

  return (
    <JourneyShell project={project}>
      <section
        ref={heroRef}
        className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 py-16"
      >
        <motion.p
          className="mb-8 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {copyLine(copy?.kicker, lang, t("projects.journey.chapters.packaging.kicker"))}
        </motion.p>
        <motion.div style={{ scale, opacity, y }} className="w-full max-w-lg">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <TiltFrame src={hero} alt={project.title} />
          </motion.div>
        </motion.div>
        <motion.h1
          className="mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        {project.story?.trim() ? (
          <motion.p
            className="mx-auto mt-5 max-w-lg text-center text-white/65"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6, ease: EASE }}
          >
            {project.story.trim()}
          </motion.p>
        ) : null}
      </section>

      {detail ? (
        <CopyChapter
          kicker={range.kicker}
          title={range.title}
          body={range.body}
          image={detail.url}
          alt={frameLabel(detail, t, project.title)}
          caption={stillCaption(detail, lang, frameLabel(detail, t))}
        />
      ) : null}

      {cards.length ? (
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
          <p className="mb-8 text-[10px] font-black uppercase tracking-[0.32em] text-main-green">
            {copyLine(copy?.skus, lang, t("projects.journey.chapters.packaging.skus"))}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((item, index) => (
              <motion.div
                key={`${item.url}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.65, ease: EASE }}
                whileHover={reduce ? undefined : { y: -6 }}
              >
                <RevealMedia src={item.url} alt={frameLabel(item, t)} className="aspect-[4/5] w-full object-cover" />
                {stillCaption(item, lang, frameLabel(item, t)) ? (
                  <p className="px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
                    {stillCaption(item, lang, frameLabel(item, t))}
                  </p>
                ) : null}
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function PrintsJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroScroll(heroRef);
  const roles = JOURNEY_SLOT_ROLES.prints;
  const { ordered } = slottedGallery(project, roles);
  const stills = uniqueStills(project, roles);
  const fan =
    stills.length >= 3
      ? stills.slice(0, 5).map((item) => item.url)
      : [stills[0]?.url, stills[1]?.url ?? stills[0]?.url, stills[2]?.url ?? stills[0]?.url].filter(
          (src): src is string => Boolean(src),
        );
  const rotations = [-14, 0, 12, -8, 8];

  return (
    <JourneyShell project={project}>
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-20"
      >
        <motion.p
          className="mb-12 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {copyLine(project.journeyCopy?.kicker, lang, t("projects.journey.chapters.prints.kicker"))}
        </motion.p>
        <motion.div
          style={{ scale, opacity, y }}
          className="relative flex h-[52vh] w-full max-w-4xl items-center justify-center"
        >
          {fan.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="absolute w-[42%] max-w-xs overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
              initial={reduce ? false : { opacity: 0, y: 48, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: reduce ? 0 : rotations[index] ?? 0 }}
              transition={{ delay: 0.12 + index * 0.12, duration: 0.8, ease: EASE }}
              style={{ zIndex: index === 1 ? 4 : index }}
            >
              <JourneyMedia src={src} alt="" className="aspect-[3/4] w-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
        <motion.h1
          className="mt-16 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        {project.story?.trim() ? (
          <p className="mx-auto mt-5 max-w-lg text-center text-white/65">{project.story.trim()}</p>
        ) : null}
      </section>

      {ordered.map((item, index) => (
        <FrameChapter
          key={`${item.url}-full-${index}`}
          item={item}
          index={index}
          fallbackLabel={project.title}
        />
      ))}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function SocialJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroScroll(heroRef);
  const frames = uniqueStills(project, JOURNEY_SLOT_ROLES.social_media);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || frames.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % frames.length),
      2800,
    );
    return () => window.clearInterval(id);
  }, [frames.length, reduce]);

  return (
    <JourneyShell project={project}>
      <section
        ref={heroRef}
        className="relative grid min-h-[90vh] items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-16"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-main-green">
            {copyLine(project.journeyCopy?.kicker, lang, t("projects.journey.chapters.social.kicker"))}
          </p>
          <h1 className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/70">
            {projectLine(project, t)}
          </p>
          {stillCaption(frames[index], lang, frameLabel(frames[index], t)) ? (
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
              {stillCaption(frames[index], lang, frameLabel(frames[index], t))}
            </p>
          ) : null}
        </motion.div>

        <motion.div style={{ scale, opacity, y }} className="mx-auto w-[min(100%,280px)]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          >
          <div className="relative rounded-[2.4rem] border-[10px] border-white/15 bg-black p-2 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.7rem] bg-slate-950">
              {frames.map((item, i) => (
                <motion.img
                  key={`${item.url}-${i}`}
                  src={item.url}
                  alt={frameLabel(item, t)}
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ opacity: i === index ? 1 : 0, scale: i === index && !reduce ? 1 : 1.04 }}
                  transition={{ duration: 0.55, ease: EASE }}
                />
              ))}
            </div>
          </div>
          </motion.div>
        </motion.div>
      </section>
      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function OutdoorsJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroScroll(heroRef);
  const { ordered } = slottedGallery(project, JOURNEY_SLOT_ROLES.outdoors);
  const hero = project.media_url;
  const coverLine = copyLine(project.journeyCopy?.kicker, lang, "");

  return (
    <JourneyShell project={project}>
      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] flex-col items-center justify-end overflow-hidden px-6 pb-16 pt-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#05070c_0%,#101826_55%,#1a2433_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <motion.div style={{ scale, opacity, y }} className="relative mb-10 w-full max-w-4xl">
          <motion.div
            style={{ perspective: 1400 }}
            initial={reduce ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease: EASE }}
          >
          <div className="mx-auto h-4 w-[18%] rounded-sm bg-white/25" />
          <div className="mx-auto h-10 w-2 bg-white/20" />
          <div
            className="overflow-hidden rounded-sm border-[12px] border-[#2a2a2a] bg-black shadow-[0_50px_80px_rgba(0,0,0,0.55)]"
            style={{ transform: "rotateX(8deg)" }}
          >
            <RevealMedia src={hero} alt={project.title} className="aspect-[16/7] w-full object-cover" />
          </div>
          </motion.div>
        </motion.div>
        {coverLine ? (
          <motion.p
            className="relative mb-6 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {coverLine}
          </motion.p>
        ) : null}
        <motion.h1
          className="relative text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        <p className="relative mt-4 max-w-lg text-center text-white/65">
          {projectLine(project, t)}
        </p>
      </section>

      {ordered.map((item, index) => (
        <FrameChapter key={`${item.url}-${index}`} item={item} index={index} />
      ))}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function StrategyJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();
  const extras = fillMissingRoles(project.type, galleryItems(project));
  const key =
    project.type === "marketing_strategy" ? "marketing_strategy" : "brand_strategy";
  const roleKeys = JOURNEY_SLOT_ROLES[project.type] ?? JOURNEY_SLOT_ROLES.brand_strategy;
  const steps = t(`projects.journey.chapters.${key}.steps`, {
    returnObjects: true,
  }) as { kicker: string; title: string; body: string }[];
  const fallbackSteps = Array.isArray(steps)
    ? steps
    : [
        {
          kicker: "01",
          title: project.title,
          body: projectLine(project, t),
        },
      ];

  return (
    <JourneyShell project={project}>
      <section className="mx-auto flex min-h-[50vh] max-w-4xl flex-col justify-end px-6 pb-8 pt-10 md:px-12">
        <motion.p
          className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {copyLine(project.journeyCopy?.kicker, lang, t(`projects.journey.chapters.${key}.kicker`))}
        </motion.p>
        <motion.h1
          className="text-4xl font-black uppercase tracking-tight md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        {project.story?.trim() ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            {project.story.trim()}
          </p>
        ) : null}
      </section>

      <div className="relative mx-auto max-w-5xl px-6 pb-8 md:px-12">
        <div className="absolute bottom-8 top-0 w-px bg-gradient-to-b from-main-red via-main-move to-main-green ltr:left-10 rtl:right-10 md:ltr:left-[3.25rem] md:rtl:right-[3.25rem]" />
        {fallbackSteps.map((step, index) => {
          const image = itemByRole(extras, roleKeys[index]);
          if (!image) return null;
          const copy = copyChapterPref(
            stillAsChapter(image),
            project.journeyCopy?.steps?.[index],
            lang,
            step,
          );
          return (
            <CopyChapter
              key={copy.title + index}
              kicker={copy.kicker}
              title={copy.title}
              body={copy.body}
              image={image.url}
              alt={frameLabel(image, t, project.title)}
              caption={stillCaption(image, lang, frameLabel(image, t))}
              reverse={index % 2 === 1}
            />
          );
        })}
      </div>

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function PhotosJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();
  const frames = uniqueStills(project, JOURNEY_SLOT_ROLES.photos);
  const [active, setActive] = useState(0);
  const current = frames[active] ?? frames[0];

  return (
    <JourneyShell project={project}>
      <section className="flex min-h-[40vh] flex-col justify-end px-6 pb-6 pt-8 md:px-12">
        <motion.p
          className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {copyLine(project.journeyCopy?.kicker, lang, t("projects.journey.chapters.photos.kicker"))}
        </motion.p>
        <motion.h1
          className="text-4xl font-black uppercase tracking-tight md:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        {project.story?.trim() ? (
          <p className="mt-4 max-w-xl text-white/65">{project.story.trim()}</p>
        ) : null}
      </section>

      <div className="mb-8 flex gap-3 overflow-x-auto px-6 pb-4 md:px-12">
        {frames.map((item, index) => (
          <button
            key={`${item.url}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border-2 transition ${
              active === index ? "border-main-green" : "border-white/15"
            }`}
          >
            <img src={item.url} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <section className="mx-auto min-h-[70vh] max-w-6xl px-6 pb-16 md:px-12">
        <motion.div
          key={current?.url}
          className="overflow-hidden rounded-[2rem] border border-white/10"
          initial={reduce ? false : { opacity: 0.4, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <JourneyMedia
            src={current?.url ?? ""}
            alt={frameLabel(current, t, project.title)}
            className="max-h-[78vh] w-full object-contain"
          />
        </motion.div>
        {stillCaption(current, lang, frameLabel(current, t)) ? (
          <p className="mt-5 text-center text-sm text-white/60">
            {stillCaption(current, lang, frameLabel(current, t))}
          </p>
        ) : null}
      </section>
      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function VideosJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();

  return (
    <JourneyShell project={project}>
      <section className="flex min-h-screen flex-col justify-center px-4 pb-16 pt-4 md:px-16">
        <motion.p
          className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {copyLine(project.journeyCopy?.kicker, lang, t("projects.journey.chapters.videos.kicker"))}
        </motion.p>
        <motion.div
          className="overflow-hidden rounded-sm border-y-[18px] border-black bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <video
            src={project.media_url}
            poster={project.poster_url ?? undefined}
            controls
            playsInline
            className="aspect-video w-full bg-black object-contain"
          />
        </motion.div>
        <motion.h1
          className="mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/65">
          {projectLine(project, t)}
        </p>
      </section>
    </JourneyShell>
  );
}

function NfcJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroScroll(heroRef);
  const roles = JOURNEY_SLOT_ROLES[project.type] ?? [];
  const { ordered } = slottedGallery(project, roles);

  return (
    <JourneyShell project={project}>
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,152,93,0.12),transparent_55%)]" />
        <motion.p
          className="mb-8 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {copyLine(
            project.journeyCopy?.wear,
            lang,
            t(`projects.journey.chapters.${project.type}.wear`),
          )}
        </motion.p>
        <motion.div style={{ scale, opacity, y }} className="w-full max-w-md">
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <TiltFrame src={project.media_url} alt={project.title} />
          </motion.div>
        </motion.div>
        <motion.h1
          className="relative mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65, ease: EASE }}
        >
          {project.title}
        </motion.h1>
        {project.story?.trim() ? (
          <p className="relative mx-auto mt-4 max-w-lg text-center text-white/65">
            {project.story.trim()}
          </p>
        ) : null}
      </section>

      {ordered.map((item, index) => (
        <FrameChapter key={`${item.url}-${index}`} item={item} index={index} />
      ))}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

export {
  PackagingJourney,
  PrintsJourney,
  SocialJourney,
  OutdoorsJourney,
  StrategyJourney,
  PhotosJourney,
  VideosJourney,
  NfcJourney,
};
