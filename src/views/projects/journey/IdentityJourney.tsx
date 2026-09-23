"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { galleryItems, type Project } from "@/types/project";
import {
  CopyChapter,
  JourneyClose,
  JourneyShell,
  TiltFrame,
} from "./chrome";

export default function IdentityJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const extras = galleryItems(project).map((item) => item.url);
  const hero = project.media_url;
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const applicationLabels = t("projects.journey.chapters.identity.applications", {
    returnObjects: true,
  }) as string[];
  const labels = Array.isArray(applicationLabels) ? applicationLabels : ["Pack", "Card", "Street"];

  return (
    <JourneyShell project={project}>
      <section
        ref={heroRef}
        className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 pb-24 pt-8"
      >
        <motion.p
          className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-main-green"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t("projects.journey.chapters.identity.scroll")}
        </motion.p>
        <motion.div style={{ scale, opacity, y }} className="w-full max-w-xl">
          <TiltFrame src={hero} alt={project.title} />
        </motion.div>
        <motion.h1
          className="mt-10 text-center text-3xl font-black uppercase tracking-tight md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.title}
        </motion.h1>
      </section>

      <CopyChapter
        kicker={t("projects.journey.chapters.identity.mark.kicker")}
        title={t("projects.journey.chapters.identity.mark.title")}
        body={t("projects.journey.chapters.identity.mark.body")}
        image={hero}
        alt={project.title}
      />

      <CopyChapter
        kicker={t("projects.journey.chapters.identity.voice.kicker")}
        title={t("projects.journey.chapters.identity.voice.title")}
        body={t("projects.journey.chapters.identity.voice.body")}
        image={hero}
        alt={project.title}
        reverse
      />

      {extras.length ? (
        extras.map((src, index) => (
          <section
            key={`${src}-${index}`}
            className="relative mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-6 py-20"
          >
            <motion.p
              className="mb-6 text-[10px] font-black uppercase tracking-[0.32em] text-main-move"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              {labels[index % labels.length]}
            </motion.p>
            <motion.div
              className="w-full overflow-hidden rounded-[2rem] border border-white/10"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={src} alt={labels[index % labels.length]} className="w-full object-contain" />
            </motion.div>
          </section>
        ))
      ) : (
        <CopyChapter
          kicker={t("projects.journey.chapters.identity.world.kicker")}
          title={t("projects.journey.chapters.identity.world.title")}
          body={t("projects.journey.chapters.identity.world.body")}
          image={hero}
          alt={project.title}
        />
      )}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}
