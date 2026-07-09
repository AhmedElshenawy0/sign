import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { galleries } from "../../dummyData";
import { useTranslation } from "react-i18next";

const ShowReels = () => {
  // const [playing, setPlaying] = useState(false);
  // const mainVideoRef = useRef<HTMLVideoElement>(null);

  // const handleToggleMainVideo = () => {
  //   const video = mainVideoRef.current;
  //   if (video) {
  //     video.paused ? video.play() : video.pause();
  //     setPlaying(!video.paused);
  //   }
  // };
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);

  const categories = [
    { id: "all", label: t("projects.categories.all") },
    { id: "logos", label: t("projects.categories.logos") },
    { id: "designs", label: t("projects.categories.designs") },
    { id: "videos", label: t("projects.categories.videos") },
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtering
  const filteredVideos =
    selectedCategory === "all"
      ? galleries
      : galleries.filter((item) => item?.type === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVideos = filteredVideos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div className="text-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden pt-20">
        <motion.img
          src="/images/sign3.jpg"
          className="absolute w-full h-full inset-0 object-cover opacity-25"
          alt=""
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="z-10 px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 text-main-green"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t("projects.hero.title")}{" "}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {t("projects.hero.description")}
          </motion.p>
          <motion.div
            className="mt-20 flex flex-col items-center text-3xl animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <IoIosArrowDown />
            <IoIosArrowDown />
            <IoIosArrowDown />
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="px-6 md:px-14 py-24 bg-gradient-to-t from-white to-gray-50">
        {/* Header */}
        <div className="flex flex-col items-center mb-14">
          <motion.div
            className="p-4 border border-white/30 rounded-full w-fit mx-auto mb-6 bg-main-move shadow-md backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/images/SignUp Logo White.png"
              width={90}
              height={90}
              alt="Sign Up Logo"
              loading="lazy"
            />
          </motion.div>
          <h3 className="text-3xl font-bold text-main-dark-green text-center">
            {t("projects.moreProjects.heading")}
          </h3>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            {t("projects.moreProjects.description")}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 cursor-pointer rounded-full border font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-main-dark-green text-white"
                  : "bg-white border-main-dark-green text-main-dark-green hover:bg-main-dark-green hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedVideos.map((item, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg group bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {item.type === "videos" ? (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover"
                  controls
                  poster={item.poster}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 p-3 text-sm text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2 flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition ${
                  currentPage === i + 1
                    ? "bg-main-dark-green text-white"
                    : "bg-white text-main-dark-green border border-main-dark-green hover:bg-main-dark-green hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-14 py-20 text-center border-t border-gray-700 get-in-touch h-screen flex justify-center items-center">
        <div className="relative z-10">
          <motion.h4
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t("projects.cta.title")}
          </motion.h4>
          <motion.p
            className="text-gray-400 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {t("projects.cta.description")}
          </motion.p>
          <motion.a
            href="/contact"
            className="inline-block bg-main-move text-white font-bold py-3 px-8 rounded-full hover:bg-main-medium-move transition text-lg"
            whileHover={{ scale: 1.05 }}
          >
            {t("projects.cta.button")}
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default ShowReels;
