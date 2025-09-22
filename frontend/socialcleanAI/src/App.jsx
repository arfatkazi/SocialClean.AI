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
import Reports from "./pages/Reports";

// Auth pages
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
          {/* Public pages */}
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
