import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaPause, FaPlay, FaExpand, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import {
  motion,
  useScroll,
  useTransform,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import NoisyBg from "../global/NoisyBg";
import type { IntroVideo, Showreel } from "@/lib/settings";

// Constant visual speed for the partner ticker, in pixels/second.
// This drives the scroll directly via JS (see useAnimationFrame below)
// instead of relying on a CSS `animate-scroll` class — so there's no
// external stylesheet, media query, or !important rule that can silently
// override the speed on some screen sizes and not others. Raise this
// number to go faster, lower it to go slower. That's the only knob.
const TICKER_SPEED_PX_PER_SEC = 90;
const TICKER_COPIES = 4;

const Hero = ({
  showreel,
  intro,
}: {
  showreel: Showreel;
  intro: IntroVideo;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const videoSrc = showreel.media_url;
  const eyebrow = isArabic ? showreel.copy.eyebrowAr : showreel.copy.eyebrowEn;
  const showreelTitle = isArabic ? showreel.copy.titleAr : showreel.copy.titleEn;

  useEffect(() => {
    const video = bgVideoRef.current;
    if (!video) return;
    const play = () => {
      video.muted = true;
      video.play().catch(() => {});
    };
    video.addEventListener("canplay", play);
    play();
    return () => video.removeEventListener("canplay", play);
  }, [intro.media_url]);

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

  const loopedItems = Array.from({ length: TICKER_COPIES }, () => workedWith).flat();

  // JS-driven marquee: we track our own x position with a motion value and
  // advance it every frame by (speed * elapsed time), then wrap it back to 0
  // once a full set of logos has scrolled past. This is deliberately NOT a
  // CSS animation — a CSS class can be silently overridden by a media query,
  // a more specific selector, or an `!important` elsewhere in the stylesheet,
  // which is almost certainly why changing the old animationDuration value
  // had no visible effect on small screens. Driving it in JS means this
  // component is the only thing that ever controls its speed, full stop.
  const x = useMotionValue(0);
  const isHovering = useRef(false);

  useAnimationFrame((_, delta) => {
    if (isHovering.current) return;
    const track = tickerTrackRef.current;
    if (!track) return;

    const singleSetWidth = track.scrollWidth / TICKER_COPIES;
    if (singleSetWidth <= 0) return;

    const distance = (TICKER_SPEED_PX_PER_SEC * Math.min(delta, 48)) / 1000;
    let next = x.get() - distance;

    // Snap back by whole set widths so a background tab (huge delta) or RTL
    // parent never leaves a blank gap after the last logo.
    while (next <= -singleSetWidth) {
      next += singleSetWidth;
    }

    x.set(next);
  });

  return (
    <div
      ref={containerRef}
      className="bg-black text-white antialiased overflow-x-hidden relative"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* ── IMMERSIVE STICKY PARALLAX CONTAINER ── */}
      <section className="relative h-[140vh] w-full">
        {/* Pinned cinematic video canvas */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <motion.div
            style={{ scale: bgScale }}
            className="absolute inset-0"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <video
              key={intro.media_url}
              ref={bgVideoRef}
              src={intro.media_url}
              poster={intro.poster_url ?? "/images/sign7.jpg"}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black z-10" />
        </div>

        {/* Floating Content Interface Area (Translates upwards away from backdrop smoothly) */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="absolute inset-0 h-screen w-full z-20 flex flex-col justify-between items-center pt-24 md:pt-28 pb-10 px-6"
        >
          <div className="hidden md:block h-2" />

          <div className="text-center max-w-4xl flex flex-col items-center">
            <div className="relative group mb-8">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-1000" />
              <img
                src="/images/SignUp Logo White.png"
                width={120}
                height={120}
                alt="Signup Agency"
                className="relative transform hover:scale-102 transition-transform duration-500"
              />
            </div>

            <span className="inline-block text-[10px] font-black tracking-[0.35em] uppercase text-main-move mb-4 bg-main-move/10 px-5 py-2 rounded-full border border-main-move/20 select-none">
              {t("home.hero.studioPill")}
            </span>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.05] text-white uppercase mb-4 max-w-3xl">
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
              {t("home.hero.scroll")}
            </span>
            <div className="w-[2px] h-10 bg-gradient-to-b from-main-move to-transparent rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── PARTNER LOGO TICKER (NOW SEPARATED IN DOM ORDER FLOW) ── */}
      <div className="relative z-30 py-12 bg-white border-y border-neutral-100 overflow-hidden shadow-2xl">
        <h3
          className="text-neutral-400 pb-10 font-black tracking-[0.25em] text-[11px] uppercase text-center select-none"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {t("home.hero.workedWith")}
        </h3>

        <div className="pointer-events-none absolute top-0 left-0 h-full w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10" />

        <div
          dir="ltr"
          className="w-full overflow-hidden whitespace-nowrap"
          onMouseEnter={() => (isHovering.current = true)}
          onMouseLeave={() => (isHovering.current = false)}
        >
          <motion.div
            ref={tickerTrackRef}
            className="items-center gap-14 py-2 inline-flex"
            style={{ x }}
          >
            {loopedItems.map((tech, i) => (
              <div
                key={`partner-${i}`}
                className="flex flex-col items-center justify-center cursor-pointer group px-4 shrink-0 transition-transform duration-300"
              >
                <div className="w-30 h-30 p-3 bg-neutral-50 border border-neutral-100 rounded-2xl flex items-center justify-center transition-all duration-300 ease-out transform group-hover:-translate-y-1 group-hover:scale-105 group-hover:bg-white group-hover:shadow-lg group-hover:border-transparent">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="max-w-full max-h-full object-contain filter transition-all duration-500"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </motion.div>
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
              {eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
              {showreelTitle}
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
              key={videoSrc}
              ref={videoRef}
              src={videoSrc}
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

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-white/15 bg-white/5 px-2 py-2 ps-7 text-sm font-black uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-300 hover:border-[#0e985d]/50 hover:bg-[#0e985d] hover:shadow-[0_0_40px_rgba(14,152,93,0.35)]"
            >
              <span>{t("home.hero.seeProjects")}</span>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white">
                {isArabic ? (
                  <FaArrowLeft size={12} />
                ) : (
                  <FaArrowRight size={12} />
                )}
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
