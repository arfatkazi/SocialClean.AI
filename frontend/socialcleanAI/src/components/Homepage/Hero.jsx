import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  const headingWords = [
    "Clean",
    "Your",
    "Digital",
    "Footprint",
    "with",
    "SocialClean.AI",
  ];

  return (
    <section className="relative flex flex-1 items-center justify-center px-6 md:px-16 py-32 min-h-[90vh] overflow-hidden">
      {/* 🔹 Video Background */}
      <motion.video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <source src="/AI_earth.mp4" type="video/mp4" />
      </motion.video>

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Hero Content */}
      <div className="relative z-20 text-center max-w-4xl">
        {/* Animated Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-6 text-white leading-snug sm:leading-tight md:leading-[1.1]">
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-2 sm:mr-3 ${
                word.includes("AI")
                  ? "text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                  : ""
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
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: headingWords.length * 0.25 + 0.2, duration: 1 }}
        >
          SocialClean.AI helps you scan, filter, and clean your social media
          posts effortlessly. Stay professional. Stay safe.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between max-w-xs mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: headingWords.length * 0.25 + 0.5,
            duration: 0.8,
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.08,
              background: "linear-gradient(90deg, #4f46e5, #6366f1)",
              boxShadow: "0px 12px 24px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-indigo-600 text-white font-semibold shadow-lg transition-all duration-300"
          >
            Get Started
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.08,
              backgroundColor: "#ffffff",
              color: "#4f46e5",
              boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-indigo-600 text-indigo-400 font-semibold transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
