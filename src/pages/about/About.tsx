import { useEffect, useState } from "react";
import AboutContent from "../../components/about/AboutContent";
import AboutText from "../../components/about/AboutText";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="relative flex justify-center flex-col items-center h-screen overflow-hidden bg-black"
      >
        {/* Background Image */}
        <motion.img
          src="/images/sign8.jpg"
          alt="Who Are We Background"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />

        <motion.h1
          className="uppercase text-center text-4xl md:text-7xl font-extrabold text-main-green z-10 mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("about.hero.title")}
        </motion.h1>

        <motion.p
          className="text-center text-gray-300 text-lg md:text-xl max-w-xl mx-auto z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t("about.hero.description")}
        </motion.p>
      </section>
      <AboutText />
      <AboutContent />
    </>
  );
};

export default About;
