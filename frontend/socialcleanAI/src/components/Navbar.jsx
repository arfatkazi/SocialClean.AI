import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-5 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl transition-colors duration-500">
        <Link to="/" className="text-3xl font-bold text-white">
          SocialCleanAI
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800 transition-colors duration-300"></span>
          <span className="w-6 h-0.5 bg-gray-800 transition-colors duration-300"></span>
          <span className="w-6 h-0.5 bg-gray-800 transition-colors duration-300"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/40 backdrop-blur-md border-t border-white/20 shadow-lg rounded-b-2xl p-4 space-y-4 transition-all duration-500 mt-3 dark:">
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 font-medium rounded-lg transition-colors duration-300 text-black hover:bg-black hover:text-white"
          >
            Sign up
          </Link>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 font-medium rounded-lg transition-colors duration-300 text-black hover:bg-black hover:text-white"
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
