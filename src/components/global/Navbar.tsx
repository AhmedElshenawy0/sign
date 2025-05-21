import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Show Reel", path: "/" },
    { name: "Branding", path: "/" },
    { name: "Our Services", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/" },
  ];

  return (
    <nav className="py-2 px-5 md:px-12 fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-800 to-green-950 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="/images/SignUp Logo White.png"
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8 text-white font-medium tracking-wide">
          {navLinks.map((link, i) => (
            <li
              key={i}
              className="hover:text-green-300 cursor-pointer transition duration-300 border-b border-transparent hover:border-green-300"
            >
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-green-950 text-white font-medium md:hidden z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="pt-24 flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="text-xl hover:text-green-300 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
