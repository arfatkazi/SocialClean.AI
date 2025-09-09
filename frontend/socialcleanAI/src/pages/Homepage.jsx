import { motion } from "framer-motion";
import { Shield, Sparkles, Zap, BarChart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 ">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 px-6">
        <div className="text-center max-w-3xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-6 mt-52"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Clean Your Digital Footprint with{" "}
            <span className="text-indigo-600 dark:text-indigo-400">AI</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            SocialCleanAI helps you scan, filter, and clean your social media
            posts effortlessly. Stay professional. Stay safe.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <button className="px-6 py-3 rounded-full bg-indigo-600 text-white font-medium shadow-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-gray-800 transition">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
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
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                {item.icon}
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-indigo-50 dark:bg-gray-800">
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

      {/* Trust & Security */}
      <section className="py-20 px-6 bg-white dark:bg-gray-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Privacy & Security You Can Trust
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We use bank-level encryption and industry best practices. Your data
            belongs to you, always.
          </p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-indigo-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Clean Your Social Media?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of users who trust SocialCleanAI to protect their
            online presence.
          </p>
          <button className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold shadow-lg hover:bg-gray-100 transition">
            Get Started Now
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© {new Date().getFullYear()} SocialCleanAI. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}
