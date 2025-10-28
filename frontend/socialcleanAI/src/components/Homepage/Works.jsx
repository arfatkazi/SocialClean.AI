import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Swiper imports
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

        {/* Swiper with gradient overlays */}
        <div className="relative">
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
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            modules={[EffectCoverflow, Autoplay, Navigation]}
            className="pb-10"
          >
            {steps.map((item, i) => (
              <SwiperSlide
                key={i}
                className="max-w-xs sm:max-w-sm md:max-w-md group"
              >
                <div className="relative w-full h-64 [perspective:1000px]">
                  <div
                    className="relative w-full h-full rounded-2xl transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front Side */}
                    <div className="absolute w-full h-full flex flex-col items-center text-center p-4 sm:p-6 md:p-8 rounded-2xl bg-gray-100 dark:bg-gray-800 [backface-visibility:hidden]">
                      <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                        {item.desc}
                      </p>
                    </div>
                    {/* Back Side */}
                    <div
                      className="absolute w-full h-full flex items-center justify-center rounded-2xl bg-indigo-600 text-white [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <p className="text-center px-4">
                        More info about {item.title}!
                      </p>
                    </div>
                    {/* Gradient overlays */}
                    <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-white/80 dark:from-gray-900/20"></div>
                    <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-white/80 dark:from-gray-900/20"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom SVG Arrows */}
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
      {/* Indigo Divider (Sticky under Hero) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600/60 via-purple-500/60 to-transparent"></div>
    </section>
  );
};

export default Works;
