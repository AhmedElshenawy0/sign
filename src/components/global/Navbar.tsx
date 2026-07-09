import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import NoisyBg from "./NoisyBg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);

  useEffect(() => {
    setIsArabic(i18n.language === "ar");
  }, [i18n.language]);
  const langRef = useRef(null);

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

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !(langRef.current as any).contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-main-green to-main-dark-green text-white backdrop-blur-md shadow-md px-6 py-3 md:px-14"
    >
      <NoisyBg />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="w-14 h-14 rounded-full overflow-hidden relative"
        >
          <img
            src="/images/SignUp Logo White.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 font-medium tracking-wide relative">
          {navLinks.map(({ name, path }, i) => {
            const isActive = pathname === path;
            return (
              <li key={i}>
                <Link
                  to={path}
                  className={`border-b-2 pb-1 transition duration-300  ${
                    isActive
                      ? "border-main-red text-main-red"
                      : "border-transparent hover:border-main-red"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse z-50">
          {/* Lang Switcher - Desktop */}
          <div ref={langRef} className="relative hidden lg:block">
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white rounded-full px-3 py-1 text-sm font-semibold transition"
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              <img
                src={currentLang.flag}
                alt={currentLang.short}
                className="w-5 h-3 rounded-sm"
              />
              {currentLang.short}
            </button>
            {langOpen && (
              <div
                className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
                role="menu"
              >
                {languages
                  .filter((l) => l.code !== currentLang.code)
                  .map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <img
                        src={lang.flag}
                        alt={lang.short}
                        className="w-5 h-3 rounded-sm"
                      />
                      {lang.short}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-screen bg-main-dark-green text-white md:hidden z-40 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-24 flex flex-col items-center gap-8 text-xl">
          {navLinks.map(({ name, path }, i) => {
            const isActive = pathname === path;
            return (
              <Link
                key={i}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`transition ${
                  isActive ? "text-main-red" : "hover:text-green-300"
                }`}
              >
                {name}
              </Link>
            );
          })}

          {/* Lang Switcher - Mobile */}
          <div className="flex gap-4 pt-6">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 px-3 py-1 rounded text-sm font-semibold ${
                  lang.code === currentLang.code
                    ? "bg-white text-main-dark-green"
                    : "text-white hover:underline"
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.short}
                  className="w-5 h-3 rounded-sm"
                />
                {lang.short}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
