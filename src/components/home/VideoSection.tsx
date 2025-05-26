import { FaPause, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";

const Section = ({
  videoRef,
  isPaused,
  setPaused,
  layout,
  videoHeight = "",
  videoCover = false,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPaused: boolean;
  setPaused: (v: boolean) => void;
  layout: "left" | "right";
  videoHeight?: string;
  videoCover?: boolean;
}) => {
  const isVideoLeft = layout === "left";

  return (
    <motion.div
      className={`flex flex-col ${
        isVideoLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      //   viewport={{ once: true }}
    >
      <div
        className={`md:flex-1 relative w-full ${
          isVideoLeft ? "md:max-w-[60%]" : "md:max-w-[60%]"
        } ${videoHeight}`}
      >
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          className={`w-full ${videoCover ? "h-full object-cover" : ""}`}
          loop
        />
        <button
          onClick={() => {
            const video = videoRef.current;
            if (video) {
              if (video.paused) {
                video.play();
                setPaused(false);
              } else {
                video.pause();
                setPaused(true);
              }
            }
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-23px] md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
        >
          {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
        </button>
      </div>

      <motion.div
        className={`md:flex-1 w-full ${
          isVideoLeft ? "md:max-w-[40%]" : "md:max-w-[40%]"
        } pl-8 flex flex-col gap-8`}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-semibold tracking-widest">
          EMIRATES ONE&ONLY WOLGAN VALLEY
        </h1>
        <p>Resort Hero Film</p>
        <p>Client: Emirates & One&Only Resorts</p>
        <p>Location: SW, Australia</p>
      </motion.div>
    </motion.div>
  );
};

export default Section;
