"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { fillMissingRoles, itemByRole } from "@/lib/journey-slots";
import { copyApplications, copyChapterPref, copyLine, stillAsChapter, stillCaption } from "@/lib/journey-copy";
import { galleryItems, type Project } from "@/types/project";
import {
  CopyChapter,
  FrameChapter,
  JourneyClose,
  JourneyShell,
  TiltFrame,
  frameLabel,
  useHeroScroll,
} from "./chrome";

const IDENTITY_FRAME_ROLES = ["pack", "card", "street"] as const;
const IDENTITY_USED_ROLES = new Set([
  "logo_on_product",
  "brand_book",
  ...IDENTITY_FRAME_ROLES,
]);

export default function IdentityJourney({ project }: { project: Project }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const extras = fillMissingRoles("brand_identity", galleryItems(project));
  const hero = project.media_url;
  const logo = itemByRole(extras, "logo_on_product");
  const book = itemByRole(extras, "brand_book");
  const frames = [
    ...IDENTITY_FRAME_ROLES.map((role) => itemByRole(extras, role)).filter(
      (item): item is NonNullable<typeof item> => Boolean(item),
    ),
    ...extras.filter((item) => !item.role || !IDENTITY_USED_ROLES.has(item.role)),
  ];
  const heroRef = useRef<HTMLElement>(null);
  const { scale, opacity, y } = useHeroScroll(heroRef);
  const copy = project.journeyCopy;

  const applicationLabels = t("projects.journey.chapters.identity.applications", {
    returnObjects: true,
  }) as string[];
  const fallbackLabels = Array.isArray(applicationLabels)
    ? applicationLabels
    : ["Pack", "Card", "Street"];
  const labels = copyApplications(copy?.applications, lang, fallbackLabels);
  const mark = copyChapterPref(stillAsChapter(logo), copy?.mark, lang, {
    kicker: t("projects.journey.chapters.identity.mark.kicker"),
    title: t("projects.journey.chapters.identity.mark.title"),
    body: t("projects.journey.chapters.identity.mark.body"),
  });
  const voice = copyChapterPref(stillAsChapter(book), copy?.voice, lang, {
    kicker: t("projects.journey.chapters.identity.voice.kicker"),
    title: t("projects.journey.chapters.identity.voice.title"),
    body: t("projects.journey.chapters.identity.voice.body"),
  });

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
          {copyLine(copy?.scroll, lang, t("projects.journey.chapters.identity.scroll"))}
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

      {logo ? (
        <CopyChapter
          kicker={mark.kicker}
          title={mark.title}
          body={mark.body}
          image={logo.url}
          alt={frameLabel(logo, t, project.title)}
          caption={stillCaption(logo, lang, frameLabel(logo, t, t("projects.journey.roles.logo", { defaultValue: "Logo" })))}
        />
      ) : null}

      {book ? (
        <CopyChapter
          kicker={voice.kicker}
          title={voice.title}
          body={voice.body}
          image={book.url}
          alt={frameLabel(book, t, project.title)}
          caption={stillCaption(book, lang, frameLabel(book, t))}
          reverse
        />
      ) : null}

      {frames.map((item, index) => (
        <FrameChapter
          key={`${item.url}-${index}`}
          item={item}
          index={index}
          fallbackLabel={labels[index % labels.length]}
        />
      ))}

      <JourneyClose project={project} />
    </JourneyShell>
  );
}
