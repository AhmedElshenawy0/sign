import { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

const OurService = () => {
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
    <div className="flex flex-col gap-20">
      {/* Row 1: Video left, text right */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:flex-1 relative w-full md:max-w-[60%]">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full"
            loop
          />
          <button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-23px] md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>
        </div>
        <div className="md:flex-1 pl-8 md:px-0 w-full md:max-w-[40%] flex flex-col gap-8">
          <h1 className="text-4xl font-semibold tracking-widest">
            EMIRATES ONE&ONLY WOLGAN VALLEY
          </h1>
          <p>Resort Hero Film</p>
          <p>Client: Emirates & One&Only Resorts</p>
          <p>Location: SW, Australia</p>
        </div>
      </div>

      {/* Row 2: Text left, video right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        <div className="md:flex-1 relative w-full md:max-w-[60%] ">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full"
            loop
          />
          <button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-23px] md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>
        </div>
        <div className="md:flex-1 w-full md:max-w-[40%] flex flex-col gap-8 pl-8">
          <h1 className="text-4xl font-semibold tracking-widest">
            EMIRATES ONE&ONLY WOLGAN VALLEY
          </h1>
          <p>Resort Hero Film</p>
          <p>Client: Emirates & One&Only Resorts</p>
          <p>Location: SW, Australia</p>
        </div>
      </div>

      {/* Row 3: Video left, text right */}
      {/* Row 3: Video left, text right */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:flex-1 relative w-full md:max-w-[70%] h-[200px] md:h-[300px]">
          {" "}
          {/* Adjust height here */}
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full h-full object-cover"
            loop
          />
          <button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>
        </div>
        <div className="md:flex-1 w-full md:max-w-[30%] pl-8 flex flex-col gap-8">
          <h1 className="text-4xl font-semibold tracking-widest">
            EMIRATES ONE&ONLY WOLGAN VALLEY
          </h1>
          <p>Resort Hero Film</p>
          <p>Client: Emirates & One&Only Resorts</p>
          <p>Location: SW, Australia</p>
        </div>
      </div>

      {/* Row 4: Text left, video right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        <div className="md:flex-1 relative w-full md:max-w-[60%]">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full"
            loop
          />
          <button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-23px] md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>
        </div>
        <div className="md:flex-1 w-full md:max-w-[40%] flex flex-col gap-8 pl-8">
          <h1 className="text-4xl font-semibold tracking-widest">
            EMIRATES ONE&ONLY WOLGAN VALLEY
          </h1>
          <p>Resort Hero Film</p>
          <p>Client: Emirates & One&Only Resorts</p>
          <p>Location: SW, Australia</p>
        </div>
      </div>

      {/* Row 5: Video left, text right */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:flex-1 relative w-full md:max-w-[60%]">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full"
            loop
          />
          <button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-23px] md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>
        </div>
        <div className="md:flex-1 w-full md:max-w-[40%] flex flex-col pl-8 gap-8">
          <h1 className="text-4xl font-semibold tracking-widest">
            EMIRATES ONE&ONLY WOLGAN VALLEY
          </h1>
          <p>Resort Hero Film</p>
          <p>Client: Emirates & One&Only Resorts</p>
          <p>Location: SW, Australia</p>
        </div>
      </div>

      {/* Row 6: Text left, video right */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-8">
        <div className="md:flex-1 relative w-full md:max-w-[60%]">
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            className="w-full"
            loop
          />
          <button
            onClick={toggleVideo}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-23px] md:-translate-y-1/2 bg-black/60 text-white p-4 rounded-full hover:bg-black/80 transition"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>
        </div>
        <div className="md:flex-1 w-full md:max-w-[40%] flex flex-col gap-8 pl-8">
          <h1 className="text-4xl font-semibold tracking-widest">
            EMIRATES ONE&ONLY WOLGAN VALLEY
          </h1>
          <p>Resort Hero Film</p>
          <p>Client: Emirates & One&Only Resorts</p>
          <p>Location: SW, Australia</p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
