import React, { useRef, useEffect } from "react";
import { Shield, Sparkles, Zap, BarChart } from "lucide-react";
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
        <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "AI-Powered Cleaning",
      desc: "Detect and filter harmful or unprofessional posts instantly.",
    },
    {
      icon: (
        <Shield className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "Privacy First",
      desc: "We don’t store your data permanently. You’re always in control.",
    },
    {
      icon: (
        <Zap className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "One-Click Scan",
      desc: "Connect your social accounts and scan them in seconds.",
    },
    {
      icon: (
        <BarChart className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      ),
      title: "Detailed Reports",
      desc: "Get clear insights on risky posts with actionable suggestions.",
    },
  ];

  // Heading animation
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
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Swiper refs
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
      } catch (err) {}
    }
  }, []);

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-300 overflow-hidden mt-10">
      {/* Gradient edges */}
      <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white dark:from-gray-900 pointer-events-none z-10" />
      <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white dark:from-gray-900 pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* Animated heading */}
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

        {/* Swiper */}
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
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
              <div className="relative w-full h-64 [perspective:1000px]">
                <div
                  className="relative w-full h-full rounded-2xl transition-transform duration-500 group-hover:[transform:rotateY(5deg) scale(1.05)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute w-full h-full flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 [backface-visibility:hidden]">
                    {item.icon}
                    <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div className="flex justify-between items-center max-w-md mx-auto mt-4">
          <button
            ref={prevRef}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition"
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition"
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
    </section>
  );
};

export default Feature;
