import { motion } from "framer-motion";
import { useEffect } from "react";

const coreValues = [
  {
    title: "Innovation",
    description:
      "We embrace creativity and new ideas to craft unique brand experiences.",
  },
  {
    title: "Integrity",
    description:
      "Transparency and trust are the foundation of every client relationship.",
  },
  {
    title: "Collaboration",
    description:
      "We believe powerful branding comes from working closely together.",
  },
  {
    title: "Excellence",
    description:
      "From concept to execution, we strive for exceptional quality in everything we do.",
  },
  {
    title: "Sustainability",
    description:
      "We’re committed to practices that support long-term growth and responsibility.",
  },
  {
    title: "Community",
    description:
      "Building strong, inclusive brands that uplift and connect people.",
  },
];

const BrandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-20">
        <motion.img
          src="/images/sign11.jpg"
          alt="Branding Hero"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="z-10 px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 text-green-700 drop-shadow-md"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Branding Philosophy
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Branding is more than a logo. It’s a story told across every
            touchpoint — a lasting identity that inspires trust, loyalty, and
            connection.
          </motion.p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-6 bg-gradient-to-t from-black to-zinc-900">
        <motion.h2
          className="text-3xl font-semibold mb-12 text-center text-orange-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Core Values
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg hover:shadow-green-700/30 transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Guidelines Download */}
      {/* <section className="py-24 px-6 bg-black">
        <motion.h2
          className="text-3xl font-semibold mb-10 text-center text-orange-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Brand Guidelines
        </motion.h2>
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Download our detailed brand guidelines to ensure consistency across
            design, messaging, and tone.
          </motion.p>
          <motion.a
            href="/brand-guidelines.pdf"
            className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Download PDF
          </motion.a>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-black border-t border-gray-700">
        <motion.h4
          className="text-3xl font-bold mb-6 text-orange-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Let’s Build Something Great Together
        </motion.h4>
        <motion.p
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to elevate your brand with intentional, memorable design? Let’s
          collaborate and create something timeless.
        </motion.p>
        <motion.a
          href="/contact"
          className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition text-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get In Touch
        </motion.a>
      </section>
    </div>
  );
};

export default BrandingPage;
