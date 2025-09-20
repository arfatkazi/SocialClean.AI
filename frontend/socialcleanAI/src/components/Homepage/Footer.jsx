import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-center rounded-t-3xl shadow-inner mt-16">
      {/* Brand */}
      <p className="mb-6 font-semibold text-gray-800 dark:text-gray-100">
        © {new Date().getFullYear()}{" "}
        <span className="text-indigo-600 dark:text-indigo-400 mr-1">
          SocialClean.AI
        </span>
        All rights reserved.
      </p>

      {/* Links */}
      <div className="flex justify-center gap-8 flex-wrap mb-4">
        {["Privacy Policy", "Terms of Service", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              href="#"
              className="relative text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 group font-medium"
            >
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 dark:bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
              {item}
            </a>
          )
        )}
      </div>

      {/* Optional small note */}
      <p className="text-gray-500 dark:text-gray-400 text-xs">
        Made with ❤️ to keep your social media safe and professional.
      </p>
    </footer>
  );
};

export default Footer;
