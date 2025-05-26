import { useRef, useState } from "react";
// import { FaPause, FaPlay } from "react-icons/fa";
import Section from "./VideoSection";

const OurService = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const videoRef4 = useRef<HTMLVideoElement>(null);
  const videoRef5 = useRef<HTMLVideoElement>(null);
  const videoRef6 = useRef<HTMLVideoElement>(null);

  const [paused1, setPaused1] = useState(true);
  const [paused2, setPaused2] = useState(true);
  const [paused3, setPaused3] = useState(true);
  const [paused4, setPaused4] = useState(true);
  const [paused5, setPaused5] = useState(true);
  const [paused6, setPaused6] = useState(true);

  // const handleToggle = (
  //   videoRef: React.RefObject<HTMLVideoElement>,
  //   setPaused: (v: boolean) => void
  // ) => {
  //   const video = videoRef.current;
  //   if (video) {
  //     if (video.paused) {
  //       video.play();
  //       setPaused(false);
  //     } else {
  //       video.pause();
  //       setPaused(true);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-20">
      {/* Section 1: Video Left */}
      <Section
        videoRef={videoRef1 as any}
        isPaused={paused1}
        setPaused={setPaused1}
        layout="left"
      />

      {/* Section 2: Video Right */}
      <Section
        videoRef={videoRef2 as any}
        isPaused={paused2}
        setPaused={setPaused2}
        layout="right"
      />

      {/* Section 3: Custom height */}
      <Section
        videoRef={videoRef3 as any}
        isPaused={paused3}
        setPaused={setPaused3}
        layout="left"
        videoHeight="h-[200px] md:h-[300px]"
        videoCover
      />

      {/* Section 4: Video Right */}
      <Section
        videoRef={videoRef4 as any}
        isPaused={paused4}
        setPaused={setPaused4}
        layout="right"
      />

      {/* Section 5: Video Left */}
      <Section
        videoRef={videoRef5 as any}
        isPaused={paused5}
        setPaused={setPaused5}
        layout="left"
      />

      {/* Section 6: Video Right */}
      <Section
        videoRef={videoRef6 as any}
        isPaused={paused6}
        setPaused={setPaused6}
        layout="right"
      />
    </div>
  );
};

export default OurService;
