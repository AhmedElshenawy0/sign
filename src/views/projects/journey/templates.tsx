"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { stillUrls, type Project } from "@/types/project";
import { CopyChapter, JourneyClose, JourneyShell, TiltFrame } from "./chrome";

function PackagingJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const urls = stillUrls(project);
  const extras = urls.slice(1);

  return (
    <JourneyShell project={project}>
      <section className="relative flex min-h-[88vh] flex-col items-center justify-center px-6 py-16">
        <motion.p
          className="mb-8 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t("projects.journey.chapters.packaging.kicker")}
        </motion.p>
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <TiltFrame src={urls[0]} alt={project.title} />
        </motion.div>
        <motion.h1
          className="mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {project.title}
        </motion.h1>
      </section>

      <CopyChapter
        kicker={t("projects.journey.chapters.packaging.range.kicker")}
        title={t("projects.journey.chapters.packaging.range.title")}
        body={t("projects.journey.chapters.packaging.range.body")}
        image={extras[0] ?? urls[0]}
        alt={project.title}
      />

      {extras.length ? (
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-12">
          <p className="mb-8 text-[10px] font-black uppercase tracking-[0.32em] text-main-move">
            {t("projects.journey.chapters.packaging.skus")}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {extras.map((src, index) => (
              <motion.div
                key={`${src}-${index}`}
                className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.08 }}
              >
                <img src={src} alt="" className="aspect-[4/5] w-full object-cover" />
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
  const { t } = useTranslation();
  const urls = stillUrls(project);
  const fan = urls.length >= 3 ? urls.slice(0, 5) : [urls[0], urls[0], urls[0]];
  const rotations = [-14, 0, 12, -8, 8];

  return (
    <JourneyShell project={project}>
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-20">
        <motion.p
          className="mb-12 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t("projects.journey.chapters.prints.kicker")}
        </motion.p>
        <div className="relative flex h-[52vh] w-full max-w-4xl items-center justify-center">
          {fan.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="absolute w-[42%] max-w-xs overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: rotations[index] ?? 0 }}
              transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: index === 1 ? 4 : index }}
            >
              <img src={src} alt="" className="aspect-[3/4] w-full object-cover" />
            </motion.div>
          ))}
        </div>
        <motion.h1
          className="mt-16 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {project.title}
        </motion.h1>
      </section>

      {urls.map((src, index) => (
        <section
          key={`${src}-full-${index}`}
          className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-6 py-16"
        >
          <motion.div
            className="w-full overflow-hidden rounded-[2rem] border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <img src={src} alt={project.title} className="w-full object-contain" />
          </motion.div>
        </section>
      ))}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function SocialJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const urls = stillUrls(project);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (urls.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % urls.length),
      2800,
    );
    return () => window.clearInterval(id);
  }, [urls.length]);

  return (
    <JourneyShell project={project}>
      <section className="relative grid min-h-[90vh] items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-16">
        <div>
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-main-green">
            {t("projects.journey.chapters.social.kicker")}
          </p>
          <h1 className="mb-6 text-4xl font-black uppercase tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/70">
            {t("projects.journey.chapters.social.body")}
          </p>
        </div>

        <div className="mx-auto w-[min(100%,280px)]">
          <div className="relative rounded-[2.4rem] border-[10px] border-white/15 bg-black p-2 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative aspect-[9/19] overflow-hidden rounded-[1.7rem] bg-slate-950">
              {urls.map((src, i) => (
                <motion.img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 0.45 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function OutdoorsJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const urls = stillUrls(project);

  return (
    <JourneyShell project={project}>
      <section className="relative flex min-h-[92vh] flex-col items-center justify-end overflow-hidden px-6 pb-16 pt-10">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#05070c_0%,#101826_55%,#1a2433_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <motion.div
          className="relative mb-10 w-full max-w-4xl"
          style={{ perspective: 1400 }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto h-4 w-[18%] rounded-sm bg-white/25" />
          <div className="mx-auto h-10 w-2 bg-white/20" />
          <div
            className="overflow-hidden rounded-sm border-[12px] border-[#2a2a2a] bg-black shadow-[0_50px_80px_rgba(0,0,0,0.55)]"
            style={{ transform: "rotateX(8deg)" }}
          >
            <img src={urls[0]} alt={project.title} className="aspect-[16/7] w-full object-cover" />
          </div>
        </motion.div>
        <h1 className="relative text-center text-3xl font-black uppercase tracking-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="relative mt-4 max-w-lg text-center text-white/65">
          {t("projects.journey.chapters.outdoors.body")}
        </p>
      </section>

      {urls.slice(1).map((src, index) => (
        <section
          key={`${src}-${index}`}
          className="mx-auto flex min-h-[80vh] max-w-5xl items-center px-6 py-16"
        >
          <motion.div
            className="w-full overflow-hidden rounded-[1.5rem] border-[10px] border-[#2a2a2a]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={src} alt="" className="aspect-[16/7] w-full object-cover" />
          </motion.div>
        </section>
      ))}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function StrategyJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const urls = stillUrls(project);
  const key =
    project.type === "marketing_strategy" ? "marketing_strategy" : "brand_strategy";
  const steps = t(`projects.journey.chapters.${key}.steps`, {
    returnObjects: true,
  }) as { kicker: string; title: string; body: string }[];
  const chapters = Array.isArray(steps)
    ? steps
    : [
        {
          kicker: "01",
          title: project.title,
          body: t(`projects.journey.lines.${project.type}`),
        },
      ];

  return (
    <JourneyShell project={project}>
      <section className="mx-auto flex min-h-[50vh] max-w-4xl flex-col justify-end px-6 pb-8 pt-10 md:px-12">
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-main-green">
          {t(`projects.journey.chapters.${key}.kicker`)}
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
          {project.title}
        </h1>
      </section>

      <div className="relative mx-auto max-w-5xl px-6 pb-8 md:px-12">
        <div className="absolute bottom-8 top-0 w-px bg-gradient-to-b from-main-red via-main-move to-main-green ltr:left-10 rtl:right-10 md:ltr:left-[3.25rem] md:rtl:right-[3.25rem]" />
        {chapters.map((step, index) => (
          <CopyChapter
            key={step.title + index}
            kicker={step.kicker}
            title={step.title}
            body={step.body}
            image={urls[index % urls.length]}
            alt={project.title}
            reverse={index % 2 === 1}
          />
        ))}
      </div>

      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function PhotosJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const urls = stillUrls(project);
  const [active, setActive] = useState(0);

  return (
    <JourneyShell project={project}>
      <section className="flex min-h-[40vh] flex-col justify-end px-6 pb-6 pt-8 md:px-12">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-main-green">
          {t("projects.journey.chapters.photos.kicker")}
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
          {project.title}
        </h1>
      </section>

      <div className="mb-8 flex gap-3 overflow-x-auto px-6 pb-4 md:px-12">
        {urls.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={`relative h-28 w-40 shrink-0 overflow-hidden rounded-lg border-2 transition ${
              active === index ? "border-main-green" : "border-white/15"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <section className="mx-auto min-h-[70vh] max-w-6xl px-6 pb-16 md:px-12">
        <motion.div
          key={urls[active]}
          className="overflow-hidden rounded-[2rem] border border-white/10"
          initial={{ opacity: 0.4, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={urls[active]}
            alt={project.title}
            className="max-h-[78vh] w-full object-contain"
          />
        </motion.div>
      </section>
      <JourneyClose project={project} />
    </JourneyShell>
  );
}

function VideosJourney({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <JourneyShell project={project}>
      <section className="flex min-h-screen flex-col justify-center px-4 pb-16 pt-4 md:px-16">
        <p className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.35em] text-main-green">
          {t("projects.journey.chapters.videos.kicker")}
        </p>
        <motion.div
          className="overflow-hidden rounded-sm border-y-[18px] border-black bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            src={project.media_url}
            poster={project.poster_url ?? undefined}
            controls
            playsInline
            className="aspect-video w-full bg-black object-contain"
          />
        </motion.div>
        <h1 className="mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/65">
          {t(`projects.journey.lines.${project.type}`)}
        </p>
      </section>
    </JourneyShell>
  );
}

function NfcJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const urls = stillUrls(project);

  return (
    <JourneyShell project={project}>
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,152,93,0.12),transparent_55%)]" />
        <motion.p
          className="mb-8 text-[10px] font-black uppercase tracking-[0.35em] text-main-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t(`projects.journey.chapters.${project.type}.wear`)}
        </motion.p>
        <motion.div
          className="w-full max-w-md"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <TiltFrame src={urls[0]} alt={project.title} />
        </motion.div>
        <h1 className="relative mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl">
          {project.title}
        </h1>
      </section>

      {urls.slice(1).map((src, index) => (
        <section
          key={`${src}-${index}`}
          className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-12"
        >
          <motion.div
            className="w-full overflow-hidden rounded-[2rem] border border-white/10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={src} alt="" className="w-full object-contain" />
          </motion.div>
        </section>
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
