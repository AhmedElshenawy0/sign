import { FaPause, FaPlay, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SectionProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPaused: boolean;
  setPaused: (v: boolean) => void;
  layout: "left" | "right";
  videoHeight?: string;
  videoCover?: boolean;
  poster: string;
  title: string;
  desc: string;
  index: number;
  caseLabel: string;
  tag?: string;
  stat?: string;
  ctaText?: string;
  ctaHref?: string;
}

const Section = ({
  videoRef,
  isPaused,
  setPaused,
  layout,
  videoHeight = "aspect-video",
  videoCover = true,
  poster,
  title,
  desc,
  index,
  caseLabel,
  tag,
  stat,
  ctaText,
  ctaHref = "/projects",
}: SectionProps) => {
  const isVideoLeft = layout === "left";

  const brandPills = [
    {
      text: "text-main-move bg-main-move/5 border-main-move/10",
      glow: "group-hover:shadow-[0_20px_50px_rgba(var(--color-main-move),0.12)]",
      btnGlow:
        "bg-main-move/10 text-main-move hover:bg-main-move hover:text-white",
    },
    {
      text: "text-main-red bg-main-red/5 border-main-red/10",
      glow: "group-hover:shadow-[0_20px_50px_rgba(var(--color-main-red),0.12)]",
      btnGlow:
        "bg-main-red/10 text-main-red hover:bg-main-red hover:text-white",
    },
    {
      text: "text-main-green bg-main-green/5 border-main-green/10",
      glow: "group-hover:shadow-[0_20px_50px_rgba(var(--color-main-green),0.12)]",
      btnGlow:
        "bg-main-green/10 text-main-green hover:bg-main-green hover:text-white",
    },
  ];
  const activeStyle = brandPills[(index - 1) % brandPills.length];

  const handleVideoPlayback = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch((err) => console.log("Playback interrupted:", err));
        setPaused(false);
      } else {
        video.pause();
        setPaused(true);
      }
    }
  };

  return (
    <motion.div
      className={`max-w-7xl mx-auto flex flex-col ${
        isVideoLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-12 md:gap-20 px-6 md:px-14 w-full group`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Video Container Module Frame Layout */}
      <div
        className={`w-full md:w-[58%] relative ${videoHeight} rounded-[1.75rem] overflow-hidden border border-slate-100 bg-slate-50 transition-all duration-500 ease-out transform group-hover:-translate-y-1.5 ${activeStyle.glow}`}
      >
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          className={`w-full transition-transform duration-700 ${videoCover ? "h-full object-cover" : ""} ${!isPaused ? "scale-[1.015]" : "scale-100"}`}
          loop
          muted
          poster={poster}
          playsInline
        />

        {/* Interactive Play Button Backdrop layer mask */}
        <div className="absolute inset-0 bg-black/[0.01] group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <button
            onClick={handleVideoPlayback}
            className={`w-16 h-16 rounded-full shadow-xl flex items-center justify-center backdrop-blur-md transition-all duration-300 ease-out cursor-pointer scale-90 md:scale-95 group-hover:scale-100 md:opacity-0 group-hover:opacity-100 border border-white/20 ${
              isPaused
                ? "bg-white text-slate-900 hover:bg-slate-900 hover:text-white"
                : activeStyle.btnGlow
            }`}
          >
            {isPaused ? (
              <FaPlay size={14} className="ml-0.5" />
            ) : (
              <FaPause size={14} />
            )}
          </button>
        </div>

        {/* Result stat badge — sits on the video corner as quick social proof */}
        {stat && (
          <div
            className={`absolute bottom-4 ${isVideoLeft ? "left-4" : "right-4"} rtl:left-4 rtl:right-auto bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-white/40`}
          >
            <span
              className={`text-sm font-black ${activeStyle.text.split(" ")[0]}`}
            >
              {stat}
            </span>
          </div>
        )}
      </div>

      {/* Narrative Context Details Typography box Layout panel */}
      <motion.div
        className="w-full md:w-[42%] flex flex-col gap-5"
        initial={{ opacity: 0, x: isVideoLeft ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-[10px] font-black tracking-[0.35em] uppercase text-slate-400 select-none">
            {caseLabel} // {String(index).padStart(2, "0")}
          </span>
          {tag && (
            <span
              className={`text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 border ${activeStyle.text}`}
            >
              {tag}
            </span>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-[1.15] text-slate-900 uppercase">
          {title}
        </h3>

        <p className="text-slate-600 text-sm font-medium leading-relaxed">
          {desc}
        </p>

        {ctaText && (
          <Link
            to={ctaHref}
            className={`group/cta inline-flex items-center gap-2 w-fit mt-1 text-xs font-black uppercase tracking-widest ${activeStyle.text.split(" ")[0]} hover:gap-3 transition-all duration-300`}
          >
            {ctaText}
            <FaArrowRight
              size={11}
              className="rtl:rotate-180 transition-transform group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1"
            />
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Section;
