import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="px-4 py-6 md:py-10 text-gray-300 bg-gradient-to-r from-green-900 to-green-950 flex flex-col justify-center text-center gap-4">
      <button className="flex justify-center border border-white rounded-full w-fit p-1 mx-auto">
        <FaInstagram color="white" />
      </button>

      <p>contact@signupagency.eg</p>

      <p className="leading-relaxed">
        We proudly serve clients across Egypt — from Cairo, Alexandria, Giza,
        and New Cairo, to the North Coast, Red Sea, and Upper Egypt. Whether
        you're a rising local brand or an international business expanding into
        the MENA region, Signup brings a fresh and results-driven approach to
        marketing, tailored to your goals and audience.
      </p>

      <p className="mt-8 text-gray-300">
        Signup Agency LLC. Registered in Egypt. Commercial Registration No.
        987654321 |{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>
      </p>

      <p className="text-gray-400 text-sm text-center">
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
