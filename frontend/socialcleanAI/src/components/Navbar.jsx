import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Brand Logo / Name */}
      <div className="text-2xl font-bold text-blue-600">SocialCleanAI</div>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Auth
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
