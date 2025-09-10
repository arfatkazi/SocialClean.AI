import { motion } from "framer-motion";
import Hero from "../components/Homepage/Hero.jsx";
import Works from "../components/Homepage/Works.jsx";
import Feature from "../components/Homepage/Feature.jsx";
import Security from "../components/Homepage/Security.jsx";
import Cta from "../components/Homepage/Cta.jsx";
import Footer from "../components/Homepage/Footer.jsx";

export default function HomePage({ darkMode, setDarkMode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
      <Works darkMode={darkMode} setDarkMode={setDarkMode} />
      <Feature darkMode={darkMode} setDarkMode={setDarkMode} />
      <Security darkMode={darkMode} setDarkMode={setDarkMode} />
      <Cta darkMode={darkMode} setDarkMode={setDarkMode} />
      <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}
