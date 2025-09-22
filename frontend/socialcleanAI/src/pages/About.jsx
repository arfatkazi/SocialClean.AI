import React from "react";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariant = (direction = 0) => ({
  hidden: { opacity: 0, x: direction * 50, y: 50 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 25, duration: 1.2 },
  },
});

const About = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
            duration: 1.2,
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-4xl font-extrabold mb-6 mt-30"
        >
          Who We Are <span className="text-indigo-600">at SocialCleanAI</span>
        </motion.h2>

        {/* Story */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
            duration: 1.2,
            delay: 0.3,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-base md:text-lg leading-relaxed mb-12"
        >
          SocialCleanAI is a team of passionate developers, designers, and AI
          experts dedicated to helping individuals take control of their digital
          footprint. Our platform ensures every user can manage, review, and
          clean their online presence safely and efficiently. We believe in
          empowering people to shape their digital identity with confidence.
        </motion.p>

        {/* Mission + Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 text-left mb-16"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            {
              title: "Our Mission",
              text: "To provide a reliable and intelligent solution for managing digital content. Our mission is to give everyone the power to remove or protect content that may impact their personal or professional life.",
            },
            {
              title: "Our Vision",
              text: "We envision a digital world where people are confident and in control of their online presence. SocialCleanAI aims to be the trusted companion for safeguarding reputations and maintaining a positive digital identity.",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              variants={itemVariant(idx % 2 === 0 ? -1 : 1)}
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
              }}
              className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
            >
              <h3 className="text-xl font-bold text-indigo-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Process */}
        <motion.div
          className="mb-16"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            Our Process
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                step: "Discover",
                desc: "Analyze social media & digital footprint using AI.",
              },
              {
                step: "Evaluate",
                desc: "Review flagged content with context & suggestions.",
              },
              {
                step: "Act",
                desc: "Remove, archive, or protect content efficiently.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                variants={itemVariant(idx % 2 === 0 ? -1 : 1)}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
                }}
                className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-center cursor-pointer"
              >
                <div className="text-indigo-600 text-3xl font-bold mb-3">
                  {idx + 1}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.step}</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          className="mb-16"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            Meet the Team
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alice Johnson", role: "Founder & CEO" },
              { name: "Mark Lee", role: "Lead AI Engineer" },
              { name: "Sophie Kim", role: "Product Designer" },
            ].map((member, idx) => (
              <motion.div
                key={member.name}
                variants={itemVariant(idx % 2 === 0 ? -1 : 1)}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0px 12px 25px rgba(0,0,0,0.15)",
                }}
                className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 text-center cursor-pointer"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {member.name.split(" ")[0][0]}
                  {member.name.split(" ")[1][0]}
                </div>
                <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-16"
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
            Our Core Values
          </h3>
          <ul className="space-y-4 text-left md:max-w-2xl mx-auto">
            {[
              "Integrity & Transparency",
              "Innovation & AI Excellence",
              "User Empowerment",
              "Privacy & Security First",
              "Collaboration & Growth",
              "Continuous Improvement",
            ].map((value, idx) => (
              <motion.li
                key={value}
                variants={itemVariant(idx % 2 === 0 ? -1 : 1)}
                className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start"
              >
                <span className="text-indigo-600 font-bold mr-2">•</span>{" "}
                {value}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
