import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const Security = () => {
  return (
    <section className="py-20 px-6 transition-colors duration-300 bg-transparent">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="p-8 rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Lock className="w-16 h-16 mx-auto text-indigo-600 dark:text-indigo-400 mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Your Security is Our Priority
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            All scans are private. We never permanently store your personal
            data.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
