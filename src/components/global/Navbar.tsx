import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Show Reel", path: "/showreels" },
    { name: "Branding", path: "/branding" },
    { name: "Our Services", path: "/ourService" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-800 to-green-950 backdrop-blur-md shadow-md py-3 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="w-14 h-14 rounded-full overflow-hidden">
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
                  className={`transition duration-300 border-b-2 pb-1 ${
                    isActive
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent hover:border-orange-500"
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
        className={`fixed top-0 left-0 w-full h-screen bg-green-950 text-white font-medium md:hidden z-40 transition-all duration-300 ease-in-out ${
          isOpen
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
                className={`transition duration-200 ${
                  isActive ? "text-orange-500" : "hover:text-green-300"
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
