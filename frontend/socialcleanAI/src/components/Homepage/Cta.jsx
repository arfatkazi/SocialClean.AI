import React from "react";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-center rounded-xl mx-6 md:mx-20 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6"
        >
          Ready to Clean Your Social Media?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto"
        >
          Join thousands of users who trust SocialCleanAI to protect their
          online presence.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Cta;
