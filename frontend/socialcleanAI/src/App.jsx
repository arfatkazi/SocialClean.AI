import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Homepage/Footer";
import Loading from "./components/Loading";

// Pages
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Reports placeholder page
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
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // start fade animation
      setTimeout(() => setLoading(false), 500); // remove after fade
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading fadeOut={fadeOut} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth pages */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
