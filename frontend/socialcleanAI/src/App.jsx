import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

// ✅ Components
import Navbar from "./components/Navbar";
import Footer from "./components/Homepage/Footer";
import Loading from "./components/Loading";

// ✅ Pages
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Scan from "./pages/Scan";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";

// ✅ Auth pages
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* ==========================================================
   ✅ SCROLL TO TOP ON ROUTE CHANGE
========================================================== */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ==========================================================
   ✅ PROTECTED ROUTE COMPONENT
========================================================== */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/* ==========================================================
   ✅ MAIN APP COMPONENT
========================================================== */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const mainRef = useRef(null);

  /* ==========================================================
     🌀 Initialize Smooth Scroll using Lenis
  =========================================================== */
  useEffect(() => {
    if (!mainRef.current) return;
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
      smoothWheel: true,
      gestureDirection: "vertical",
      wrapper: mainRef.current,
      content: mainRef.current.firstChild,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  /* ==========================================================
     ⏳ Loading Screen Fade-out
  =========================================================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  /* ==========================================================
     🌗 Theme: Sync Global Tailwind Dark/Light Mode
     - Default = dark
     - Restores from localStorage
     - Works globally for all pages
  =========================================================== */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (loading) return <Loading fadeOut={fadeOut} />;

  /* ==========================================================
     🧭 APP STRUCTURE
  =========================================================== */

  // bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white
  return (
    <div className="flex flex-col min-h-screen  transition-colors duration-300">
      <ScrollToTop />
      <Navbar />

      {/* Main Scrollable Content */}
      <main ref={mainRef} className="flex-grow overflow-y-auto relative">
        <div className="min-h-screen">
          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reports" element={<Reports />} />

            {/* 🔐 Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scan"
              element={
                <ProtectedRoute>
                  <Scan />
                </ProtectedRoute>
              }
            />

            {/* 🔑 Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            {/* 🚧 404 fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}
