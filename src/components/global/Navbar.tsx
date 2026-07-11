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

  // حساب اتجاه اللغة مباشرة بدون State إضافية لتسريع الـ Render
  const isArabic = i18n.language === "ar";

  // تأثير السكرول الذكي
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // منع السكرول في الصفحة عند فتح قائمة الموبايل
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

  // إغلاق قائمة الموبايل تلقائياً إذا قام المستخدم بتكبير الشاشة لـ Desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // إغلاق قائمة اللغات عند الضغط في أي مكان خارجها (TypeScript Safe)
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

  const textTone = scrolled || menuOpen ? "text-slate-900" : "text-white";

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-3 md:px-14 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-white/90 backdrop-blur-xl border-b border-neutral-100 shadow-sm"
          : "bg-gradient-to-b from-black/50 to-transparent "
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        {/* Logo */}
        <Link
          to="/"
          className={`w-15 h-15 p-1  rounded-full overflow-hidden relative shrink-0 ring-1 ring-black/5`}
        >
          <img
            src={`${scrolled || menuOpen ? "/apple-touch-icon.png" : "/images/SignUp Logo White.png"}`}
            alt="Logo"
            className="w-full h-full object-cover transition-all duration-500"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 text-[13px] font-black uppercase tracking-widest relative">
          {navLinks.map(({ name, path }, i) => {
            const isActive = pathname === path;
            return (
              <li key={i}>
                <Link
                  to={path}
                  className={`relative pb-1.5 transition-colors duration-300 ${
                    isActive
                      ? "text-main-red"
                      : `${textTone} hover:text-main-red`
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

        {/* Right Section */}
        <div className="flex items-center gap-3 z-50">
          {/* Lang Switcher - Desktop */}
          <div ref={langRef} className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-black tracking-wide uppercase border transition-all duration-300 ${
                scrolled || menuOpen
                  ? "bg-main-red/5 border-main-red/10 text-slate-900 hover:bg-main-red/10"
                  : "bg-white/10 border-white/15 text-white hover:bg-white/20"
              }`}
              aria-haspopup="true"
              aria-expanded={langOpen}
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
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-white/95 backdrop-blur-xl border border-neutral-100 rounded-2xl shadow-2xl z-50 overflow-hidden p-1.5"
                  role="menu"
                >
                  {languages
                    .filter((l) => l.code !== currentLang.code)
                    .map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-600 hover:bg-main-red/5 hover:text-main-red rounded-xl transition-colors"
                        role="menuitem"
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

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`md:hidden focus:outline-none transition-colors duration-300 ${textTone}`}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[64px] left-0 w-full h-[calc(100vh-64px)] bg-white/95 backdrop-blur-xl md:hidden z-40 border-t border-neutral-100 overflow-y-auto"
          >
            <div className="pt-10 pb-10 flex flex-col items-center gap-2 text-lg">
              {navLinks.map(({ name, path }, i) => {
                const isActive = pathname === path;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <Link
                      to={path}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-6 py-3 font-black uppercase tracking-widest text-sm transition-colors ${
                        isActive
                          ? "text-main-red"
                          : "text-slate-700 hover:text-main-red"
                      }`}
                    >
                      {name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Lang Switcher - Mobile */}
              <div className="flex gap-3 pt-8">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wide border transition-colors ${
                      lang.code === currentLang.code
                        ? "bg-main-red text-white border-main-red"
                        : "text-slate-600 border-neutral-200 hover:border-main-red/30 hover:text-main-red"
                    }`}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.short}
                      className="w-5 h-3 rounded-sm object-cover"
                    />
                    {lang.short}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
