import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-center text-sm transition-colors duration-300">
      <p>© {new Date().getFullYear()} SocialCleanAI. All rights reserved.</p>
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
        >
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
