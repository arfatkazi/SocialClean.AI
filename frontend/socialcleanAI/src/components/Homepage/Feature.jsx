import React, { useRef, useEffect } from "react";
import { Shield, Sparkles, Zap, BarChart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const Feature = () => {
  const features = [
    {
      icon: (
        <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
      ),
      title: "AI-Powered Cleaning",
      desc: "Detect and filter harmful or unprofessional posts instantly.",
    },
    {
      icon: (
        <Shield className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
      ),
      title: "Privacy First",
      desc: "We don’t store your data permanently. You’re always in control.",
    },
    {
      icon: (
        <Zap className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
      ),
      title: "One-Click Scan",
      desc: "Connect your social accounts and scan them in seconds.",
    },
    {
      icon: (
        <BarChart className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
      ),
      title: "Detailed Reports",
      desc: "Get clear insights on risky posts with actionable suggestions.",
    },
    {
      icon: (
        <Eye className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
      ),
      title: "Social Presence Insight",
      desc: "Monitor your social footprint and maintain a professional image across platforms.",
    },
  ];

  const headingWords = ["Powerful", "Features"];

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    const prevEl = prevRef.current;
    const nextEl = nextRef.current;

    if (!swiper || !prevEl || !nextEl) return;

    if (swiper.params && swiper.navigation) {
      try {
        swiper.params.navigation.prevEl = prevEl;
        swiper.params.navigation.nextEl = nextEl;
        swiper.navigation.destroy();
        swiper.navigation.init();
        swiper.navigation.update();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-300 overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* Animated Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-10 sm:mb-12 text-gray-900 dark:text-white flex justify-center gap-3 flex-wrap"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {headingWords.map((word, i) => (
            <motion.span key={i} variants={wordVariant}>
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Swiper Section */}
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1.1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          className="pb-10"
        >
          {features.map((item, i) => (
            <SwiperSlide
              key={i}
              className="max-w-xs sm:max-w-sm md:max-w-md group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-64 [perspective:1000px]">
                  <div
                    className="relative w-full h-full rounded-2xl transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[0.9] group-hover:rotateY-[5deg] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card Content */}
                    <div className="absolute w-full h-full flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 [backface-visibility:hidden] transition-all duration-500 hover:border-indigo-400/70">
                      {item.icon}
                      <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                        {item.desc}
                      </p>

                      {/* Glow Overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-tr from-indigo-500/10 via-transparent to-violet-500/20 blur-[30px]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center max-w-md mx-auto mt-6">
          <button
            ref={prevRef}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            ref={nextRef}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
            aria-label="Next"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Soft Neon Divider */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400/50 via-indigo-500/50 to-violet-500/40 blur-[1px]" />
    </section>
  );
};

export default Feature;
