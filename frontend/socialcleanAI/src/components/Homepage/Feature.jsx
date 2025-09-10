import React from "react";
import { Shield, Sparkles, Zap, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const Feature = () => {
  const features = [
    {
      icon: (
        <Sparkles className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "AI-Powered Cleaning",
      desc: "Detect and filter harmful or unprofessional posts instantly.",
    },
    {
      icon: (
        <Shield className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "Privacy First",
      desc: "We don’t store your data permanently. You’re always in control.",
    },
    {
      icon: (
        <Zap className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "One-Click Scan",
      desc: "Connect your social accounts and scan them in seconds.",
    },
    {
      icon: (
        <BarChart className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "Detailed Reports",
      desc: "Get clear insights on risky posts with actionable suggestions.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-transparent transition-colors duration-300">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 dark:text-white">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {item.icon}
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
