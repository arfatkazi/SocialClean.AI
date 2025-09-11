import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  const headingWords = ["Clean", "Your", "Digital", "Footprint", "with", "AI"];

  return (
    <section className="flex-1 flex items-center justify-center px-10 py-24 transition-colors duration-300">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 mt-35">
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-3 ${
                word === "AI" ? "text-indigo-600" : ""
              }`}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.25,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: headingWords.length * 0.25 + 0.2, duration: 1 }}
        >
          SocialCleanAI helps you scan, filter, and clean your social media
          posts effortlessly. Stay professional. Stay safe.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: headingWords.length * 0.25 + 0.5,
            duration: 0.8,
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
