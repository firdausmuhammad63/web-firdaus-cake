// src/pages/Keistimewaan.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Keistimewaan() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    {
      number: "1",
      title: "Bahan Premium & Alami",
      description:
        "Kami hanya menggunakan bahan-bahan pilihan dan alami, tanpa pengawet, agar rasa dan kualitas tetap terbaik.",
      icon: "🌿",
    },
    {
      number: "2",
      title: "Teknik Pembuatan Khusus",
      description:
        "Setiap kue dibuat dengan teknik profesional dan teliti, sehingga tekstur selalu lembut dan moist.",
      icon: "🎂",
    },
    {
      number: "3",
      title: "Varian Signature & Unik",
      description:
        "Kami memiliki koleksi signature cake yang eksklusif, dengan kombinasi rasa yang tidak ada duanya.",
      icon: "✨",
    },
    {
      number: "4",
      title: "Layanan Cepat & Aman",
      description:
        "Pesanan Anda diproses cepat dan dikemas aman, agar sampai tangan Anda dengan kondisi sempurna.",
      icon: "🚚",
    },
  ];

  // Auto-rotate setiap 4 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id="keistimewaan"
      className="relative py-20 bg-gradient-to-br from-yellow-50 via-yellow-200 to-yellow-200 dark:from-gray-900 dark:via-gray-700 dark:to-gray-700 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/10 dark:bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/10 dark:bg-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-cake md:text-7xl font-bold text-yellow-700 -mt-8 dark:text-yellow-500 mb-9"
        >
          Keistimewaan Kami
        </motion.h2>
        
        {/* Feature Display Area */}
        <div className="relative h-80 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              transition={{ 
                duration: 0.8, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 100
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-2xl max-w-md w-full mx-4 border-2 border-yellow-200 dark:border-yellow-600">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-14 h-12 bg-yellow-500 text-white font-bold text-xl rounded-full mb-6 mx-auto">
                  {features[currentIndex].number}
                </div>
                
                {/* Icon */}
                <div className="text-6xl mb-5">
                  {features[currentIndex].icon}
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-2xl text-yellow-700 dark:text-yellow-500 mb-4">
                  {features[currentIndex].title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 font-body dark:text-yellow-50 text-sm leading-relaxed">
                  {features[currentIndex].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3 -mb-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 mt-2 ${
                index === currentIndex
                  ? "bg-yellow-500 scale-125"
                  : "bg-yellow-300 dark:bg-gray-600 hover:bg-yellow-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
