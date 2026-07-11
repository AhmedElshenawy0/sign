import Section from "./VideoSection";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";

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

  return (
    <div
      className="bg-white flex flex-col gap-36 py-32 border-t border-neutral-100"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Structural Central Heading Title Block */}
      <div className="text-center px-6 max-w-xl mx-auto space-y-4">
        <span className="inline-flex items-center text-[10px] font-black tracking-[0.35em] uppercase text-main-move bg-main-move/5 px-4 py-1.5 rounded-full border border-main-move/10 select-none">
          {t("home.servicesSection.eyebrow")}
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase">
          {t("home.servicesSection.title")}
        </h2>
      </div>

      <div className="space-y-36 md:space-y-44">
        {serviceLayouts.map((service, i) => (
          <Section
            key={service.key}
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
        ))}
      </div>
    </div>
  );
};

export default OurService;
