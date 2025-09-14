import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Packaging() {
  const rules = [
    "Kami tidak melayani pemesanan kue untuk perayaan ulang tahun.",
    "Produk kami hanya diperuntukkan untuk bingkisan, atau kado.",
    "Setiap packaging dibuat eksklusif agar terlihat elegan.",
    "Kami menjaga kualitas kemasan agar kue tetap aman & menarik.",
  ];

  const packagingImages = [
    "https://images.unsplash.com/photo-1694395998892-5225e95b8a47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section className="bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-gray-500 dark:to-gray-900 py-16 sm:py-20 sm:-mb-11 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-11 sm:mb-16 lg:mb-20"
        >
          <h1 className="text-5xl lg:text-8xl font-cake font-bold text-yellow-700 -mt-5 dark:text-yellow-500 mb-4">
            Aturan Packaging
          </h1>
          <p className="text-lg sm:text-xl md:text-md lg:text-2xl text-yellow-700 font-body dark:text-yellow-200 max-w-4xl mx-auto leading-relaxed">
            Kami ingin setiap cake tampil elegan, layak dan berkesan.
          </p>
        </motion.div>

        {/* Rules Section */}
        <div className="flex justify-center mb-3 -mt-4 sm:mb-16 lg:mb-20">
          <div className="w-full max-w-5xl">
            <motion.ul 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8 lg:space-y-10"
            >
              {rules.map((rule, index) => (
                <motion.lix
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className="flex items-start justify-center"
                >
                  <div className="flex items-start -mb-3 gap-4 sm:gap-5 lg:gap-6 max-w-3xl w-full px-6 sm:px-8 md:px-12 lg:px-16">
                    <CheckCircle className="text-yellow-600 dark:text-yellow-400 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 flex-shrink-0" />
                    <span className="text-md sm:text-lg md:text-xl lg:text-xl font-body text-yellow-800 dark:text-yellow-300 leading-relaxed">
                      {rule}
                    </span>
                  </div>
                </motion.lix>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>     
    </section>
  );
}
