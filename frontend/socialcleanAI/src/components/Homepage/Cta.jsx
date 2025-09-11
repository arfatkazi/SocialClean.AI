import React from "react";
import { motion } from "framer-motion";

const Cta = () => {
  const headingWords = ["Ready", "to", "Clean", "Your", "Social", "Media?"];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-center rounded-xl mx-6 md:mx-20 shadow-lg">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        {/* Animate Heading Word by Word */}
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
          className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: headingWords.length * 0.2 + 0.3, // wait until heading finishes
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
            delay: headingWords.length * 0.2 + 0.6, // after description
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
