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

  const headingWords = ["How", "It", "Works"];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="pt-10 sm:pt-16 md:pt-20 px-4 sm:px-6 md:px-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-8 sm:mb-10 text-gray-900 dark:text-gray-100 flex justify-center gap-3"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-10">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-4 sm:p-6 md:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white mb-1">
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
