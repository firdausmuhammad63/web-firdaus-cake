import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Fungsi format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

export default function LatestProducts({ products, addToCart, highlightSearch }) {
  const latest = products.filter((p) => p.isNew);

  if (latest.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-r from-yellow-50 to-yellow-400 dark:from-slate-600 dark:to-slate-900">
      {/* Header */}
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl font-cake font-bold text-center mb-10 text-yellow-700 dark:text-yellow-500"
      >
        Fresh Cakes
      </motion.h3>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-12"
        >
          {latest.map((product, i) => (
            <SwiperSlide key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0px 12px 24px rgba(234,179,8,0.3)",
                  scale: 1.02,
                }}
                className="bg-white dark:bg-gray-700 rounded-xl max-w-sm mx-auto shadow-md hover:shadow-xl border border-yellow-200 dark:border-gray-600 overflow-hidden transition-all duration-300 flex flex-col h-full"
              >
{/* Gambar */}
<div className="relative mb-4">
  {/* Badge NEW */}
  {product.isNew && (
    <motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-20"
    >
      NEW
    </motion.span>
  )}

  {/* Container khusus gambar untuk efek scale */}
  <div className="overflow-hidden rounded-md shadow-md">
    <img
      src={product.img}
      alt={product.name}
      className="w-full h-60 object-cover transform transition-transform duration-500 hover:scale-105"
    />
  </div>
</div>



                {/* Konten */}
                <div className="p-4 -mt-5 flex flex-col flex-grow">
                  <h4 className="font-semibold text-lg mb-2 text-yellow-800 dark:text-white line-clamp-2">
                    {highlightSearch && product.highlightedName ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: product.highlightedName,
                        }}
                      />
                    ) : (
                      product.name
                    )}
                  </h4>

                  <p className="text-yellow-700 dark:text-yellow-300 mb-2 font-bold text-base">
                    {formatRupiah(product.price)}
                  </p>

                  {product.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                  )}

                  {product.rating && (
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={
                              index < Math.floor(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                        ({product.rating})
                      </span>
                    </div>
                  )}

                  {/* Tombol */}
                  <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                    >
                      Add to Cart
                    </motion.button>
                    <Link to={`/cake/${product.id}`} className="flex-1">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-center font-medium text-sm sm:text-base"
                      >
                        Detail
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}

          {/* Tombol Navigasi */}
          <div className="swiper-button-prev-custom absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 text-yellow-700 hover:text-yellow-800 cursor-pointer text-3xl font-bold">
            &#10094;
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 text-yellow-700 hover:text-yellow-800 cursor-pointer text-3xl font-bold">
            &#10095;
          </div>
        </Swiper>
      </div>
    </section>
  );
}
