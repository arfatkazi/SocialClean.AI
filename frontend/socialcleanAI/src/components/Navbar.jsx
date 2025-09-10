import { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-5 z-50">
      <div
        className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center 
                      bg-white/30 dark:bg-gray-900/70 backdrop-blur-lg border border-white/20 dark:border-gray-700 rounded-2xl  transition-colors duration-500"
      >
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900 dark:text-white"
        >
          SocialCleanAI
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-800 dark:text-white" />
            )}
          </button>

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

        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`w-6 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"}`}
          ></span>
          <span
            className={`w-6 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"}`}
          ></span>
          <span
            className={`w-6 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"}`}
          ></span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/40 dark:bg-gray-900/80 backdrop-blur-md border-t border-white/20 dark:border-gray-700 shadow-lg rounded-b-2xl p-4 space-y-4 transition-all duration-500 mt-3">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsOpen(false);
            }}
            className="block w-full text-center px-4 py-2 font-medium rounded-lg transition-colors duration-300 text-black dark:text-white hover:bg-black hover:text-white"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <hr className="border-white/30 dark:border-gray-700" />

          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 font-medium rounded-lg transition-colors duration-300 text-black dark:text-white hover:bg-black hover:text-white"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 font-medium rounded-lg transition-colors duration-300 text-black dark:text-white hover:bg-black hover:text-white"
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
