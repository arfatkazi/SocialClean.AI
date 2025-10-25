import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Moon, LogOut, User, X } from "lucide-react";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  navLinks,
  isAuthenticated,
  handleLogout,
  toggleDarkMode,
  darkMode,
}) {
  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 140, damping: 25 },
    },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.04,
        type: "spring",
        stiffness: 140,
        damping: 25,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl z-50 flex flex-col justify-center items-center space-y-6"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 🔘 Close Button */}
          <motion.button
            onClick={() => setIsOpen(false)}
            whileHover={{ scale: 1.1, rotate: 180 }}
            className="absolute top-20 right-6 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <X className="w-5 h-5 text-gray-900 dark:text-gray-100" />
          </motion.button>

          {/* Links */}
          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              custom={i}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05 }}
            >
              <Link
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="relative block text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white py-3 px-6 rounded-lg transition-all duration-300 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-black/0 rounded-lg transition-all duration-300 group-hover:bg-black/80"></span>
                <span className="relative z-10">{link.label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <div className="flex flex-col gap-4 mt-6">
              {["signup", "login"].map((path, i) => (
                <motion.div
                  key={path}
                  whileHover={{
                    scale: 1.05,
                    y: -1,
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
                  }}
                >
                  <Link
                    to={`/${path}`}
                    onClick={() => setIsOpen(false)}
                    className={`relative block text-center py-3 px-12 font-medium rounded-full text-white text-lg overflow-hidden transition-all duration-300 shadow-md ${
                      path === "signup"
                        ? "bg-indigo-600 hover:bg-black"
                        : "bg-green-600 hover:bg-black"
                    } group`}
                  >
                    <span className="absolute inset-0 bg-black/0 rounded-full transition-all duration-300 group-hover:bg-black/80"></span>
                    <span className="relative z-10 capitalize">
                      {path === "signup" ? "Sign Up" : "Log In"}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="flex flex-col items-center gap-4 mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              >
                <User className="inline mr-2" size={18} /> Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              >
                <LogOut className="inline mr-2" size={18} /> Logout
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
