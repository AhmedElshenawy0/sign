import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const langRef = useRef<HTMLDivElement>(null);

  const isArabic = i18n.language === "ar";

  // تفعيل مستمع السكرول لتحديث حالة الخلفية فوراً عند النزول
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: "/home" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.branding"), path: "/branding" },
    { name: t("nav.services"), path: "/ourService" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const languages = [
    { code: "en", short: "EN", flag: "https://flagcdn.com/us.svg" },
    { code: "ar", short: "AR", flag: "https://flagcdn.com/eg.svg" },
    { code: "fr", short: "FR", flag: "https://flagcdn.com/fr.svg" },
  ];

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    setLangOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-3 md:px-14 border-b transition-all duration-500 ease-in-out ${
        scrolled || menuOpen
          ? "bg-black/60 backdrop-blur-2xl border-white/5 shadow-2xl"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          to="/"
          className="w-14 h-14 p-1 rounded-full overflow-hidden relative shrink-0 z-50"
        >
          <img
            src="/images/SignUp Logo White.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-[13px] font-black uppercase tracking-widest relative text-white">
          {navLinks.map(({ name, path }, i) => {
            const isActive = pathname === path;
            return (
              <li key={i}>
                <Link
                  to={path}
                  className={`relative pb-1.5 transition-colors duration-300 ${
                    isActive
                      ? "text-main-red"
                      : "text-white/80 hover:text-main-red"
                  }`}
                >
                  {name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-main-red rounded-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Action Trigger Controllers */}
        <div className="flex items-center gap-4 z-50">
          {/* Lang Switcher - Desktop */}
          <div ref={langRef} className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-black tracking-wide uppercase border bg-white/10 border-white/15 text-white hover:bg-white/20 transition-all duration-300"
            >
              <img
                src={currentLang.flag}
                alt={currentLang.short}
                className="w-5 h-3 rounded-sm object-cover"
              />
              {currentLang.short}
              <FiChevronDown
                size={12}
                className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-1.5"
                >
                  {languages
                    .filter((l) => l.code !== currentLang.code)
                    .map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black uppercase tracking-wide text-white/80 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                      >
                        <img
                          src={lang.flag}
                          alt={lang.short}
                          className="w-5 h-3 rounded-sm object-cover"
                        />
                        {lang.short}
                      </button>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`md:hidden focus:outline-none p-2 rounded-full transition-all duration-300 text-white ${
              menuOpen ? "bg-white/10 rotate-90" : ""
            }`}
            aria-label="Toggle mobile menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Full-Screen Immersive Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-screen bg-black/40 backdrop-blur-2xl md:hidden z-45 flex flex-col justify-between px-8 pt-28 pb-12 overflow-y-auto"
          >
            {/* Nav Links Stack */}
            <div className="flex flex-col gap-1.5 w-full">
              {navLinks.map(({ name, path }, i) => {
                const isActive = pathname === path;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-3 border-b border-white/5 w-full text-left rtl:text-right transition-all"
                    >
                      <span className="text-[10px] font-black tracking-widest text-white/30 group-hover:text-main-red transition-colors font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-2xl font-black uppercase tracking-wider transition-all transform group-active:scale-98 ${
                          isActive
                            ? "text-main-red pl-2 rtl:pl-0 rtl:pr-2"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Language Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-4 border-t border-white/10 pt-6 mt-8"
            >
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 block text-center">
                Select Language
              </span>

              {/* FIX: was a flex row of three w-full buttons — each one demanding
                  full width inside a horizontal row is what broke the layout on
                  small screens (squeezed/overflowing). A 3-column grid gives each
                  button an equal, predictable share of the row at any width. */}
              <div className="grid grid-cols-3 gap-2 xs:gap-3 w-full">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex flex-col xs:flex-row items-center justify-center gap-1 xs:gap-2 px-2 xs:px-4 py-2.5 xs:py-3 rounded-xl text-[11px] xs:text-xs font-black uppercase tracking-wider border transition-all duration-300 bg-white text-black border-white shadow-xl"
                  >
                    <img
                      src={lang.flag}
                      alt={lang.short}
                      className="w-5 h-3 rounded-sm object-cover shrink-0"
                    />
                    <span>{lang.short}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
