import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-shadow duration-300 ${
        scrolled ? "bg-gray-900 shadow-xl" : "bg-gray-900"
      }`}
    >
      <div className="text-2xl font-bold text-white tracking-wide hover:text-gray-300 transition-colors cursor-pointer">
        SocialCleanAI
      </div>

      <div className="hidden md:flex space-x-8">
        <Link
          to="/"
          className="relative text-gray-300 hover:text-white font-medium transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
        >
          Auth
        </Link>
        <Link
          to="/dashboard"
          className="relative text-gray-300 hover:text-white font-medium transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-white after:transition-all hover:after:w-full"
        >
          Dashboard
        </Link>
      </div>

      <motion.div
        className="md:hidden flex flex-col justify-between w-6 h-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
      >
        <span className="block h-0.5 w-full bg-white"></span>
        <span className="block h-0.5 w-full bg-white"></span>
        <span className="block h-0.5 w-full bg-white"></span>
      </motion.div>

      {isOpen && (
        <div className="absolute top-16 right-6 bg-gray-800 text-white p-4 rounded-lg shadow-lg md:hidden flex flex-col gap-4">
          <Link
            to="/"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Auth
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
