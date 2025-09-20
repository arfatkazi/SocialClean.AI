import React from "react";
import { motion } from "framer-motion";

const Cta = () => {
  const headingWords = ["Ready", "to", "Clean", "Your", "Social", "Media?"];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 px-6 md:px-10 mb-20">
      <motion.div
        className="relative max-w-4xl mx-auto text-center p-10 sm:p-12 rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        {/* Animated Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-6 flex flex-wrap justify-center gap-2 text-gray-900 dark:text-white"
          variants={containerVariant}
        >
          {headingWords.map((word, i) => (
            <motion.span key={i} variants={wordVariant}>
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Join thousands of users who trust{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            SocialCleanAI
          </span>{" "}
          to protect their online presence.
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.6, // much faster, no long wait
            duration: 0.7,
            ease: "easeOut",
          }}
          className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Cta;
