import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu"; // import the new component

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/scan", label: "Scan" },
    { to: "/reports", label: "Reports" },
    { to: "/contact", label: "Contact" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <nav className="sticky top-3 z-50">
      {" "}
      {/* reduced top margin for mobile */}
      <div
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between
                    bg-white/30 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-400/40
                    rounded-xl sm:rounded-2xl transition-colors duration-500 shadow-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, color: "#6366f1" }}
        >
          <Link
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white drop-shadow-lg"
            to="/"
          >
            SocialClean.AI
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.05, color: "#6366f1" }}
            >
              <Link
                className="text-gray-900 dark:text-white font-medium transition-all duration-200"
                to={link.to}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex flex-shrink-0 space-x-3 sm:space-x-4">
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -1,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <Link
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-600 text-white font-medium hover:bg-indigo-700 transition-all duration-200 text-sm sm:text-base"
              to="/signup"
            >
              Sign up
            </Link>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -1,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <Link
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-green-600 text-white font-medium hover:bg-emerald-700 transition-all duration-200 text-sm sm:text-base"
              to="/login"
            >
              Log in
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-4 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"></span>
          <span className="w-4 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"></span>
          <span className="w-4 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"></span>
        </button>
      </div>
      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} />
    </nav>
  );
}
