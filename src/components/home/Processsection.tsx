import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import GridBg from "../global/GridBg";

const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // تأثير البارالاكس النظيف للأشكال - تعتمد 100% على السكرول فقط
  const yShape1 = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  const yShape2 = useTransform(scrollYProgress, [0.2, 0.6], [0, 60]);
  const yShape3 = useTransform(scrollYProgress, [0.4, 0.8], [0, -80]);
  const yShape4 = useTransform(scrollYProgress, [0.6, 1], [0, 50]);

  const steps = [
    {
      id: "01",
      title: t("home.process.discover.title", "Discovery & Strategy"),
      desc: t(
        "home.process.discover.desc",
        "We deep dive into your brand DNA, analyze competitors, and map out a bulletproof digital social media blueprint.",
      ),
      color: "#0e985d", // الأخضر الذكي
      glowClass:
        "group-hover:border-[#0e985d]/40 group-hover:shadow-[0_20px_50px_rgba(14,152,93,0.1)]",
      metrics: { progress: "100%", status: "COMPLETE", hash: "0x8F92" },
      yTransform: yShape1,
      deliverables: isArabic
        ? [
            "تحليل المنافسين والسوق",
            "تحديد الجمهور المستهدف",
            "بناء استراتيجية القنوات",
          ]
        : [
            "Competitor & Market Audit",
            "Audience Persona Mapping",
            "Channel Ecosystem Blueprint",
          ],
    },
    {
      id: "02",
      title: t("home.process.strategy.title", "Creative Direction"),
      desc: t(
        "home.process.strategy.desc",
        "Crafting premium visual identities, tailored templates, and high-converting copy that demands attention.",
      ),
      color: "#4f46e5", // البنفسجي
      glowClass:
        "group-hover:border-[#4f46e5]/40 group-hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)]",
      metrics: { progress: "100%", status: "COMPLETE", hash: "0x4A11" },
      yTransform: yShape2,
      deliverables: isArabic
        ? [
            "تصميم قوالب الهوية البصرية",
            "كتابة النصوص الإعلانية الجاذبة",
            "تحديد التوجه الفني والمزاج البصري",
          ]
        : [
            "Visual Identity Templates",
            "High-Converting Copywriting",
            "Art Direction & Moodboarding",
          ],
    },
    {
      id: "03",
      title: t("home.process.execute.title", "Campaign Execution"),
      desc: t(
        "home.process.execute.desc",
        "Deploying high-impact targeted ads, managing content calendars, and optimizing interactions in real-time.",
      ),
      color: "#db2777", // الوردي
      glowClass:
        "group-hover:border-[#db2777]/40 group-hover:shadow-[0_20px_50px_rgba(219,39,119,0.1)]",
      metrics: { progress: "65%", status: "ACTIVE_RUN", hash: "0x9D2C" },
      yTransform: yShape3,
      deliverables: isArabic
        ? [
            "إطلاق الحملات الإعلانية الممولة",
            "إدارة جدولة المحتوى الذكية",
            "التفاعل الفوري وإدارة المجتمعات",
          ]
        : [
            "Paid Ads Deployment",
            "Smart Content Scheduling",
            "Real-time Community Engagement",
          ],
    },
    {
      id: "04",
      title: t("home.process.optimize.title", "Data & Optimization"),
      desc: t(
        "home.process.optimize.desc",
        "Analyzing performance charts, calculating ROI, and tweaking tactics for compounding digital growth.",
      ),
      color: "#ea580c", // البرتقالي
      glowClass:
        "group-hover:border-[#ea580c]/40 group-hover:shadow-[0_20px_50px_rgba(234,88,12,0.1)]",
      metrics: { progress: "0%", status: "QUEUE_PENDING", hash: "0xE1B8" },
      yTransform: yShape4,
      deliverables: isArabic
        ? [
            "تحليل الرسوم البيانية والأداء",
            "حساب العائد على الاستثمار ROI",
            "تطوير التكتيكات للنمو المتصاعد",
          ]
        : [
            "Performance Chart Analytics",
            "ROI & Conversion Audits",
            "Tactical Growth Scaling Operations",
          ],
    },
  ];

  return (
    <section
      ref={containerRef}
      dir={isArabic ? "rtl" : "ltr"}
      className="relative bg-white text-slate-900 py-48 px-6 overflow-hidden 
      "
      style={{ perspective: 1500 }}
    >
      {/* الخلفية الشبكية */}
      <GridBg variant="light" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-52 flex flex-col items-center text-center">
          <span className="text-[10px] font-mono font-black tracking-[0.4em] uppercase text-slate-400 mb-5 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200/60 shadow-sm select-none">
            [ ENGINE_FLOW_ARCHITECTURE ]
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-950 max-w-2xl leading-[0.95]">
            {isArabic
              ? "هندسة رحلة النمو الاستراتيجي"
              : "The Architectural Growth Process"}
          </h2>
        </div>

        {/* ── هيكل التايم لاين والأشكال التفاعلية الثابتة ── */}
        <div className="relative flex flex-col gap-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const startScroll = index * 0.2;
            const endScroll = startScroll + 0.25;

            return (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row w-full items-center justify-between gap-12 relative group ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* خطوط السكك العمودية البسيطة */}
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-full h-32 w-[2px] bg-slate-100 hidden md:block ${
                      isEven ? "left-[60px]" : "right-[60px]"
                    }`}
                  >
                    <motion.div
                      className="w-full h-full origin-top"
                      style={{
                        scaleY: useTransform(
                          scrollYProgress,
                          [startScroll, endScroll],
                          [0, 1],
                        ),
                        backgroundColor: step.color,
                      }}
                    />
                  </div>
                )}

                {/* كارت الـ 3D الرئيسي المعزز بالبيانات */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:w-[55%] max-w-[540px]"
                >
                  <motion.div
                    className={`relative w-full bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 cursor-pointer ${step.glowClass}`}
                    style={{
                      transformOrigin: "center center",
                      boxShadow: `0 20px 40px -10px rgba(0,0,0,0.03), 0 5px 15px -5px rgba(0,0,0,0.01)`,
                    }}
                    whileHover={{
                      y: -12,
                      rotateY: isEven ? 5 : -5,
                      rotateX: -1,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 16 }}
                  >
                    {/* ترويسة الكارت العلوية */}
                    <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-100">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-sm border shadow-sm transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${step.color}06`,
                            borderColor: `${step.color}18`,
                            color: step.color,
                          }}
                        >
                          {step.id}
                        </div>
                        <div className="flex flex-col text-left rtl:text-right">
                          <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                            {step.metrics.hash} // SYS_LNK
                          </span>
                          <span
                            className={`font-mono text-[10px] font-black tracking-wide ${step.metrics.status === "COMPLETE" ? "text-emerald-600" : step.metrics.status === "ACTIVE_RUN" ? "text-indigo-600" : "text-amber-600"}`}
                          >
                            {step.metrics.status}
                          </span>
                        </div>
                      </div>

                      {/* أمواج الـ NFC */}
                      <div className="flex items-center gap-[4px] h-5 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.span
                            key={i}
                            className="w-[3px] rounded-full"
                            style={{ backgroundColor: step.color }}
                            animate={{ height: ["6px", "20px", "6px"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: i * 0.15,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* المحتوى الرئيسي والعناوين */}
                    <div className="space-y-4">
                      <span className="block font-mono text-[10px] uppercase font-black tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors">
                        {`// CORE_STAGE_ENGINE_NODE`}
                      </span>

                      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-[13px] font-semibold leading-relaxed text-slate-500 font-sans">
                        {step.desc}
                      </p>
                    </div>

                    {/* سيكشن المخرجات والمهام */}
                    <div className="mt-8 pt-6 border-t border-slate-50 space-y-3">
                      <span className="block font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {isArabic
                          ? "// المخرجات والعمليات التشغيلية:"
                          : "// OPERATIONAL DELIVERABLES:"}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] font-bold text-slate-600">
                        {step.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: step.color }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* شريط معلومات الحالة الرقمية بالأسفل */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-6 w-2/3">
                        <div className="w-7 h-5 rounded-[4px] border border-slate-200 bg-slate-50/50 relative overflow-hidden flex-shrink-0 group-hover:border-slate-300 transition-colors">
                          <div className="absolute inset-y-0 left-1/3 w-[1px] bg-slate-200" />
                          <div className="absolute inset-y-0 left-2/3 w-[1px] bg-slate-200" />
                          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-200" />
                        </div>

                        <div className="w-full h-[3px] bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: step.metrics.progress,
                              backgroundColor: step.color,
                            }}
                          />
                        </div>
                      </div>

                      <span
                        className="text-xs font-mono font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 flex-shrink-0"
                        style={{ color: step.color }}
                      >
                        {isArabic ? "← نتابع" : "PROCEED →"}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ── الشكل الجانبي المستقر المعتمد على السكرول فقط ── */}
                <div className="hidden md:flex w-[40%] justify-center relative select-none pointer-events-none">
                  <motion.div
                    style={{ y: step.yTransform }} // يتحرك فقط عند تدوير بكرة الماوس (Pure Parallax)
                    className="relative w-48 h-48 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
                  >
                    {/* التوهج الخلفي الناعم */}
                    <div
                      className="absolute inset-0 rounded-full blur-[40px] opacity-[0.06] group-hover:opacity-10 transition-opacity duration-500"
                      style={{ backgroundColor: step.color }}
                    />

                    {/* الأشكال التقنية الرياضية المتناسقة */}
                    {index === 0 && (
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full stroke-current"
                        style={{ color: step.color }}
                        fill="none"
                        strokeWidth="1"
                      >
                        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
                        <circle cx="50" cy="50" r="28" />
                        <circle cx="50" cy="50" r="14" strokeWidth="1.5" />
                        <line
                          x1="50"
                          y1="0"
                          x2="50"
                          y2="100"
                          strokeOpacity="0.1"
                        />
                        <line
                          x1="0"
                          y1="50"
                          x2="100"
                          y2="50"
                          strokeOpacity="0.1"
                        />
                      </svg>
                    )}

                    {index === 1 && (
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full stroke-current"
                        style={{ color: step.color }}
                        fill="none"
                        strokeWidth="1.2"
                      >
                        <path d="M50 15 L85 35 L85 75 L50 95 L15 75 L15 35 Z" />
                        <path d="M50 15 L50 55 L15 35 M50 55 L85 35 M50 55 L50 95" />
                        <circle cx="50" cy="55" r="4" fill={step.color} />
                      </svg>
                    )}

                    {index === 2 && (
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full fill-current"
                        style={{ color: step.color }}
                      >
                        {[10, 30, 50, 70, 90].map((x) =>
                          [10, 30, 50, 70, 90].map((y) => (
                            <circle
                              key={`${x}-${y}`}
                              cx={x}
                              cy={y}
                              r={(x + y) % 3 === 0 ? "2.2" : "1.2"}
                              opacity={(x + y) / 200}
                            />
                          )),
                        )}
                      </svg>
                    )}

                    {index === 3 && (
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full stroke-current"
                        style={{ color: step.color }}
                        fill="none"
                        strokeWidth="1"
                      >
                        <ellipse
                          cx="50"
                          cy="50"
                          rx="42"
                          ry="18"
                          transform="rotate(45 50 50)"
                        />
                        <ellipse
                          cx="50"
                          cy="50"
                          rx="42"
                          ry="18"
                          transform="rotate(-45 50 50)"
                        />
                        <ellipse
                          cx="50"
                          cy="50"
                          rx="42"
                          ry="18"
                          transform="rotate(90 50 50)"
                          strokeDasharray="3 3"
                        />
                      </svg>
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
