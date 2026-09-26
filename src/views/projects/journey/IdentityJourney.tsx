"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { itemByRole } from "@/lib/journey-slots";
import { galleryItems, type Project } from "@/types/project";
import {
  CopyChapter,
  FrameChapter,
  JourneyClose,
  JourneyShell,
  TiltFrame,
  frameLabel,
  projectLine,
} from "./chrome";

export default function IdentityJourney({ project }: { project: Project }) {
  const { t } = useTranslation();
  const extras = galleryItems(project);
  const hero = project.media_url;
  const book = itemByRole(extras, "brand_book");
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
        {project.story?.trim() ? (
          <motion.p
            className="mx-auto mt-5 max-w-lg text-center text-base leading-relaxed text-white/65"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {project.story.trim()}
          </motion.p>
        ) : null}
      </section>

      <CopyChapter
        kicker={t("projects.journey.chapters.identity.mark.kicker")}
        title={t("projects.journey.chapters.identity.mark.title")}
        body={t("projects.journey.chapters.identity.mark.body")}
        image={hero}
        alt={project.title}
        caption={t("projects.journey.roles.logo", { defaultValue: "Logo" })}
      />

      <CopyChapter
        kicker={t("projects.journey.chapters.identity.voice.kicker")}
        title={t("projects.journey.chapters.identity.voice.title")}
        body={t("projects.journey.chapters.identity.voice.body")}
        image={book?.url ?? hero}
        alt={frameLabel(book, t, project.title)}
        caption={frameLabel(book, t)}
        reverse
      />

      {extras.length ? (
        extras
          .filter((item) => item.role !== "brand_book")
          .map((item, index) => (
          <FrameChapter
            key={`${item.url}-${index}`}
            item={item}
            index={index}
            fallbackLabel={labels[index % labels.length]}
          />
        ))
      ) : (
        <CopyChapter
          kicker={t("projects.journey.chapters.identity.world.kicker")}
          title={t("projects.journey.chapters.identity.world.title")}
          body={projectLine(project, t)}
          image={hero}
          alt={project.title}
        />
      )}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}
