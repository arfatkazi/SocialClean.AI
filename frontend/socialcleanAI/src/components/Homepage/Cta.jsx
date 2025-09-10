import React from "react";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="py-20 px-6 bg-indigo-600 dark:bg-indigo-700 text-white text-center transition-colors duration-300 rounded-xl mx-6 md:mx-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Clean Your Social Media?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of users who trust SocialCleanAI to protect their
          online presence.
        </p>
        <button className="px-8 py-4 rounded-full bg-white text-indigo-600 dark:text-indigo-700 font-semibold shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition transform hover:-translate-y-1">
          Get Started Now
        </button>
      </motion.div>
    </section>
  );
};

export default Cta;
