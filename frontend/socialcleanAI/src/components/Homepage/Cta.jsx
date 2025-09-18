import React, { useRef } from "react";
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

  const leftFadeRef = useRef(null);
  const rightFadeRef = useRef(null);

  return (
    <section className="relative py-16 px-4 sm:px-6 md:px-10 overflow-hidden mb-20">
      {/* Gradient edges */}
      <div
        ref={leftFadeRef}
        className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-indigo-700 pointer-events-none z-10"
      />
      <div
        ref={rightFadeRef}
        className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-indigo-700 pointer-events-none z-10"
      />

      <motion.div
        className="relative max-w-4xl mx-auto text-center p-10 sm:p-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-2xl backdrop-blur-md hover:[transform:rotateY(3deg) scale(1.02)] transition-transform duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        {/* Animate Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6 flex flex-wrap justify-center gap-2"
          variants={containerVariant}
        >
          {headingWords.map((word, i) => (
            <motion.span key={i} variants={wordVariant}>
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Animate Description */}
        <motion.p
          className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: headingWords.length * 0.2 + 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          Join thousands of users who trust SocialCleanAI to protect their
          online presence.
        </motion.p>

        {/* Animate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: headingWords.length * 0.2 + 0.6,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Cta;
