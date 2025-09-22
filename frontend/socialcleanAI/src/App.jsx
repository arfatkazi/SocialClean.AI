import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

// Components
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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const mainRef = useRef(null);

  // Initialize Lenis smooth scroll on main container only
  useEffect(() => {
    if (!mainRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
      smoothWheel: true,
      gestureDirection: "vertical",
      wrapper: mainRef.current, // scroll only inside main
      content: mainRef.current.firstChild,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Loading fade-out
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading fadeOut={fadeOut} />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <ScrollToTop />
      <Navbar />

      {/* Scrollable main content */}
      <main ref={mainRef} className="flex-grow overflow-y-auto relative">
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  );
}
