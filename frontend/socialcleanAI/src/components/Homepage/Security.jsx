import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const Security = () => {
  const headingWords = ["Your", "Security", "is", "Our", "Priority"];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const leftFadeRef = useRef(null);
  const rightFadeRef = useRef(null);

  return (
    <section className="relative py-16 px-4 sm:px-6 md:px-10 overflow-hidden transition-colors duration-300">
      {/* Subtle Gradient edges */}
      <div
        ref={leftFadeRef}
        className="absolute top-0 left-0 h-full w-20 sm:w-32 bg-gradient-to-r from-gray-50/20 dark:from-gray-900/20 pointer-events-none z-10"
      />
      <div
        ref={rightFadeRef}
        className="absolute top-0 right-0 h-full w-20 sm:w-32 bg-gradient-to-l from-gray-50/20 dark:from-gray-900/20 pointer-events-none z-10"
      />

      <div className="max-w-4xl mx-auto text-center relative z-20">
        <motion.div
          className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-gray-800/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-transform duration-500 hover:[transform:rotateY(3deg) scale(1.02)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Lock Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Lock className="w-16 h-16 mx-auto text-indigo-600 dark:text-indigo-400 mb-6" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white flex flex-wrap justify-center gap-2"
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

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: headingWords.length * 0.25 + 0.3,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            All scans are private. We never permanently store your personal
            data. Your information is safe with our advanced security protocols.
          </motion.p>
        </motion.div>
      </div>
      {/* Indigo Divider (Sticky under Hero) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/60 via-purple-500/60 to-transparent"></div>
    </section>
  );
};

export default Security;
