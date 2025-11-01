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

  const heading = ["SocialClean", ".", "Ai"];
  const headingWords = ["How", "It", "Works"];
  const tagline = ["Stay professionally", "Stay safe"];

  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.destroy();
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-10 overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto text-center relative z-20">
        {/* === Logo title animated === */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-gray-100 flex justify-center gap-2 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariant}
        >
          {heading.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariant}
              whileHover={{ scale: 1.01 }}
              className={
                word === "." ? "text-indigo-600 dark:text-indigo-400" : ""
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* === subtitle + tagline === */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="space-y-2 mb-10"
        >
          <h3 className="text-lg font-semibold sm:text-xl md:text-2xl text-gray-700 dark:text-white">
            Scan, filter and clean your social media posts effortlessly
          </h3>

          {tagline.map((line, i) => (
            <motion.h4
              key={i}
              className="text-lg font-semibold sm:text-xl md:text-2xl text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
            >
              {line}
            </motion.h4>
          ))}
        </motion.div>

        {/* === How it works text === */}
        <motion.h2
          className="text-2xl sm:text-3xl mt-25  md:text-5xl font-extrabold mb-20 text-gray-900 dark:text-gray-100 flex justify-center gap-3 flex-wrap"
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

        {/* === Swiper === */}
        <div className="relative">
          <Swiper
            onSwiper={(s) => (swiperRef.current = s)}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop
            coverflowEffect={{
              rotate: 30,
              depth: 150,
              modifier: 1.1,
              slideShadows: false,
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
                <div className="relative w-full h-64 [perspective:1000px]">
                  <div
                    className="relative w-full h-full rounded-2xl transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg [backface-visibility:hidden] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]">
                      <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-semibold text-xl md:text-2xl text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
                        {item.desc}
                      </p>
                    </div>

                    <div
                      className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-lg font-medium [backface-visibility:hidden]"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      More info about{" "}
                      <span className="font-semibold ml-1">{item.title}</span>!
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* buttons */}
        <div className="flex justify-between items-center max-w-md mx-auto mt-6">
          <button
            ref={prevRef}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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

      {/* neon divider */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400/50 via-indigo-500/50 to-violet-500/40 blur-[1px]" />
    </section>
  );
};

export default Works;
