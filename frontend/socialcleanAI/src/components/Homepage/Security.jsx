import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const Security = () => {
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
          <Lock className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
          <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white">
            Your Security is Our Priority
          </h2>
          <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto">
            All scans are private. We never permanently store your personal
            data. Your information is safe with our advanced security protocols.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
