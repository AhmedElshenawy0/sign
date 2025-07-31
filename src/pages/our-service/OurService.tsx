import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  FaBullhorn,
  FaPenNib,
  FaVideo,
  FaCameraRetro,
  FaPalette,
  FaGlobe,
} from "react-icons/fa";

const services = [
  {
    title: "Brand Strategy",
    description:
      "We build identities with purpose — aligning mission, vision, and values.",
    icon: <FaBullhorn size={32} />,
  },
  {
    title: "Creative Direction",
    description:
      "From concept to execution, we guide the full visual narrative of your brand.",
    icon: <FaPenNib size={32} />,
  },
  {
    title: "Video Production",
    description:
      "High-impact storytelling through cinematic and commercial-grade visuals.",
    icon: <FaVideo size={32} />,
  },
  {
    title: "Photography",
    description:
      "Capturing timeless visuals that connect emotionally with your audience.",
    icon: <FaCameraRetro size={32} />,
  },
  {
    title: "Graphic Design",
    description:
      "Custom design for digital & print — logos, brochures, packaging and more.",
    icon: <FaPalette size={32} />,
  },
  {
    title: "Web & Digital",
    description:
      "Web experiences that are fast, responsive, and aligned with your brand.",
    icon: <FaGlobe size={32} />,
  },
];

const OurService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="text-black bg-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-20 bg-black text-white">
        <motion.video
          src="/videos/3141208-uhd_3840_2160_25fps.mp4"
          className="w-full h-full object-cover absolute top-0 right-0 z-0"
          loop
          playsInline
          autoPlay
          muted
          aria-label="Branding services promotional video"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="relative z-20 px-4 max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-main-green"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            From branding to digital, we create with strategy, style, and
            impact.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6 bg-white">
        <motion.h2
          className="text-3xl font-semibold text-center mb-16 text-main-dark-green"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow-lg text-center transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-main-green mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-main-dark-green">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center get-in-touch relative z-10 border-t border-gray-700 h-screen flex justify-center items-center">
        <div className="relative z-10">
          <motion.h4
            className="text-3xl md:text-4xl font-bold mb-6 text-white z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Let's Elevate Your Brand Together
          </motion.h4>
          <motion.p
            className="text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Whether you're starting fresh or scaling up — our team is ready to
            help you make an impact.
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block bg-main-move text-white font-bold py-3 px-8 rounded-full hover:bg-main-medium-move transition text-lg"
            whileHover={{ scale: 1.05 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default OurService;
