import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-5 z-50">
      <div
        className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center 
                      bg-white/30 backdrop-blur-lg border border-white/20  rounded-2xl mt-6"
      >
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900  text-shadow-2xs "
        >
          SocialCleanAI
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/signup"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-black transition-colors duration-300"
          >
            Sign up
          </Link>
          {/* <Link
            to="/dashboard"
            className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Dashboard
          </Link> */}
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
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/40 backdrop-blur-md border-t border-white/20 shadow-lg rounded-b-2xl p-4 space-y-4 transition-all duration-500 mt-3">
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 font-medium rounded-lg 
                 transition-colors duration-300 bg-transparent text-black
                 hover:bg-black hover:text-white"
          >
            Sign up
          </Link>

          <hr className="border-white/30" />

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-2 font-medium rounded-lg 
                 transition-colors duration-300 bg-transparent text-black
                 hover:bg-black hover:text-white"
          >
            Log in
          </Link>
        </div>
      )}
    </nav>
  );
}
