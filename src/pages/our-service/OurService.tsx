import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";
import { debounce } from "lodash";

const services = [
  {
    title: "Website Development",
    description:
      "We build modern, responsive, and high-performing websites to help your business grow online.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80",
  },
  {
    title: "Digital Marketing",
    description:
      "Boost your brand with powerful marketing strategies that attract and retain customers.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
  },
  {
    title: "Creative Design",
    description:
      "Our design team crafts beautiful visuals and experiences that capture attention and inspire action.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
  },
];

const OurService = () => {
  const [current, setCurrent] = useState(0);

  // Move slider every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Debounced manual control
  const nextSlide = debounce(() => {
    setCurrent((prev) => (prev + 1) % services.length);
  }, 300);

  const prevSlide = debounce(() => {
    setCurrent((prev) => (prev - 1 + services.length) % services.length);
  }, 300);
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  const slides = [
    {
      image: "/images/sign2.jpg",
      title: "We create responsive, elegant, and high-performing websites.",
      features: [
        {
          title: "Custom-built Solutions",
          desc: "Tailored websites that reflect your unique business goals.",
        },
        {
          title: "SEO Optimized",
          desc: "Ensure your site ranks high and attracts the right audience.",
        },
      ],
    },
    {
      image: "/images/sign2.jpg",
      title: "We grow your business with powerful digital marketing.",
      features: [
        {
          title: "Social Media Campaigns",
          desc: "Engage your audience where they spend most of their time.",
        },
        {
          title: "Performance Analytics",
          desc: "Track, optimize, and improve your results continuously.",
        },
      ],
    },
    {
      image: "/images/sign2.jpg",
      title: "Design that connects emotionally and converts effectively.",
      features: [
        {
          title: "Brand Identity",
          desc: "Logos, visuals, and colors that speak your brand’s language.",
        },
        {
          title: "User Experience (UX)",
          desc: "Delightful, intuitive designs focused on user engagement.",
        },
      ],
    },
  ];

  const [index, setIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const slide = slides[index];

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-white text-black" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <video
          src="/videos/3141208-uhd_3840_2160_25fps.mp4"
          className="absolute w-full h-full object-cover z-0"
          loop
          autoPlay
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="relative z-20 text-center px-6 max-w-3xl">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-green-400"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("ourServices.heroSection.title", "Our Digital Solutions")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t(
              "ourServices.heroSection.subtitle",
              "We help you create stunning websites, effective marketing, and beautiful designs."
            )}
          </motion.p>
        </div>
      </section>

      {/* Slide Showcase */}
      <section className="relative h-[90vh] my-12 flex items-end mx-6 md:mx-14 overflow-hidden rounded-3xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.image}
            src={slide.image}
            alt="Slide background"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x,
              y: mousePos.y,
            }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />

        <motion.div
          key={slide.title}
          className="relative min-h-[70%] bg-black/70 backdrop-blur-md text-white py-10 px-8 md:px-14 rounded-tl-3xl border-l border-t border-white/10 shadow-xl"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-extrabold text-3xl md:text-4xl leading-snug mb-6 text-green-400">
            {slide.title}
          </h1>

          {slide.features.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-4 mb-5 items-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              <FaCheckCircle className="text-green-400 mt-1" size={22} />
              <div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}

          <motion.button
            className="uppercase mt-8 bg-green-400 py-3 px-8 rounded-lg font-semibold text-black shadow-md hover:bg-green-300 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </motion.div>

        <div className="absolute bottom-6 right-8 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-green-400 scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Cards */}
      <section className="bg-gray-950 text-white py-16 px-4 flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Our Services
        </h2>

        <div className="relative w-full max-w-5xl h-[400px] overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence>
            <motion.div
              key={current}
              className="absolute w-full h-full flex flex-col md:flex-row items-center justify-center bg-gray-900 pb-10"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={services[current].image}
                alt={services[current].title}
                className="w-full md:w-1/2 h-64 md:h-full object-cover"
              />
              <div className="p-6 md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-semibold mb-3">
                  {services[current].title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {services[current].description}
                </p>
                <button className="px-5 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                  Learn More
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual controls */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full ${
                i === current ? "bg-green-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="h-[70vh] bg-gradient-to-br from-green-600 to-black text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <motion.h4
          className="text-4xl md:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("ourServices.cta.heading", "Ready to grow your business with us?")}
        </motion.h4>
        <motion.p
          className="text-gray-200 mb-10 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {t(
            "ourServices.cta.desc",
            "Let’s build your digital presence through world-class websites, smart marketing, and creative design."
          )}
        </motion.p>
        <motion.a
          href="/contact"
          className="bg-white text-black font-semibold py-3 px-10 rounded-full shadow-lg hover:bg-gray-200 transition text-lg"
          whileHover={{ scale: 1.05 }}
        >
          {t("ourServices.cta.button", "Contact Us")}
        </motion.a>
      </section>
    </div>
  );
};

export default OurService;
