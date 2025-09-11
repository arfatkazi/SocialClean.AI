import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const Security = () => {
  const headingWords = ["Your", "Security", "is", "Our", "Priority"];

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
    <section className="py-16 px-6 bg-custom-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animate Lock Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Lock className="w-16 h-16 mx-auto text-indigo-400 mb-6" />
          </motion.div>

          {/* Animate Heading Word by Word */}
          <motion.h2
            className="text-2xl md:text-4xl font-bold mb-4 text-white flex flex-wrap justify-center gap-2"
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

          {/* Animate Description */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: headingWords.length * 0.25 + 0.3, // waits for heading animation
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            All scans are private. We never permanently store your personal
            data. Your information is safe with our advanced security protocols.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
