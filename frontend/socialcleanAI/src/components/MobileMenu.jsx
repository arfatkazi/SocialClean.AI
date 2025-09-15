import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileMenu({ isOpen, setIsOpen, navLinks }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          className="md:hidden mt-7 fixed top-16 left-0 w-full bg-white/40 dark:bg-gray-800/60 backdrop-blur-md
                     border-b border-white/20 dark:border-gray-700/40 shadow-lg z-50 py-4 px-3 space-y-2"
        >
          {/* Mobile Links */}
          {navLinks.map((link, i) => (
            <motion.div
              key={link.to}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 20,
                delay: i * 0.06,
              }}
              whileHover={{ scale: 1.02, color: "#6366f1" }}
            >
              <Link
                className="block text-center text-gray-900 dark:text-white font-medium text-sm transition-all duration-200"
                to={link.to}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col space-y-2 mt-1">
            <motion.div
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.12)",
              }}
            >
              <Link
                className="block text-center px-3 py-1.5 font-medium rounded-lg bg-blue-600 text-white text-sm hover:bg-indigo-700 transition-all duration-200"
                to="/signup"
                onClick={() => setIsOpen(false)}
              >
                Sign up
              </Link>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.12)",
              }}
            >
              <Link
                className="block text-center px-3 py-1.5 font-medium rounded-lg bg-green-600 text-white text-sm hover:bg-emerald-700 transition-all duration-200"
                to="/login"
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
