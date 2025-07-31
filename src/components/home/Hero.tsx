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

  const loopedItems = [...workedWith, ...workedWith]
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
            className="p-4 border border-white/30 rounded-full w-fit mx-auto mb-6 bg-main-move shadow-md backdrop-blur-sm"
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

          <h1 className="text-4xl md:text-6xl font-extrabold text-main-green drop-shadow-md mb-4">
            Your Creative Partners
          </h1>

          <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
            At <strong className="text-main-red">Sign Up</strong>, we blend
            creativity, strategy, and a sprinkle of humor to turn brands into
            unforgettable vibes. Join us on a marketing journey where ideas come
            alive.
          </p>
        </motion.div>
      </section>

      {/* Curosel */}
      <div className=" py-6 border border-black bg-white">
        <h3 className="text-black pb-6 font-bold text-lg text-center">Proudly worked with</h3>

        <div className="animate-scroll gap-12">
          {loopedItems.map((tech, i) => (
            <div
              key={i}
              className="inline-flex flex-col items-center mx-6 min-w-max"
            >

              <img
                src={tech.logo}
                alt={tech.name}
                width={80}
                height={80}
                className="w-40 h-40 mb-1 rounded-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Showreel Section */}
      <section className="relative bg-gradient-to-tr from-main-green to-main-dark-green py-28 px-6">
        <motion.h2
          className="text-center text-4xl md:text-5xl font-bold tracking-wide mb-12 bg-gradient-to-r from-white to-main-red bg-clip-text text-transparent"
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
            className="w-full h-[300px] sm:h-[450px] md:h-auto object-cover"
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

          {/* Top-right Fullscreen Button */}
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
