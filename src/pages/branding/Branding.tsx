import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);
  return (
    <div className="text-white bg-black" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-20">
        <motion.img
          src="/images/sign11.jpg"
          alt="Branding Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="z-10 px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-main-green"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t("branding.hero.title")}{" "}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("branding.hero.description")}
          </motion.p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-6 bg-white">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center text-main-dark-green tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {t("branding.coreValues.title")}{" "}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {coreValues.map((_, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-lg hover:border-orange-500 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-main-dark-green mb-3 group-hover:text-main-red transition-colors">
                {t(`branding.coreValues.values.${index}.title`)}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t(`branding.coreValues.values.${index}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="get-in-touch py-24 px-6 text-center bg-green-700 relative h-screen flex justify-center items-center">
        <div className="relative z-10">
          <motion.h4
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("branding.cta.title")}
          </motion.h4>
          <motion.p
            className="text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("branding.cta.description")}
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block bg-main-move hover:bg-main-medium-move text-white font-bold py-3 px-10 rounded-full transition text-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            {t("branding.cta.button")}{" "}
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default BrandingPage;
