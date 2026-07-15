import Section from "./VideoSection";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import GridBg from "../global/GridBg";

const OurService = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  // Dynamic Array Reference Management Engine
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [pausedStates, setPausedStates] = useState(Array(6).fill(true));

  const setPausedAt = (idx: number, state: boolean) => {
    setPausedStates((prev) => prev.map((p, i) => (i === idx ? state : p)));
  };

  // Structured loop configuration schema array matrix mapped cleanly to translations references
  const serviceLayouts = [
    {
      key: "section1",
      layout: "left" as const,
      height: "h-[260px] md:h-[500px]",
    },
    {
      key: "section2",
      layout: "right" as const,
      height: "h-[260px] md:h-[460px]",
    },
    {
      key: "section3",
      layout: "left" as const,
      height: "h-[260px] md:h-[420px]",
    },
    {
      key: "section4",
      layout: "right" as const,
      height: "h-[260px] md:h-[460px]",
    },
    {
      key: "section5",
      layout: "left" as const,
      height: "h-[260px] md:h-[460px]",
    },
    {
      key: "section6",
      layout: "right" as const,
      height: "h-[260px] md:h-[460px]",
    },
  ];

  // Refs for scroll-synced side navigation — lets a visitor see which
  // service is currently in view and jump between them, the way a
  // documentation/product site would, rather than a flat unbroken scroll.
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // The rail is `fixed`, which pins it to the viewport regardless of
  // where this component sits in the page — so without this, it stays
  // visible over every other home-page section (Hero, Process, Contact...)
  // the entire time this component is mounted, not just while the user is
  // actually scrolled through it. This second observer watches the whole
  // OurService wrapper and only shows the rail while it's on screen.
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    visibilityObserver.observe(root);
    return () => visibilityObserver.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex(
              (el) => el === entry.target,
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div
      ref={rootRef}
      className="relative bg-white flex flex-col gap-36 py-32 overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <GridBg variant="light" />

      {/* Ambient depth wash — quiet, matches the same restrained palette
          used elsewhere on the site rather than introducing a new color */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-main-move/[0.03] blur-[140px] pointer-events-none"
      />

      {/* Structural Central Heading Title Block */}
      <div className="relative text-center px-6 max-w-2xl mx-auto space-y-5">
        <span className="inline-flex items-center gap-2.5 text-[10px] font-black tracking-[0.35em] uppercase text-main-move bg-main-move/5 px-4 py-1.5 rounded-full border border-main-move/10 select-none">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-move opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-main-move" />
          </span>
          {t("home.servicesSection.eyebrow")}
        </span>

        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
          {t("home.servicesSection.title")}
        </h2>

        <span className="inline-block text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-slate-400">
          {String(serviceLayouts.length).padStart(2, "0")}{" "}
          {t(
            "home.servicesSection.countLabel",
            isArabic ? "خدمات متكاملة" : "Integrated Capabilities",
          )}
        </span>

        {/* Quick-jump pills — mainly useful on mobile, where the fixed
            side rail below is hidden */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 md:hidden">
          {serviceLayouts.map((service, i) => (
            <button
              key={service.key}
              onClick={() => scrollToIndex(i)}
              className="text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-slate-200 text-slate-500 hover:border-main-move/40 hover:text-main-move transition-colors"
            >
              {t(`home.services.${service.key}.tag`)}
            </button>
          ))}
        </div>
      </div>

      {/* Fixed scroll-synced side rail — desktop only. Shows which
          service is currently in view and lets a visitor jump straight
          to another one, the way a docs/product marketing site would.
          Gated on isSectionVisible since `fixed` positioning would
          otherwise keep it pinned on screen over every other home-page
          section, not just this one. */}
      {isSectionVisible && (
        <div
          className={`hidden md:flex flex-col gap-4 fixed top-1/2 -translate-y-1/2 z-40 transition-opacity duration-300 ${
            isArabic ? "left-6" : "right-6"
          }`}
        >
          {serviceLayouts.map((service, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={service.key}
                onClick={() => scrollToIndex(i)}
                className="group relative flex items-center"
                aria-label={t(`home.services.${service.key}.tag`)}
              >
                {/* Tooltip label */}
                <span
                  className={`absolute ${isArabic ? "left-6" : "right-6"} whitespace-nowrap text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200`}
                >
                  {t(`home.services.${service.key}.tag`)}
                </span>

                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-main-move"
                      : "w-1.5 h-1.5 bg-slate-300 group-hover:bg-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}

      <div className="space-y-36 md:space-y-44">
        {serviceLayouts.map((service, i) => (
          <div key={service.key} ref={(el) => (sectionRefs.current[i] = el)}>
            <Section
              videoRef={(el) => (videoRefs.current[i] = el)}
              isPaused={pausedStates[i]}
              setPaused={(state) => setPausedAt(i, state)}
              layout={service.layout}
              poster="/images/sign3.jpg"
              videoHeight={service.height}
              videoCover
              caseLabel={t("home.servicesSection.caseLabel")}
              tag={t(`home.services.${service.key}.tag`)}
              stat={t(`home.services.${service.key}.stat`)}
              title={t(`home.services.${service.key}.title`)}
              desc={t(`home.services.${service.key}.description`)}
              ctaText={t("home.servicesSection.cta")}
              ctaHref="/projects"
              index={i + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurService;
