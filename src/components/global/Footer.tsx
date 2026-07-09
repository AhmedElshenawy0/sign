import { FaInstagram } from "react-icons/fa6";
import NoisyBg from "./NoisyBg";

const Footer = () => {
  return (
    <div className="relative px-6 md:px-14 py-6 md:py-10 text-gray-200 bg-gradient-to-r from-main-green to-main-dark-green  backdrop-blur-md flex flex-col justify-center text-center gap-4">
      <NoisyBg />

      <button className="flex relative justify-center border border-white rounded-full w-fit p-1 mx-auto">
        <FaInstagram color="white" />
      </button>

      <p className=" font-semibold relative">contact@signupagency.eg</p>

      <p className="leading-relaxed relative text-gray-200">
        We proudly serve clients across Egypt — from Cairo, Alexandria, Giza,
        and New Cairo, to the North Coast, Red Sea, and Upper Egypt. Whether
        you're a rising local brand or an international business expanding into
        the MENA region, Signup brings a fresh and results-driven approach to
        marketing, tailored to your goals and audience.
      </p>

      <p className="mt-8   font-medium relative text-gray-200">
        Signup Agency LLC. Registered in Egypt. Commercial Registration No.
        987654321 |{" "}
        <span className="underline cursor-pointer relative text-gray-200">
          Privacy Policy
        </span>
      </p>

      <p className="text-gray-200 text-sm text-center relative">
        Website & Content ©{" "}
        <span className="text-white font-medium">Signup</span> 2025 — Powered by{" "}
        <span className="text-emerald-400 hover:text-emerald-300 transition font-bold">
          Rikaz
        </span>
      </p>
    </div>
  );
};

export default Footer;
