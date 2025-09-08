import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-900">
          SocialCleanAI
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/signup"
            className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-black transition-colors duration-300"
          >
            Sign up
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Dashboard
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Log in
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 p-4 space-y-4">
          <Link
            to="/signup"
            className="block text-center px-4 py-2 rounded-full bg-blue-600 text-white font-medium hover:bg-black transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Sign up
          </Link>
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-black hover:text-white transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <hr />
          <Link
            to="/login"
            className="block px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-black hover:text-white transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
