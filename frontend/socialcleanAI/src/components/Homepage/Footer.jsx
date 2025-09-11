import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="py-8 bg-gray-900 text-gray-300 text-center text-sm rounded-t-2xl shadow-inner"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <p className="mb-4">
        © {new Date().getFullYear()} SocialCleanAI. All rights reserved.
      </p>

      <div className="flex justify-center gap-6">
        {["Privacy Policy", "Terms of Service", "Contact"].map(
          (item, index) => (
            <motion.a
              key={index}
              href="#"
              className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              {item}
            </motion.a>
          )
        )}
      </div>
    </motion.footer>
  );
};

export default Footer;
