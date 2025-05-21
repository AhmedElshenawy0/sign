import { Link } from "react-router-dom";
import introVideo from "/videos/intro.mp4";
import { FaBoxOpen, FaLightbulb } from "react-icons/fa";

const IntroPage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex justify-center items-center font-sans">
      {/* Video Background */}
      <video
        src={introVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
      {/* Overlay AND Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-10 md:bg-black/30 bg-black/40 md:backdrop-blur-md rounded-2xl shadow-2xl w-80 sm:w-xl animate-fadeInUp">
        <img
          src="/images/SignUp Logo White.png"
          width={100}
          height={100}
          alt=""
        />
        <p className="text-white text-lg md:text-xl mb-8 opacity-90">
          We’ve got you covered with creativity & innovation.
        </p>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-700 to-purple-900 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            <FaBoxOpen /> Product
          </Link>
          <Link
            to="/home"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            <FaLightbulb /> Creative
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
