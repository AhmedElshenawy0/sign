import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
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

  return (
    <div className="bg-black text-white">
      {/* Hero Top Section */}
      <section className="main-section relative h-screen w-full overflow-hidden flex items-center justify-center mt-6">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />

        {/* Centered Content */}
        <motion.div
          className="z-10 text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="p-3 border border-white rounded-full w-fit mx-auto mb-6 bg-[#3a0d4e]/90 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/SignUp Logo White.png"
              width={90}
              height={90}
              alt="Logo"
              loading="lazy"
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-green-700 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Let Us Craft Your Next Film
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We bring ideas to life with cinematic storytelling and brand-focused
            visuals.
          </motion.p>
        </motion.div>
      </section>

      {/* Showreel Section */}
      <section className="relative bg-gradient-to-tr from-green-800 to-emerald-900 py-28 px-6 flex flex-col  ">
        <motion.h2
          className="text-3xl md:text-5xl font-bold tracking-widest mb-12 bg-gradient-to-r from-white via-orange-500 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          SHOWREEL
        </motion.h2>

        <div className="relative w-full max-w-6xl shadow-2xl rounded-xl overflow-hidden">
          <motion.video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full h-full object-cover"
            loop
            playsInline
          />

          <motion.button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white p-5 rounded-full hover:bg-black transition"
            aria-label={isPaused ? "Play Video" : "Pause Video"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Hero;
