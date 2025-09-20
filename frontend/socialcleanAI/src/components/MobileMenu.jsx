import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function MobileMenu({ isOpen, setIsOpen, navLinks }) {
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
        delay: i * 0.08,
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
          {/* Mobile Links */}
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

          {/* Mobile Auth Buttons */}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
