import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Brand Logo / Name */}
      <div className="text-2xl font-extrabold text-white tracking-wide">
        SocialCleanAI
      </div>

      <div className="space-x-6">
        <Link
          to="/"
          className="text-white/80 hover:text-white font-medium transition-colors"
        >
          Auth
        </Link>
        <Link
          to="/dashboard"
          className="text-white/80 hover:text-white font-medium transition-colors"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
