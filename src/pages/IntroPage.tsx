import { Link } from "react-router-dom";
import introVideo from "/videos/intro.mp4";
import { FaBoxOpen, FaLightbulb } from "react-icons/fa";

const IntroPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center items-center font-sans bg-black select-none">
      {/* Video Background */}
      <video
        src={introVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.4] contrast-[1.05]"
      />

      {/* Premium Cinematic Overlay (Gradients for deep contrast) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 z-10" />

      {/* Main Content Area */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-2xl animate-fadeInUp">
        {/* Glow effect under logo */}
        <div className="relative group mb-4">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-1000" />
          <img
            src="/images/SignUp Logo White.png"
            width={120}
            height={120}
            alt="Signup Agency"
            className="relative transform hover:scale-102 transition-transform duration-500"
          />
        </div>

        {/* Headline */}
        <h1 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tight max-w-lg leading-tight mb-3">
          Choose Your Experience
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm md:text-base max-w-md mb-10 font-medium opacity-80 leading-relaxed">
          We’ve got you covered with tailored digital innovation and immersive
          creative experiences.
        </p>

        {/* Identity Grid: Two distinct paths */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md">
          {/* Path 1: NFC */}
          <Link
            to="https://nfc.signuptap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 w-full sm:w-52 px-6 py-4 bg-white/5 hover:bg-white text-white hover:text-black font-bold text-sm uppercase tracking-wider rounded-xl border border-white/20 hover:border-white shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaBoxOpen
              className="text-emerald-400 group-hover:text-black transition-colors"
              size={16}
            />
            <span>NFC Solutions</span>
          </Link>

          {/* Path 2: Creative */}
          <Link
            to="/home"
            className="group relative flex items-center justify-center gap-3 w-full sm:w-52 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <FaLightbulb
              className="text-white group-hover:animate-pulse"
              size={16}
            />
            <span>Creative Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
