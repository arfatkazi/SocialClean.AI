import React from "react";
import { motion } from "framer-motion";

const Security = () => {
  return (
    <div>
      {/* Trust & Security */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900 transition-colors duration-300">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Privacy & Security You Can Trust
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We use bank-level encryption and industry best practices. Your data
            belongs to you, always.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Security;
