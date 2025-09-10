import React from "react";
import { Shield, Sparkles, Zap, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div>
      <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-center text-sm transition-colors duration-300">
        <p>© {new Date().getFullYear()} SocialCleanAI. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-black dark:hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-black dark:hover:text-white">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
