import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/scan", label: "Scan" },
    { to: "/reports", label: "Reports" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-5 z-50">
      <div
        className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center 
        bg-white/30 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-400/40 
        rounded-2xl transition-colors duration-500"
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          SocialCleanAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={link.to}
                className="text-gray-900 dark:text-white hover:text-indigo-600 transition font-medium"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-black transition-colors duration-300"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-black transition-colors duration-300"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
          <span className="w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
          <span className="w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/40 dark:bg-gray-800/60 backdrop-blur-md 
            border-t border-white/20 dark:border-gray-700/40 shadow-lg rounded-b-2xl 
            p-4 space-y-4 mt-3"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-gray-900 dark:text-white hover:text-indigo-600 transition font-medium"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className="flex flex-col space-y-3">
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 font-medium rounded-lg bg-blue-600 text-white hover:bg-black transition-colors duration-300"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-2 font-medium rounded-lg bg-green-600 text-white hover:bg-black transition-colors duration-300"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
