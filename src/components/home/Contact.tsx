import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import GridBg from "../global/GridBg";

const Contact = () => {
  return (
    <section className="relative  w-full max-w-[92%] mx-auto aspect-[1/1.2] sm:aspect-[2.2/1] my-32 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden flex items-center justify-center text-white bg-white border border-zinc-800 shadow-2xl">
      <video
        src="/images/89985-620432901.mp4"
        className="w-full h-full object-cover absolute inset-0 scale-105"
        loop
        playsInline
        autoPlay
        muted
      />

      <GridBg variant="light" />
      <motion.div
        className="relative z-10 text-center md:text-left px-8 md:px-20 w-full flex flex-col items-center md:items-start gap-6 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] font-black tracking-[0.35em] uppercase text-accent-color border border-accent-color/30 rounded-full px-5 py-2 backdrop-blur-xl bg-black/20">
          Let's Create Together
        </span>

        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] max-w-xl">
          The Search <br />
          Is Over.
        </h2>

        <p className="text-zinc-300 text-base md:text-lg max-w-sm font-medium leading-relaxed">
          Partner with our creative laboratory and shift your business into
          absolute regional prominence.
        </p>

        <button className="group mt-4 inline-flex items-center gap-3 py-4 px-10 rounded-full border border-main-move bg-main-move text-main-white hover:bg-main-medium-move font-bold tracking-wide cursor-pointer transition-all duration-300 shadow-xl">
          <span className="text-sm uppercase tracking-wider">
            Launch Project
          </span>
          <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1.5" />
        </button>
      </motion.div>
    </section>
  );
};

export default Contact;
