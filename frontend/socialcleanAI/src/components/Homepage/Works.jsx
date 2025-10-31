import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const Works = () => {
  const steps = [
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
    {
      step: "4",
      title: "Stay Secure",
      desc: "Keep your online presence safe with ongoing monitoring.",
    },
    {
      step: "5",
      title: "Peace of Mind",
      desc: "Focus on what matters while we handle your social safety.",
    },
  ];

  const headingWords = ["How", "It", "Works"];
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

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10 transition-colors duration-300 overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-10 sm:mb-12 text-gray-900 dark:text-gray-100 flex justify-center gap-3 flex-wrap"
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
        <div className="relative">
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
              slideShadows: false, // ❌ disables dark flicker shadows
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            modules={[EffectCoverflow, Autoplay, Navigation]}
            className="pb-10"
          >
            {steps.map((item, i) => (
              <SwiperSlide
                key={i}
                className="max-w-xs sm:max-w-sm md:max-w-md group"
              >
                {/* Card Container */}
                <div className="relative w-full h-64 [perspective:1000px]">
                  <div
                    className="relative w-full h-full rounded-2xl transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg [backface-visibility:hidden] transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]">
                      <div className="text-3xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-xl md:text-2xl text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                        {item.desc}
                      </p>
                    </div>

                    {/* Back */}
                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-lg font-medium [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <p className="px-4 text-center">
                        More info about{" "}
                        <span className="font-semibold">{item.title}</span>!
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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

      {/* Divider (soft neon gradient) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400/50 via-indigo-500/50 to-violet-500/40 blur-[1px]"></div>
    </section>
  );
};

export default Works;
