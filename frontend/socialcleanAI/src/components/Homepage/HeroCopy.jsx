import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroCopy = () => {
  const ref = React.useRef(null);
  const navigate = useNavigate();

  const headingWords = ["Clean", "Your", "Digital", "Footprint"];

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // parallax scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]); // slow zoom
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "8px"]);
  // Depth parallax layers + GPU-optimized springs
  const yBack = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]); // far background
  const yMid = y; // middle (main)
  const yFront = useTransform(scrollYProgress, [0, 1], ["10%", "50%"]); // foreground

  const yBackSpring = useSpring(yBack, {
    stiffness: 100,
    damping: 20,
    mass: 0.3,
  });
  const yMidSpring = useSpring(yMid, {
    stiffness: 100,
    damping: 20,
    mass: 0.3,
  });
  const yFrontSpring = useSpring(yFront, {
    stiffness: 100,
    damping: 20,
    mass: 0.3,
  });
  const scaleSpring = useSpring(scale, {
    stiffness: 90,
    damping: 18,
    mass: 0.35,
  });

  // Fade text as image zooms
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [1, 0.9, 0.5, 0]
  );
  const textOpacitySpring = useSpring(textOpacity, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  return (
    <section
      ref={ref}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className="relative flex flex-col items-center justify-start md:justify-center touch-pan-y px-6 md:px-16 py-20 md:py-32 min-h-[80vh] md:min-h-[90vh] overflow-hidden"
    >
      {/* Image Background */}
      <motion.img
        src="/HERO_IMG.png"
        alt="Hero Background Back"
        className=" mt-10 absolute top-0 md:top-10 left-0 w-full h-full object-cover z-0"
        initial={{ opacity: 0, filter: "blur(12px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ y: yBackSpring, scale: scaleSpring, willChange: "transform" }}
      />
      <motion.img
        src="/HERO_IMG.png"
        alt="Hero Background Mid"
        className=" mt-10 absolute top-0 md:top-10 left-0 w-full h-full object-cover z-10"
        style={{ y: yMidSpring, scale: scaleSpring, willChange: "transform" }}
      />
      <motion.img
        src="/HERO_IMG.png"
        alt="Hero Background Front"
        className="absolute top-0 md:top-10 left-0 w-full h-full object-cover z-20 pointer-events-none opacity-25 mix-blend-screen"
        style={{ y: yFrontSpring, scale: scaleSpring, willChange: "transform" }}
      />

      {/* Hero Content */}
      <div
        className="relative z-30 text-center max-w-4xl  md:mt-0"
        style={{ opacity: textOpacitySpring }}
      >
        <h1 className="text-3xl sm:text-5xl -mt-65 md:text-7xl font-extrabold mb-6 text-white leading-snug sm:leading-tight md:leading-[1.1]">
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              className={`inline-block mr-2 sm:mr-3 ${
                word.includes("AI")
                  ? "text-indigo-100 drop-shadow-[0_0_10px_rgba(99,102,241,0.9)]"
                  : ""
              }`}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.25,
                ease: "easeOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 md:mb-10 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: headingWords.length * 0.25 + 0.2, duration: 1 }}
        ></motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-xs mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: headingWords.length * 0.25 + 0.5,
            duration: 0.8,
          }}
        >
          {/* Get Started Button */}
          <motion.button
            onClick={() => navigate("/signup")}
            whileHover={{
              scale: 1.08,
              background: "linear-gradient(90deg, #4f46e5, #6366f1)",
              boxShadow: "0px 12px 24px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-indigo-600/60 backdrop-blur-xl border border-white/20 text-white font-semibold shadow-lg transition-all duration-300"
          >
            Get Started
          </motion.button>

          {/* Learn More Button */}
          <motion.button
            onClick={() => navigate("/about")} // navigate to About page
            whileHover={{
              scale: 1.08,
              backgroundColor: "#ffffff",
              color: "#4f46e5",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-indigo-400/50 backdrop-blur-xl bg-white/10 text-white font-semibold transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCopy;
