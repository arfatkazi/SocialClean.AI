import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, User } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/scan", label: "Scan" },
    { to: "/reports", label: "Reports" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    setMenuOpen(false);
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
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-2 sm:px-4 md:px-6 mt-3 sm:mt-5">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/30 dark:border-gray-700 rounded-2xl transition-all duration-500 shadow-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          whileHover={{ scale: 1.1 }}
        >
          <Link
            to="/"
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap"
          >
            SocialClean.Ai
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              variants={itemVariants}
              initial="hidden"
              animate="show"
            >
              <Link
                to={link.to}
                className={`text-sm lg:text-base font-medium transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400 ${
                  location.pathname === link.to
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-gray-900 dark:text-white"
                }
                `}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-900" />
            )}
          </motion.button>

          {!isAuthenticated ? (
            <>
              <Link
                className="px-3 lg:px-4 py-2 rounded-lg bg-blue-600 text-white text-sm lg:text-base hover:bg-indigo-700"
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="px-3 lg:px-4 py-2 rounded-lg bg-green-600 text-white text-sm lg:text-base hover:bg-emerald-700"
                to="/login"
              >
                Log in
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm lg:text-base"
              >
                <User size={18} /> My Account
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700 dark:hover:text-white"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-900" />
            )}
          </motion.button>

          <motion.button
            className="flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setIsOpen(!isOpen)}
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <motion.span
              className="absolute w-6 h-0.5 bg-gray-800 dark:bg-gray-200"
              variants={{
                closed: { rotate: 0, y: -6 },
                open: { rotate: 45, y: 0 },
              }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-gray-800 dark:bg-gray-200"
              variants={{
                closed: { opacity: 1, scaleX: 1 },
                open: { opacity: 0, scaleX: 0 },
              }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-gray-800 dark:bg-gray-200"
              variants={{
                closed: { rotate: 0, y: 6 },
                open: { rotate: -45, y: 0 },
              }}
            />
          </motion.button>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
    </nav>
  );
}
