import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroCopy = () => {
  const ref = React.useRef(null);
  const navigate = useNavigate();

  const headingWords = ["Clean", "Your", "Digital", "Footprint"];

  const isMobile = window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "10%" : "30%"]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isMobile ? 1.02 : 1.08]
  );
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", isMobile ? "4px" : "8px"]
  );

  const yBack = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const yMid = y;
  const yFront = useTransform(scrollYProgress, [0, 1], ["5%", "25%"]);

  const yBackSpring = useSpring(yBack);
  const yMidSpring = useSpring(yMid);
  const yFrontSpring = useSpring(yFront);
  const scaleSpring = useSpring(scale);

  const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  const textOpacitySpring = useSpring(textOpacity);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center px-4 sm:px-10 py-28 sm:py-36 min-h-[100vh] overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* BACKGROUND IMAGES */}
      {[0, 1, 2].map((i) => (
        <motion.img
          key={i}
          src="/HERO_IMG.png"
          className={`absolute inset-0 w-full h-full object-cover mt-30 ${
            i === 2 ? "opacity-30 mix-blend-screen" : ""
          }`}
          style={{
            y: [yBackSpring, yMidSpring, yFrontSpring][i],
            scale: scaleSpring,
            filter: blur,
            willChange: "transform",
          }}
        />
      ))}

      {/* CONTENT */}
      <div
        className="relative z-20 text-center max-w-3xl"
        style={{ opacity: textOpacitySpring }}
      >
        {/* HEADING */}
        <h1 className="text-4xl sm:text-6xl -mt-60 md:text-7xl font-extrabold leading-tight text-white mb-6">
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mr-2"
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* BUTTONS */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: headingWords.length * 0.15 + 0.4,
            duration: 0.8,
          }}
        >
          <motion.button
            onClick={() => navigate("/signup")}
            whileHover={{
              scale: 1.07,
              background: "linear-gradient(90deg,#4f46e5,#6366f1)",
              boxShadow: "0px 12px 24px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.94 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-indigo-600/60 backdrop-blur-xl border border-white/20 text-white font-semibold shadow-md"
          >
            Get Started
          </motion.button>

          <motion.button
            onClick={() => navigate("/about")}
            whileHover={{
              scale: 1.07,
              background: "rgba(255,255,255,0.92)",
              color: "#4f46e5",
            }}
            whileTap={{ scale: 0.94 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-indigo-400/50 backdrop-blur-xl bg-white/10 text-white font-semibold"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCopy;
