import { FaInstagram } from "react-icons/fa6";
import NoisyBg from "./NoisyBg";

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-14 py-12 md:py-16 text-gray-200 bg-gradient-to-r from-main-green to-main-dark-green backdrop-blur-md overflow-hidden select-none">
      <NoisyBg />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Top/Main Section: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-b border-white/10 pb-12">
          {/* Left Side: Brand Pitch & Reach */}
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-xl font-black uppercase tracking-wider text-white">
              Signup Agency
            </h4>
            <p className="leading-relaxed text-sm md:text-base text-gray-200/80 max-w-xl mx-auto lg:mx-0">
              We proudly serve clients across Egypt — from Cairo, Alexandria,
              Giza, and New Cairo, to the North Coast, Red Sea, and Upper Egypt.
              Whether you're a rising local brand or an international business
              expanding into the MENA region, Signup brings a fresh and
              results-driven approach to marketing.
            </p>
          </div>

          {/* Right Side: High-Intent Actions (Contact & Social) */}
          <div className="flex flex-col items-center lg:items-end justify-center gap-6 h-full">
            <div className="text-center lg:text-right">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-300 block mb-1">
                Drop us a line
              </span>
              <a
                href="mailto:contact@signupagency.eg"
                className="text-xl md:text-2xl font-black text-white hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-400/40 underline-offset-4"
              >
                contact@signupagency.eg
              </a>
            </div>

            {/* Social Links with professional sizing */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center border border-white/20 hover:border-white bg-white/5 hover:bg-white text-white hover:text-main-dark-green rounded-full p-3.5 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Bottom Section: Legal & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs md:text-sm text-gray-300/70 font-medium">
          {/* Legal Info */}
          <p className="text-center md:text-left max-w-md md:max-w-none leading-relaxed">
            Signup Agency LLC. Registered in Egypt. CR No. 987654321 |{" "}
            <a
              href="/privacy"
              className="underline hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </p>

          {/* Copyright & Credits */}
          <p className="text-center md:text-right">
            Website & Content ©{" "}
            <span className="text-white font-bold">Signup</span> 2026 — Powered
            by{" "}
            <a
              href="https://rikaz.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold tracking-wide"
            >
              Rikaz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
