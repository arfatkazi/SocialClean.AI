import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-6"
        >
          About <span className="text-indigo-600">SocialCleanAI</span>
        </motion.h2>

        {/* Story */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg leading-relaxed mb-8"
        >
          SocialCleanAI was created with one simple goal: to help people take
          control of their online presence. In today’s world, old posts, photos,
          or comments can affect careers, relationships, and reputations. We
          built SocialCleanAI to give everyone a safe and smart way to review
          and clean their digital footprint.
        </motion.p>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              To empower users by giving them the tools to identify and remove
              harmful, offensive, or embarrassing content from their social
              media and digital history — quickly, securely, and effectively.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A world where everyone feels confident and safe about the content
              connected to their name. SocialCleanAI envisions a digital future
              where your past no longer holds you back.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
