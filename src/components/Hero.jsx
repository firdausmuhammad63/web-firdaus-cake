import React, { useState, useEffect } from "react";
import { GiCakeSlice, GiCupcake, GiDonut } from "react-icons/gi";
import { FaStar, FaHeart, FaAward } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [GiCakeSlice, GiCupcake, GiDonut];

  // Rotasi icon setiap 2 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = icons[currentIcon];

  // Variants untuk animasi cake utama
  const cakeVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    exit: {
      opacity: 0,
      scale: 0,
      rotate: 45,
      transition: { duration: 0.3 },
    },
  };

  // Variants floating untuk dekorasi
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 overflow-hidden">
      {/* Floating Decorations */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-12 text-pink-400/30"
      >
        <GiCupcake className="text-6xl" />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-24 right-16 text-yellow-500/30"
        style={{ animationDelay: "1s" }}
      >
        <GiDonut className="text-7xl" />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-32 right-28 text-orange-500/30"
        style={{ animationDelay: "2s" }}
      >
        <GiCakeSlice className="text-6xl" />
      </motion.div>
            <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 left-28 text-orange-500/30"
        style={{ animationDelay: "2s" }}
      >
        <GiCakeSlice className="text-8xl" />
      </motion.div>

      {/* Animated Cake Icon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIcon}
          variants={cakeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mb-8"
        >
          <CurrentIcon className="text-8xl md:text-9xl text-yellow-600 dark:text-yellow-400 drop-shadow-lg" />
        </motion.div>
      </AnimatePresence>

      {/* Title */}
      <h1 className="text-7xl font-cake md:text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-700 via-orange-600 to-red-500 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent leading-tight">
        Firdaus Cake
      </h1>

      {/* Subtitle */}
      <p className="text-md px-14 font-body md:text-md lg:text-2xl text-gray-700 dark:text-gray-200 max-w-2xl mb-8 leading-relaxed">
        ✨ Premium Cake Boutique ✨ <br />
        Hadir dengan kue berkualitas premium, dibuat dengan cinta & bahan terbaik
        untuk setiap momen istimewa Anda.
      </p>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
        <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm rounded-full px-4 py-2">
          <FaStar className="text-yellow-500" />
          <span className="text-gray-700 font-body dark:text-gray-200 font-extrabold">
            Premium Quality
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm rounded-full px-4 py-2">
          <FaHeart className="text-red-500" />
          <span className="text-gray-700 font-body dark:text-gray-200 font-extrabold">
            Made with Love
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/30 dark:bg-gray-800/40 backdrop-blur-sm rounded-full px-4 py-2">
          <FaAward className="text-orange-500" />
          <span className="text-gray-700 font-body dark:text-gray-200 font-extrabold">
            Award Winning
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="#products"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition"
        >
          See Products
        </a>
        <a
          href="https://wa.me/62895413263355"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-white text-gray-800 dark:bg-gray-200 dark:text-gray-900 font-semibold shadow-md hover:shadow-lg transition"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}
