import React from "react";
import { motion } from "framer-motion";

const Works = () => {
  return (
    <div>
      {/* How it works */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 mt-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Connect Accounts",
                desc: "Link your Twitter, Instagram, or Facebook in seconds.",
              },
              {
                step: "2",
                title: "AI Scan",
                desc: "Our AI scans your posts for harmful or risky content.",
              },
              {
                step: "3",
                title: "Clean Up",
                desc: "Review flagged posts and clean them with one click.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Works;
