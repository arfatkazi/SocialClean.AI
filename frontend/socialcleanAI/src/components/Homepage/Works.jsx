import React from "react";
import { motion } from "framer-motion";

const Works = () => {
  const steps = [
    {
      step: "1",
      title: "Connect Accounts",
      desc: "Link your Twitter, Instagram, or Facebook in seconds.",
    },
    {
      step: "2",
      title: "AI Scan",
      desc: "Our AI scans your posts for harmful or risky content.",
    },
    {
      step: "3",
      title: "Clean Up",
      desc: "Review flagged posts and clean them with one click.",
    },
  ];

  // Split heading into words
  const headingWords = ["How", "It", "Works"];

  // Parent container variant (for stagger)
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }, // delay between words
    },
  };

  // Each word animation
  const wordVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-300 mt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated Heading word by word */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-10 sm:mb-12 text-gray-900 dark:text-gray-100 flex justify-center gap-3"
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

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                {item.step}
              </div>
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

export default Works;
