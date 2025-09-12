import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Homepage/Footer";
import Contact from "./pages/Contact";

// New pages
import About from "./pages/About"; // create About.js
import Scan from "./pages/Scan"; // create Scan.js

// Reports Placeholder
function Reports() {
  return (
    <section className="py-16 px-6 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        📊 Reports & Analytics
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Here you’ll see detailed reports of your scanned content — stats,
        charts, and weekly summaries. 🚀 (Coming soon in Phase 2)
      </p>
      <div className="mt-8">
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Example Report</h2>
          <ul className="text-left text-gray-700 dark:text-gray-300">
            <li>✅ Safe Posts: 120</li>
            <li>⚠️ Flagged Posts: 15</li>
            <li>❌ Deleted Posts: 8</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 pb-5">
      {/* Navbar always on top */}
      <Navbar />

      {/* Main content fills remaining space */}
      <main className="flex-grow">
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Pages */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}
