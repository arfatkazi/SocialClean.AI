import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="relative w-full py-14 bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 text-center rounded-t-3xl shadow-inner mt-20 overflow-hidden"
    >
      {/* Gradient Glow Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-purple-500/10 blur-2xl opacity-70 animate-[pulseGlow_6s_ease-in-out_infinite]"></div>

      {/* Subtle Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-transparent"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Brand Name */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            SocialClean.Ai
          </span>
        </motion.h3>

        {/* Animated Links */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center gap-8 flex-wrap mb-8"
        >
          {["Privacy Policy", "Terms of Service", "Contact"].map(
            (item, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="relative text-gray-700 dark:text-gray-300 font-medium group transition-all duration-300"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            )
          )}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
            SocialClean.AI
          </span>{" "}
          — All rights reserved.
        </motion.p>

        {/* Slogan / Note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 text-xs text-gray-500 dark:text-gray-400"
        >
          Made with ❤️ to keep your social media safe and professional.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
