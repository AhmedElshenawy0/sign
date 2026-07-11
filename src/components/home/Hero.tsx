import { useRef, useState } from "react";
import { FaPause, FaPlay, FaExpand } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import NoisyBg from "../global/NoisyBg";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Track scroll values specifically within this hero module context
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth cinematic transforms over scroll transitions
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch((err) => console.log("Playback error:", err));
        setIsPaused(false);
      } else {
        video.pause();
        setIsPaused(true);
      }
    }
  };

  const openFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) video.requestFullscreen();
      else if ((video as any).webkitRequestFullscreen)
        (video as any).webkitRequestFullscreen();
      else if ((video as any).mozRequestFullScreen)
        (video as any).mozRequestFullScreen();
      else if ((video as any).msRequestFullscreen)
        (video as any).msRequestFullscreen();
    }
  };

  const workedWith = [
    { name: "القطان", logo: "/images/Partner/القطان.png" },
    { name: "الزينى", logo: "/images/Partner/الزينى.png" },
    { name: "المتبولى", logo: "/images/Partner/المتبولى.png" },
    { name: "باب الحارة", logo: "/images/Partner/باب الحارة.png" },
    { name: "كوتشى", logo: "/images/Partner/كوتشى.png" },
    { name: "جيرلز", logo: "/images/Partner/جيرلز.png" },
    { name: "الزميتى", logo: "/images/Partner/الزميتى.png" },
    { name: "الجندى", logo: "/images/Partner/الجندى.png" },
    { name: "هلال", logo: "/images/Partner/هلال.png" },
    { name: "النخبة", logo: "/images/Partner/النخبة.png" },
    { name: "هيرو", logo: "/images/Partner/هيرو.png" },
    { name: "تمامى", logo: "/images/Partner/تمامى.png" },
    { name: "سي", logo: "/images/Partner/سي (1).png" },
    { name: "عيون المدينة", logo: "/images/Partner/عيون المدينة.png" },
    { name: "قنديل", logo: "/images/Partner/قنديل.png" },
    { name: "نجم", logo: "/images/Partner/نجم.png" },
    { name: "نيو انجلاند", logo: "/images/Partner/نيو انجلاند.png" },
  ];

  const loopedItems = [
    ...workedWith,
    ...workedWith,
    ...workedWith,
    ...workedWith,
  ];

  return (
    <div
      ref={containerRef}
      className="bg-black text-white antialiased overflow-x-hidden relative"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ── IMMERSIVE STICKY PARALLAX CONTAINER ── */}
      <section className="relative h-[140vh] w-full">
        {/* Pinned Cinematic Image Canvas layer */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <motion.img
            src="/images/sign7.jpg"
            style={{ scale: bgScale }}
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            alt="Hero Background"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/30 to-black z-10" />
        </div>

        {/* Floating Content Interface Area (Translates upwards away from backdrop smoothly) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 h-screen w-full z-20 flex flex-col justify-between items-center pt-32 pb-12 px-6"
        >
          <div className="hidden md:block h-4" />

          <div className="text-center max-w-4xl flex flex-col items-center">
            {/* Ambient Glowing Brand Hub */}
            <div className="relative mb-8 group">
              <span className="absolute inset-0 rounded-full bg-main-move/20 blur-3xl group-hover:bg-main-move/30 transition-all duration-500 animate-pulse" />
              <div className="relative p-5 border border-white/10 rounded-full bg-white/[0.03] backdrop-blur-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/images/SignUp Logo White.png"
                  className="w-16 h-16 object-contain"
                  alt="Sign Up Logo"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Studio Pill */}
            <span className="inline-block text-[10px] font-black tracking-[0.35em] uppercase text-main-move mb-6 bg-main-move/10 px-5 py-2 rounded-full border border-main-move/20 select-none">
              Creative Marketing Studio
            </span>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] text-white uppercase mb-6 max-w-3xl">
              {t("home.hero.title")}
            </h1>

            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              <Trans
                i18nKey="home.hero.description"
                components={{
                  1: (
                    <strong className="text-main-red font-black drop-shadow-[0_0_20px_rgba(var(--color-main-red),0.2)]" />
                  ),
                }}
              />
            </p>
          </div>

          {/* Prompt Action Pin Indicator */}
          <div className="flex flex-col items-center gap-3 select-none pointer-events-none">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30">
              Scroll
            </span>
            <div className="w-[2px] h-10 bg-gradient-to-b from-main-move to-transparent rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── PARTNER LOGO TICKER (NOW SEPARATED IN DOM ORDER FLOW) ── */}
      <div className="relative z-30 py-12 bg-white border-y border-neutral-100 overflow-hidden shadow-2xl">
        <h3 className="text-neutral-400 pb-10 font-black tracking-[0.25em] text-[11px] uppercase text-center select-none">
          {t("home.hero.workedWith")}
        </h3>

        <div className="pointer-events-none absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="w-full overflow-hidden whitespace-nowrap">
          <div className="animate-scroll items-center gap-14 py-2 inline-flex hover:[animation-play-state:paused]">
            {loopedItems.map((tech, i) => (
              <div
                key={`partner-${i}`}
                className="flex flex-col items-center justify-center cursor-pointer group px-4 shrink-0 transition-transform duration-300"
              >
                <div className="w-24 h-24 p-3 bg-neutral-50 border border-neutral-100 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-white group-hover:shadow-lg group-hover:border-transparent">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="max-w-full max-h-full object-contain filter grayscale transition-all duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CINEMATIC INTERACTIVE SHOWREEL SECTION ── */}
      <section className="relative z-30 bg-gradient-to-tr from-neutral-900 to-black py-32 px-6 border-b border-white/5 overflow-hidden">
        <NoisyBg />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-black tracking-[0.3em] uppercase text-main-green mb-3 block select-none">
              Visual Proof
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
              {t("home.hero.showreel")}
            </h2>
          </motion.div>

          <motion.div
            className="relative w-full aspect-video rounded-[1.75rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/10 bg-neutral-950 group"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              ref={videoRef}
              src="/videos/intro.mp4"
              className={`w-full h-full object-cover transition-transform duration-700 ${!isPaused ? "scale-[1.02]" : "scale-100"}`}
              loop
              playsInline
              muted
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center z-10">
              <motion.button
                onClick={toggleVideo}
                className="w-20 h-20 bg-white text-black rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer scale-95 group-hover:scale-100 border border-white/20 hover:bg-main-green hover:text-white"
                aria-label={isPaused ? "Play Video" : "Pause Video"}
                whileTap={{ scale: 0.95 }}
              >
                {isPaused ? (
                  <FaPlay size={20} className={isArabic ? "mr-1" : "ml-1"} />
                ) : (
                  <FaPause size={20} />
                )}
              </motion.button>
            </div>

            {!isPaused && (
              <motion.button
                onClick={openFullscreen}
                className="absolute top-6 right-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 text-white p-3 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer"
                aria-label="Fullscreen"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FaExpand size={14} />
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
