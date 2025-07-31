import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
// import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Projects", path: "/Projects" },
    { name: "Branding", path: "/branding" },
    { name: "Our Services", path: "/ourService" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];


  //  const { t, i18n } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  // };
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-main-green shadow-white/10 to-main-dark-green backdrop-blur-md shadow-md py-3 px-6 md:px-14">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="/images/SignUp Logo White.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-white font-medium tracking-wide">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.path;
            return (
              <li key={i}>
                <Link
                  to={link.path}
                  className={`transition duration-300 border-b-2 pb-1 ${isActive
                    ? "border-main-red text-main-red"
                    : "border-transparent hover:border-main-red"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-main-dark-green text-white font-medium md:hidden z-40 transition-all duration-300 ease-in-out ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="pt-24 flex flex-col items-center gap-10 text-xl">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={i}
                to={link.path}
                className={`transition duration-200 ${isActive ? "text-main-red" : "hover:text-green-300"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
