import React from "react";
import { Shield, Sparkles, Zap, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const Feature = () => {
  const features = [
    {
      icon: (
        <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "AI-Powered Cleaning",
      desc: "Detect and filter harmful or unprofessional posts instantly.",
    },
    {
      icon: (
        <Shield className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "Privacy First",
      desc: "We don’t store your data permanently. You’re always in control.",
    },
    {
      icon: (
        <Zap className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "One-Click Scan",
      desc: "Connect your social accounts and scan them in seconds.",
    },
    {
      icon: (
        <BarChart className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "Detailed Reports",
      desc: "Get clear insights on risky posts with actionable suggestions.",
    },
  ];

  // Word animation for heading
  const headingWords = ["Powerful", "Features"];
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };
  const wordVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 sm:py-20 px-6 sm:px-10 md:px-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center">
        {/* Animated heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-10 sm:mb-12 text-gray-900 dark:text-white flex justify-center gap-3 flex-wrap"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {headingWords.map((word, i) => (
            <motion.span key={i} variants={wordVariant}>
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {item.icon}
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
