import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaCheckCircle } from "react-icons/fa";

const OurService = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Structural dynamic data map for the premium interactive feature slider
  const slides = [
    {
      id: "web-dev",
      image: "/images/sign2.jpg",
      titleKey: "ourServices.slides.webDev.title",
      defaultTitle:
        "We create responsive, elegant, and high-performing websites.",
      features: [
        {
          titleKey: "ourServices.slides.webDev.f1.title",
          defaultTitle: "Custom-built Solutions",
          descKey: "ourServices.slides.webDev.f1.desc",
          defaultDesc:
            "Tailored websites that reflect your unique business goals.",
        },
        {
          titleKey: "ourServices.slides.webDev.f2.title",
          defaultTitle: "SEO Optimized",
          descKey: "ourServices.slides.webDev.f2.desc",
          defaultDesc:
            "Ensure your site ranks high and attracts the right audience.",
        },
      ],
    },
    {
      id: "marketing",
      image: "/images/sign2.jpg",
      titleKey: "ourServices.slides.marketing.title",
      defaultTitle: "We grow your business with powerful digital marketing.",
      features: [
        {
          titleKey: "ourServices.slides.marketing.f1.title",
          defaultTitle: "Social Media Campaigns",
          descKey: "ourServices.slides.marketing.f1.desc",
          defaultDesc:
            "Engage your audience where they spend most of their time.",
        },
        {
          titleKey: "ourServices.slides.marketing.f2.title",
          defaultTitle: "Performance Analytics",
          defaultDesc:
            "Track, optimize, and improve your results continuously.",
          descKey: "ourServices.slides.marketing.f2.desc",
        },
      ],
    },
    {
      id: "design",
      image: "/images/sign2.jpg",
      titleKey: "ourServices.slides.design.title",
      defaultTitle:
        "Design that connects emotionally and converts effectively.",
      features: [
        {
          titleKey: "ourServices.slides.design.f1.title",
          defaultTitle: "Brand Identity",
          descKey: "ourServices.slides.design.f1.desc",
          defaultDesc:
            "Logos, visuals, and colors that speak your brand’s language.",
        },
        {
          titleKey: "ourServices.slides.design.f2.title",
          defaultTitle: "User Experience (UX)",
          descKey: "ourServices.slides.design.f2.desc",
          defaultDesc:
            "Delightful, intuitive designs focused on user engagement.",
        },
      ],
    },
  ];

  // Static services data for the secondary overview card presentation grid
  const coreServices = [
    {
      titleKey: "ourServices.core.web.title",
      defaultTitle: "Website Development",
      descKey: "ourServices.core.web.desc",
      defaultDesc:
        "We build modern, responsive, and high-performing websites to help your business grow online.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80",
    },
    {
      titleKey: "ourServices.core.marketing.title",
      defaultTitle: "Digital Marketing",
      descKey: "ourServices.core.marketing.desc",
      defaultDesc:
        "Boost your brand with powerful marketing strategies that attract and retain customers.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
    },
    {
      titleKey: "ourServices.core.design.title",
      defaultTitle: "Creative Design",
      descKey: "ourServices.core.design.desc",
      defaultDesc:
        "Our design team crafts beautiful visuals and experiences that capture attention and inspire action.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    },
  ];

  const [index, setIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const slide = slides[index];

  // Auto rotation ticker for the main hero deck showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Smooth mouse movement parallax capture window tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="bg-neutral-50 text-slate-900 min-h-screen relative"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. STICKY HERO CONTAINER (الفيديو ثابت والكلام يتحرك عادي) */}
      <section className="relative h-screen w-full z-10 bg-black">
        {/* الحاوية الثابتة للفيديو والخلفية الغامقة */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0">
          <video
            src="/videos/3141208-uhd_3840_2160_25fps.mp4"
            className="absolute w-full h-full object-cover pointer-events-none"
            loop
            autoPlay
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/65" />
        </div>

        {/* النصوص التي تظهر فوق الفيديو وتصعد لأعلى مع السكرول طبيعياً */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-main-green"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("ourServices.heroSection.title", "Our Digital Solutions")}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t(
              "ourServices.heroSection.subtitle",
              "We help you create stunning websites, effective marketing, and beautiful designs.",
            )}
          </motion.p>
        </div>
      </section>

      {/* 2. OPAQUE SECTIONS CONTAINER (السكاشن المعتمة التي تغطي وتخفي الهيرو) */}
      <div className="relative z-20 bg-neutral-50 shadow-[-5px_-20px_40px_rgba(0,0,0,0.3)] rounded-t-[2.5rem] md:rounded-t-[4rem] pt-1">
        {/* Premium Interactive Fluid Slide Showcase Panel */}
        <section className="relative min-h-[85vh] my-20 flex items-end mx-4 md:mx-14 overflow-hidden rounded-[2rem] shadow-xl bg-slate-900 border border-neutral-200/10">
          <div className="absolute inset-0 z-0 bg-slate-950 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide.id}
                src={slide.image}
                alt="Showcase Visual Backdrop"
                className="absolute inset-0 w-full h-full object-cover opacity-40 select-none pointer-events-none"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{
                  opacity: 0.4,
                  scale: 1,
                  x: mousePos.x,
                  y: mousePos.y,
                }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Floating Interactive Card Deck Block */}
          <div className="relative z-20 w-full grid md:grid-cols-12 items-end">
            <div className="md:col-span-8 lg:col-span-7 bg-black/50 backdrop-blur-xl text-white py-12 px-8 md:px-14 rounded-tr-[2rem] border-t border-r border-white/10 shadow-2xl space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <h2 className="font-black text-3xl md:text-4xl tracking-tight text-main-green uppercase leading-tight">
                    {t(slide.titleKey, slide.defaultTitle)}
                  </h2>

                  <div className="space-y-5">
                    {slide.features.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <FaCheckCircle
                          className="text-main-green mt-1 flex-shrink-0"
                          size={20}
                        />
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-white tracking-wide">
                            {t(item.titleKey, item.defaultTitle)}
                          </h3>
                          <p className="text-slate-300 text-sm font-medium leading-relaxed">
                            {t(item.descKey, item.defaultDesc)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <motion.a
                href="/contact"
                className="inline-block uppercase tracking-wider text-xs font-black bg-main-green py-4 px-8 rounded-full text-slate-950 shadow-lg shadow-main-green/10 hover:bg-green-300 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("ourServices.global.getStarted", "Get Started")}
              </motion.a>
            </div>

            {/* Pagination Navigation Dots */}
            <div className="md:col-span-4 lg:col-span-5 flex justify-center md:justify-end p-8 md:p-12 z-30">
              <div className="flex gap-3 bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      i === index
                        ? "bg-main-green scale-125 shadow-md shadow-main-green/50"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Structural Static Presentation Services Deck */}
        <section className="py-24 px-6 md:px-14 max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
              {t("ourServices.coreSection.heading", "Our Specialized Stack")}
            </h2>
            <p className="text-slate-500 font-medium text-base md:text-lg">
              {t(
                "ourServices.coreSection.subheading",
                "Engineered to elevate your presence with uncompromising pixel accuracy.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl border border-neutral-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-52 w-full overflow-hidden relative bg-neutral-100">
                  <img
                    src={service.image}
                    alt={service.defaultTitle}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
                      {t(service.titleKey, service.defaultTitle)}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      {t(service.descKey, service.defaultDesc)}
                    </p>
                  </div>
                  <a
                    href="/contact"
                    className="text-xs font-black uppercase tracking-widest text-main-green group-hover:text-green-600 transition-colors inline-flex items-center gap-1.5 self-start"
                  >
                    {t("ourServices.global.learnMore", "Learn More")}{" "}
                    <span className="rtl:rotate-180">→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Fluid Contrast Action Closure Call Space */}
        <section className="h-[65vh] bg-gradient-to-br from-slate-950 via-slate-900 to-main-dark-green text-white flex flex-col items-center justify-center text-center px-6 relative overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-inner">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <motion.h4
              className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t(
                "ourServices.cta.heading",
                "Ready to grow your business with us?",
              )}
            </motion.h4>
            <motion.p
              className="text-slate-300 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {t(
                "ourServices.cta.desc",
                "Let’s build your digital presence through world-class websites, smart marketing, and creative design.",
              )}
            </motion.p>
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.a
                href="/contact"
                className="inline-block bg-white text-slate-950 font-black tracking-widest text-xs uppercase py-4 px-10 rounded-full shadow-xl hover:bg-neutral-100 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {t("ourServices.cta.button", "Contact Us")}
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurService;
