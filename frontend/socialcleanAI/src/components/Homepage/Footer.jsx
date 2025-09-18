import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-10 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-center text-sm rounded-t-2xl shadow-inner mt-10">
      <p className="mb-4">
        © {new Date().getFullYear()} SocialCleanAI. All rights reserved.
      </p>

      <div className="flex justify-center gap-6 flex-wrap">
        {["Privacy Policy", "Terms of Service", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              href="#"
              className="relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors duration-200 group"
            >
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              {item}
            </a>
          )
        )}
      </div>
    </footer>
  );
};

export default Footer;
