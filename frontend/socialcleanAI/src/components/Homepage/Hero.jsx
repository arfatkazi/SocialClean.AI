import { motion } from "framer-motion";
import React from "react";
import { Shield, Sparkles, Zap, BarChart } from "lucide-react";

const Hero = ({ darkMode, setDarkMode }) => {
  return (
    <>
      {/* Hero Section */}
      <section
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        className="flex-1 flex items-center justify-center
                   bg-white dark:bg-gray-900
                   px-6 transition-colors duration-300"
      >
        <div className="text-center max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-15 mt-25"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Clean Your Digital Footprint with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">AI</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            SocialCleanAI helps you scan, filter, and clean your social media
            posts effortlessly. Stay professional. Stay safe.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;
