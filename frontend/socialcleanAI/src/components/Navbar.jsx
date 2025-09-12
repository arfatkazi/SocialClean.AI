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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <nav className="sticky top-5 z-50">
      <div
        className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between
                    bg-white/30 dark:bg-gray-800/40 backdrop-blur-lg border border-white/30 dark:border-gray-400/40
                    rounded-2xl transition-colors duration-500 shadow-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, color: "#6366f1" }}
        >
          <Link
            className="text-3xl font-bold text-gray-900 dark:text-white drop-shadow-lg"
            to="/"
          >
            SocialCleanAI
          </Link>
        </motion.div>

        {/* Center Links */}
        <motion.div
          className="hidden md:flex items-center space-x-10 mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              variants={itemVariants}
              whileHover={{ scale: 1.03, color: "#6366f1" }}
            >
              <Link
                className="text-gray-900 dark:text-white font-medium transition-all duration-200"
                to={link.to}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -1,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            <Link
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-indigo-700 transition-all duration-200"
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
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-emerald-700 transition-all duration-200"
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
          <span className="w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"></span>
          <span className="w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"></span>
          <span className="w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="md:hidden bg-white/40 dark:bg-gray-800/60 backdrop-blur-md
                        border-t border-white/20 dark:border-gray-700/40 shadow-lg rounded-b-2xl
                        p-4 space-y-4 mt-3"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 20,
                  delay: i * 0.08,
                }}
                whileHover={{ scale: 1.03, color: "#6366f1" }}
              >
                <Link
                  className="block text-center text-gray-900 dark:text-white font-medium transition-all duration-200"
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Auth Buttons */}
            <motion.div
              className="flex flex-col space-y-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -1,
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                }}
              >
                <Link
                  className="block text-center px-4 py-2 font-medium rounded-lg bg-blue-600 text-white hover:bg-indigo-700 transition-all duration-200"
                  to="/signup"
                  onClick={() => setIsOpen(false)}
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
                  className="block text-center px-4 py-2 font-medium rounded-lg bg-green-600 text-white hover:bg-emerald-700 transition-all duration-200"
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
