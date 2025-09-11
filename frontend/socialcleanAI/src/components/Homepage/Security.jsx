import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const Security = () => {
  return (
    <section className="py-16 sm:py-20 px-6 sm:px-10 md:px-16 bg-custom-dark">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          className="p-8 sm:p-10 md:p-12 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Lock className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-indigo-400 mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 text-white">
            Your Security is Our Priority
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
            All scans are private. We never permanently store your personal
            data. Your information is safe with our advanced security protocols.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Security;
