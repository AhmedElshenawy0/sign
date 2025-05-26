import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const ShowReels = () => {
  const [playing, setPlaying] = useState(false);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const handleToggleMainVideo = () => {
    const video = mainVideoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    }
  };

  const galleryVideos = [
    {
      title: "Brand Story – 2024",
      src: "/videos/intro.mp4",
      poster: "/images/sign3.jpg",
    },
    {
      title: "Ad Campaign – Spring",
      src: "/videos/intro.mp4",
      poster: "/images/sign2.jpg",
    },
    {
      title: "Behind The Scenes",
      src: "/videos/intro.mp4",
      poster: "/images/sign.jpg",
    },
    {
      title: "Client Testimonial",
      src: "/videos/intro.mp4",
      poster: "/images/sign7.jpg",
    },
    {
      title: "Promo Video",
      src: "/videos/intro.mp4",
      poster: "/images/sign2.jpg",
    },
    {
      title: "Music Visual",
      src: "/videos/intro.mp4",
      poster: "/images/sign10.jpg",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden pt-20">
        <motion.img
          src="/images/sign3.jpg"
          className="absolute w-full h-full inset-0 object-cover opacity-25"
          alt=""
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="z-10 px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 text-green-700"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Showreels
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            A collection of our best work — crafted to captivate and inspire.
          </motion.p>

          <motion.div
            className="mt-20 text-white flex justify-center flex-col items-center text-3xl animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <IoIosArrowDown />
            <IoIosArrowDown />
            <IoIosArrowDown />
          </motion.div>
        </div>
      </section>

      {/* Featured Showreel */}
      <section className="px-4 py-24 flex flex-col items-center bg-black">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-center text-orange-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Featured Showreel
        </motion.h2>

        <div className="relative w-full max-w-5xl shadow-xl">
          <video
            ref={mainVideoRef}
            src="/videos/intro.mp4"
            className="w-full rounded-xl"
            loop
          />
          <button
            onClick={handleToggleMainVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-700/90 text-white p-5 rounded-full hover:bg-green-800 transition"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            <FaPlay size={22} />
          </button>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 py-24 bg-gradient-to-t from-black to-zinc-900">
        <h3 className="text-center text-2xl font-semibold mb-14 text-green-700">
          More Projects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryVideos.map((video, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-md group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <video
                src={video.src}
                className="w-full h-64 object-cover"
                controls
                poster={video.poster}
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {video.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-black border-t border-gray-700">
        <motion.h4
          className="text-3xl font-bold mb-6 text-orange-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Let’s Create Something Amazing
        </motion.h4>
        <motion.p
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Ready to take your brand to the next level with captivating visuals?
          Let’s collaborate and make something unforgettable.
        </motion.p>
        <motion.a
          href="/contact"
          className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition text-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get In Touch
        </motion.a>
      </section>
    </div>
  );
};

export default ShowReels;
