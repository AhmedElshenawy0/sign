import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
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
    <>
      {/* Top section */}
      <div className="main-section relative w-full h-[calc(100vh+150px)] flex justify-center">
        {/* Overlay */}
        <div className="w-full h-full mt-[104px] absolute -top-26 z-0 right-0 bg-black/50"></div>

        {/* Center content */}
        <div className="z-10 relative mx-auto mt-64 text-center">
          <div className="p-2 rounded-full border-1 shadow border-white w-fit mx-auto bg-[#3a0d4e] mb-6">
            <img
              src="/images/SignUp Logo White.png"
              width={90}
              height={90}
              loading="lazy"
              alt="Logo"
            />
          </div>
          <p className="text-white font-semibold text-shadow-2xs">
            LET US CRAFT YOUR NEXT FILM
          </p>
        </div>
      </div>

      {/* Bottom section with video */}
      <div
        className="relative bg-gradient-to-tr from-green-800 to-emerald-900
 py-28 sm:p-3 md:p-12 flex flex-col justify-center"
      >
        <h1 className="mb-10 font-semibold text-3xl tracking-widest px-4 lg:text-5xl bg-gradient-to-r from-white via-gray-500 to-gray-500 bg-clip-text text-transparent">
          SHOWREEL
        </h1>
        {/* Video */}
        <video
          ref={videoRef}
          src="/videos/intro.mp4"
          className=" w-full md:rounded-xl"
          loop
        />

        {/* Pause/Play Button - Centered */}
        <button
          onClick={toggleVideo}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-2 md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
        >
          {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
        </button>
      </div>
    </>
  );
};

export default Hero;
