"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const menuOpenRef = useRef(false);

  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const langRef = useRef<HTMLDivElement>(null);

  const isArabic = i18n.language.startsWith("ar");
  menuOpenRef.current = menuOpen;

  // تفعيل مستمع السكرول لتحديث حالة الخلفية فوراً عند النزول
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      // Page scroll progress, driving the thin gradient line under the
      // navbar — a quiet nod to the same rising-arc brand motif used
      // elsewhere on the site (red → move → green), rather than a bare
      // functional progress bar.
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrollProgress(max > 0 ? (y / max) * 100 : 0);

      if (menuOpenRef.current || y < 24) {
        setNavHidden(false);
      } else if (y > lastScrollY.current + 4) {
        setNavHidden(false);
      } else if (y < lastScrollY.current - 4) {
        setNavHidden(true);
      }

      lastScrollY.current = y;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileProductsOpen(false);
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

  const navLinks: { name: string; path: string; external?: boolean }[] = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const productLinks = [
    { name: t("nav.nfc"), path: "/nfc" },
    { name: t("nav.store"), path: "/store" },
  ];

  const productsActive = pathname === "/nfc" || pathname.startsWith("/store");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActivePath = (path: string) =>
    path === "/"
      ? pathname === "/" || pathname === "/home"
      : path === "/projects"
        ? pathname === "/projects" || pathname.startsWith("/projects/")
        : pathname === path;

  const languages = [
    { code: "en", short: "EN", flag: "https://flagcdn.com/us.svg" },
    { code: "ar", short: "AR", flag: "https://flagcdn.com/eg.svg" },
  ];

  const currentLang =
    languages.find((l) => i18n.language.startsWith(l.code)) || languages[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    document.documentElement.lang = code;
    document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
    setLangOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 w-full z-50 pt-[env(safe-area-inset-top)] px-4 sm:px-6 md:px-14 border-b transition-all duration-500 ease-in-out ${
        navHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled || menuOpen
          ? "bg-black/75 backdrop-blur-2xl border-white/5 shadow-2xl shadow-black/40"
          : "bg-gradient-to-b from-black/70 via-black/40 to-black/10 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="w-11 h-11 sm:w-14 sm:h-14 p-1 rounded-full overflow-hidden relative shrink-0 z-50 ring-1 ring-white/10 hover:ring-white/25 transition-all duration-300"
        >
          <img
            src="/images/SignUp Logo White.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-4 lg:gap-7 text-[11px] lg:text-[13px] font-black uppercase tracking-widest relative text-white">
          {navLinks.slice(0, 3).map(({ name, path }) => {
            const isActive = isActivePath(path);
            const className = `relative inline-flex items-center gap-1.5 pb-1.5 transition-colors duration-300 ${
              isActive
                ? "text-main-green"
                : "text-white/80 hover:text-main-green"
            }`;
            const label = (
              <>
                {name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-main-green rounded-full"
                  />
                )}
              </>
            );
            return (
              <li key={path}>
                <Link href={path} className={className}>
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="group relative">
            <button
              type="button"
              className={`relative inline-flex items-center gap-1.5 pb-1.5 transition-colors duration-300 ${
                productsActive
                  ? "text-main-green"
                  : "text-white/80 hover:text-main-green"
              }`}
              aria-haspopup="true"
            >
              {t("nav.products")}
              <FiChevronDown
                size={12}
                className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
              />
              {productsActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-main-green rounded-full"
                />
              )}
            </button>
            <div className="invisible absolute start-0 top-full z-50 min-w-[11rem] pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div
                className="rounded-2xl border border-white/15 bg-[#0c1016] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                onMouseDown={(e) => e.preventDefault()}
              >
                {productLinks.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block rounded-xl px-3 py-2 text-[11px] font-black uppercase tracking-widest transition-colors ${
                      pathname === item.path || pathname.startsWith(`${item.path}/`)
                        ? "bg-white/10 text-main-green"
                        : "text-white/75 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </li>
          {navLinks.slice(3).map(({ name, path }) => {
            const isActive = isActivePath(path);
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={`relative inline-flex items-center gap-1.5 pb-1.5 transition-colors duration-300 ${
                    isActive
                      ? "text-main-green"
                      : "text-white/80 hover:text-main-green"
                  }`}
                >
                  {name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-main-green rounded-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Action Trigger Controllers */}
        <div className="flex items-center gap-3 sm:gap-4 z-50">
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
                  className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-black/70 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-1.5"
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
            className={`md:hidden focus:outline-none w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300 text-white ${
              menuOpen ? "bg-white/10 rotate-90" : "active:bg-white/10"
            }`}
            aria-label={t("nav.toggleMenu")}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Scroll progress hairline — same red → move → green arc used
          throughout the site, here compressed into a thin functional bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-main-red via-main-move to-main-green transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Full-Screen Immersive Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-[100dvh] bg-black/70 backdrop-blur-2xl md:hidden z-40 flex flex-col justify-between px-6 sm:px-8 pt-24 sm:pt-28 pb-[calc(2rem+env(safe-area-inset-bottom))] overflow-y-auto"
          >
            {/* Ambient brand glow, echoes the hero's glowing logo hub */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-main-green/20 blur-3xl"
            />

            {/* Nav Links Stack */}
            <div className="relative flex flex-col gap-1 sm:gap-1.5 w-full">
              {navLinks.slice(0, 3).map(({ name, path }, i) => {
                const isActive = isActivePath(path);
                return (
                  <motion.div
                    key={path}
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
                      href={path}
                      onClick={() => setMenuOpen(false)}
                      className="group flex w-full items-baseline gap-3 border-b border-white/5 py-2.5 text-left transition-all rtl:text-right sm:gap-4 sm:py-3"
                    >
                      <span className="font-mono text-[10px] font-black tracking-widest text-white/30 transition-colors group-hover:text-main-green">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`inline-flex items-center gap-2 text-xl font-black uppercase tracking-wider transition-all group-active:scale-98 sm:text-2xl ${
                          isActive
                            ? "pl-2 text-main-green rtl:pl-0 rtl:pr-2"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                transition={{
                  duration: 0.4,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-white/5"
              >
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((open) => !open)}
                  className="group flex w-full items-baseline gap-3 py-2.5 text-left rtl:text-right sm:gap-4 sm:py-3"
                  aria-expanded={mobileProductsOpen}
                >
                  <span className="font-mono text-[10px] font-black tracking-widest text-white/30 group-hover:text-main-green">
                    04
                  </span>
                  <span
                    className={`inline-flex flex-1 items-center justify-between gap-2 text-xl font-black uppercase tracking-wider sm:text-2xl ${
                      productsActive
                        ? "pl-2 text-main-green rtl:pl-0 rtl:pr-2"
                        : "text-white/80"
                    }`}
                  >
                    {t("nav.products")}
                    <FiChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pb-3 ps-10"
                    >
                      {productLinks.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setMenuOpen(false)}
                          className={`block py-2.5 text-sm font-black uppercase tracking-widest ${
                            pathname === item.path
                              ? "text-main-green"
                              : "text-white/80 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              {navLinks.slice(3).map(({ name, path }, i) => {
                const isActive = isActivePath(path);
                return (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: isArabic ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.16 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={path}
                      onClick={() => setMenuOpen(false)}
                      className="group flex w-full items-baseline gap-3 border-b border-white/5 py-2.5 text-left transition-all rtl:text-right sm:gap-4 sm:py-3"
                    >
                      <span className="font-mono text-[10px] font-black tracking-widest text-white/30 transition-colors group-hover:text-main-green">
                        {String(i + 5).padStart(2, "0")}
                      </span>
                      <span
                        className={`inline-flex items-center gap-2 text-xl font-black uppercase tracking-wider transition-all group-active:scale-98 sm:text-2xl ${
                          isActive
                            ? "pl-2 text-main-green rtl:pl-0 rtl:pr-2"
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
              className="relative flex flex-col gap-3 sm:gap-4 border-t border-white/10 pt-5 sm:pt-6 mt-6 sm:mt-8"
            >
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 block text-center">
                {t("nav.selectLanguage")}
              </span>

              {/* Grid instead of a flex row of `w-full` buttons — each
                  button now gets a reliable, equal share of the row at
                  any screen width instead of fighting for space. */}
              <div className="grid grid-cols-2 gap-2 xs:gap-3 w-full">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="flex flex-col xs:flex-row items-center justify-center gap-1 xs:gap-2 px-2 xs:px-4 py-2.5 xs:py-3 rounded-xl text-[11px] xs:text-xs font-black uppercase tracking-wider border transition-all duration-300 bg-white text-black border-white shadow-xl active:scale-95"
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
