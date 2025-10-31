import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is SocialCleanAI?",
    answer:
      "SocialCleanAI is an AI-powered tool that helps you scan, analyze, and clean your social media presence — detecting sensitive, negative, or reputation-damaging posts, images, and data automatically.",
  },
  {
    question: "How does the AI scan work?",
    answer:
      "Our AI scans your connected accounts using advanced NLP and image recognition models. It identifies posts with personal data, offensive language, or unsafe content and flags them for your review.",
  },
  {
    question: "Can I delete flagged posts automatically?",
    answer:
      "Yes. Once the scan is complete, you can choose to delete, hide, or archive flagged posts directly through your SocialCleanAI dashboard — with a single click for supported platforms.",
  },
  {
    question: "Is my data secure with SocialCleanAI?",
    answer:
      "Absolutely. We use end-to-end encryption, never store your credentials, and comply with GDPR and privacy-first practices. Your data belongs to you — always.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "Currently, SocialCleanAI supports Twitter (X), Instagram, Facebook, and Google Photos. We’re expanding to LinkedIn, YouTube, and Reddit soon.",
  },
  {
    question: "Do I need technical skills to use this?",
    answer:
      "Not at all. SocialCleanAI is built for everyone — from casual users to professionals. Our dashboard is intuitive, visual, and fully guided by smart AI suggestions.",
  },
  {
    question: "Can I use SocialCleanAI for business or brand accounts?",
    answer:
      "Yes. Many influencers and brands use SocialCleanAI to maintain their reputation and ensure compliance with company policies and community standards.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach us anytime at support@socialcleanai.com or through the contact form on our website. Our team responds within 24 hours.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <section className="relative py-20 px-6 md:px-20 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Decorative Divider */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-transparent"></div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold mb-10"
        >
          Frequently Asked <span className="text-indigo-600">Questions</span>
        </motion.h2>

        {/* FAQ List */}
        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 backdrop-blur-sm ${
                  isActive
                    ? "border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)] dark:shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-white/90 dark:bg-gray-800/90 animate-[pulseGlow_2s_ease-in-out_infinite]"
                    : "border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/70 hover:shadow-lg hover:border-indigo-300/40"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 focus:outline-none text-left transition-all duration-300"
                >
                  <span className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <ChevronDown
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isActive
                          ? "text-indigo-500 drop-shadow-[0_0_4px_rgba(99,102,241,0.6)]"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    />
                  </motion.div>
                </button>

                {/* Animated Answer */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.25, 0.8, 0.25, 1],
                      }}
                      className="px-6 pb-5 text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
