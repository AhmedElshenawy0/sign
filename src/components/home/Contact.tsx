import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="relative text-center aspect-[1/1.5] sm:aspect-[2.1/1] mt-24 px-3 flex justify-center items-center flex-col text-white gap-6 z-10">
      <div className="bg-black/50 absolute top-0 right-0 w-full h-full" />
      <motion.video
        src="/images/89985-620432901.mp4"
        className="w-full h-full object-cover absolute top-0 right-0"
        loop
        playsInline
        autoPlay
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />
      <h1 className="z-10 text-3xl font-semibold tracking-wider">
        THE SEARCH IS OVER
      </h1>
      <p className="z-10">
        Get in touch and lets discover what we can do for your brand.
      </p>
      <button className="p-3 z-10 rounded-3xl border border-orange-500 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition">
        Contact
      </button>
    </div>
  );
};

export default Contact;
