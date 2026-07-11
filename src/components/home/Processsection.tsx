import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface StepItem {
  key: string;
  number: string;
  titleKey: string;
  descKey: string;
  styles: {
    text: string;
    bg: string;
    border: string;
    glow: string;
  };
}

const STEPS: StepItem[] = [
  {
    key: "discover",
    number: "01",
    titleKey: "home.process.discover.title",
    descKey: "home.process.discover.desc",
    styles: {
      text: "text-main-red",
      bg: "bg-main-red",
      border: "border-main-red/15",
      glow: "group-hover:bg-main-red/5",
    },
  },
  {
    key: "strategy",
    number: "02",
    titleKey: "home.process.strategy.title",
    descKey: "home.process.strategy.desc",
    styles: {
      text: "text-main-move",
      bg: "bg-main-move",
      border: "border-main-move/15",
      glow: "group-hover:bg-main-move/5",
    },
  },
  {
    key: "execute",
    number: "03",
    titleKey: "home.process.execute.title",
    descKey: "home.process.execute.desc",
    styles: {
      text: "text-main-green",
      bg: "bg-main-green",
      border: "border-main-green/15",
      glow: "group-hover:bg-main-green/5",
    },
  },
];

const ProcessSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative bg-neutral-50/60 text-slate-900 px-6 md:px-14 py-24 md:py-32 border-y border-neutral-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <header className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.35em] uppercase text-main-green bg-main-green/5 px-4 py-1.5 rounded-full border border-main-green/10 select-none">
            <span className="w-1 h-1 rounded-full bg-main-green" />
            {t("home.process.eyebrow")}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-slate-900">
            {t("home.process.title")}
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
            {t("home.process.description")}
          </p>
        </header>

        {/* Workflow Container */}
        <div className="relative">
          {/* Subtle connecting track behind nodes */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-[42px] left-[16%] right-[16%] h-px bg-gradient-to-r from-main-red/25 via-main-move/25 to-main-green/25"
          />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.key}
                className="relative flex flex-col items-center text-center gap-4 group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.12,
                }}
              >
                {/* Number Circle Badge */}
                <div
                  className={`relative z-10 flex items-center justify-center w-[84px] h-[84px] rounded-full bg-white border ${step.styles.border} shadow-sm transition-all duration-300 group-hover:-translate-y-1 ${step.styles.glow}`}
                >
                  <span className={`text-2xl font-black ${step.styles.text}`}>
                    {step.number}
                  </span>
                </div>

                {/* Content Elements */}
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-slate-800">
                  {t(step.titleKey)}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-xs">
                  {t(step.descKey)}
                </p>

                {/* Directional Action Arrows */}
                {index < STEPS.length - 1 && (
                  <span
                    className={`hidden md:flex absolute top-[29px] ltr:-right-4 rtl:-left-4 z-20 items-center justify-center w-8 h-8 rounded-full ${step.styles.bg} text-white text-xs shadow-md select-none font-mono rtl:rotate-180`}
                  >
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
