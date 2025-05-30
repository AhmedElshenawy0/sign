import { useRef, useState } from "react";
import { FaPause, FaPlay, FaExpand } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
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
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen(); // Safari
      } else if ((video as any).mozRequestFullScreen) {
        (video as any).mozRequestFullScreen(); // Firefox
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen(); // IE/Edge
      }
    }
  };

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.img
          src="/images/sign7.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero Background"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Hero Content */}
        <motion.div
          className="z-20 text-center px-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <motion.div
            className="p-4 border border-white/30 rounded-full w-fit mx-auto mb-6 bg-[#3a0d4e]/90 shadow-md backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/SignUp Logo White.png"
              width={90}
              height={90}
              alt="Sign Up Logo"
              loading="lazy"
            />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-green-400 drop-shadow-md mb-4">
            Your Creative Partners
          </h1>

          <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
            At <strong className="text-orange-400">Sign Up</strong>, we blend
            creativity, strategy, and a sprinkle of humor to turn brands into
            unforgettable vibes. Join us on a marketing journey where ideas come
            alive.
          </p>
        </motion.div>
      </section>

      {/* Showreel Section */}
      <section className="relative bg-gradient-to-tr from-green-800 to-emerald-900 py-28 px-6">
        <motion.h2
          className="text-center text-4xl md:text-5xl font-bold tracking-wide mb-12 bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          SHOWREEL
        </motion.h2>

        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <motion.video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full h-full object-cover"
            loop
            playsInline
            muted
          />

          {/* Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.button
              onClick={toggleVideo}
              className="bg-black/70 text-white p-4 rounded-full hover:bg-black transition"
              aria-label={isPaused ? "Play Video" : "Pause Video"}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? <FaPlay size={20} /> : <FaPause size={20} />}
            </motion.button>
          </div>

          {/* Top-right Fullscreen Button (Only when playing) */}
          {!isPaused && (
            <motion.button
              onClick={openFullscreen}
              className="absolute top-4 right-4 z-20 bg-black/70 text-white p-3 rounded-full hover:bg-black transition"
              aria-label="Fullscreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExpand size={18} />
            </motion.button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hero;
