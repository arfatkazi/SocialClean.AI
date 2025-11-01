import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, User } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark

  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/scan", label: "Scan" },
    { to: "/reports", label: "Reports" },
    { to: "/contact", label: "Contact" },
  ];

  // ✅ Auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  // ✅ Dark mode setup (global sync)
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

  // ✅ Logout
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
    <nav className="fixed top-0 left-0 right-0 z-[1000] mt-5">
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
            to="/"
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white drop-shadow-lg"
          >
            SocialClean.Ai
          </Link>
        </motion.div>

        {/* Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              variants={itemVariants}
              initial="hidden"
              animate="show"
            >
              <Link
                to={link.to}
                className={`text-gray-900 dark:text-white font-medium transition-all duration-300 hover:text-indigo-700 dark:hover:text-indigo-400 ${
                  location.pathname === link.to
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Section (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" size={18} />
            ) : (
              <Moon className="text-gray-900" size={18} />
            )}
          </motion.button>

          {/* Auth buttons */}
          {!isAuthenticated ? (
            <>
              <Link
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-indigo-700 transition"
                to="/signup"
              >
                Sign up
              </Link>
              <Link
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-emerald-700 transition"
                to="/login"
              >
                Log in
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
              >
                <User size={18} /> My Account
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
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

        {/* Mobile Right Side Section */}
        <div className="md:hidden flex items-center gap-3">
          {/* Dark mode toggle beside hamburger */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon className="text-gray-900" size={20} />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            initial={false}
            animate={isOpen ? "open" : "closed"}
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: -6 },
                open: { rotate: 45, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full origin-center"
            />
            <motion.span
              variants={{
                closed: { opacity: 1, scaleX: 1 },
                open: { opacity: 0, scaleX: 0 },
              }}
              transition={{ duration: 0.2 }}
              className="absolute w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full origin-center"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 6 },
                open: { rotate: -45, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute w-6 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full origin-center"
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
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
