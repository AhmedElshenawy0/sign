import { motion } from "framer-motion";
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
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-black relative overflow-hidden pt-20">
        <motion.img
          src="/images/sign5.jpg"
          alt="Our Services"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />
        
        <div className="relative z-10 px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-green-700"
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
      <section className="py-24 px-6 bg-gradient-to-t from-black to-zinc-900">
        <motion.h2
          className="text-3xl font-semibold text-center mb-16 text-orange-500"
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
              className="bg-black/60 p-6 rounded-xl shadow-lg text-center hover:bg-black/80 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-green-700 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-black border-t border-gray-700">
        <motion.h4
          className="text-3xl font-bold mb-6 text-orange-500"
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
          className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition text-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get In Touch
        </motion.a>
      </section>
    </div>
  );
};

export default OurService;
