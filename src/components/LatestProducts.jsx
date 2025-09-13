import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiCakeSlice } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function LatestProducts({ products, addToCart, highlightSearch }) {
  const latest = products.filter((p) => p.isNew);

  if (latest.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-pink-200 dark:from-gray-900 dark:to-gray-800">
      <h3 className="text-7xl font-cake font-bold text-center mb-10 text-pink-700 dark:text-pink-400 flex items-center justify-center gap-3">
        Fresh Cakes
      </h3>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        className="max-w-6xl mx-auto px-4 relative"
      >
        {latest.map((product, i) => (
          <SwiperSlide key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              className="p-4 border border-pink-400 rounded-lg bg-white dark:bg-gray-700 flex flex-col max-w-sm justify-between mx-auto"
            >
              <div className="relative">
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                    NEW
                  </span>
                )}
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-72 object-cover rounded-md mb-4"
                />
                <h4 className="font-semibold text-lg mb-2 text-pink-800 dark:text-white text-left">
                  {highlightSearch && product.highlightedName ? (
                    <span dangerouslySetInnerHTML={{ __html: product.highlightedName }} />
                  ) : (
                    product.name
                  )}
                </h4>
                <p className="text-pink-600 dark:text-pink-300 mb-2 text-left font-bold">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                {product.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 text-left line-clamp-2">
                  {product.description}
                </p>
                )}
                {/* Rating jika ada */}
                {product.rating && (
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < Math.floor(product.rating) ? "★" : "☆"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                      ({product.rating})
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/cake/${product.id}`}
                  className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-center"
                >
                  Detail
                </Link>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}

        {/* Tombol Navigasi */}
        <div className="swiper-button-prev-custom absolute top-1/2 -left-5 transform -translate-y-1/2 z-10 text-pink-600 hover:text-pink-700 cursor-pointer text-2xl font-bold">
          &#10094;
        </div>
        <div className="swiper-button-next-custom absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 text-pink-600 hover:text-pink-700 cursor-pointer text-2xl font-bold">
          &#10095;
        </div>
      </Swiper>
    </section>
  );
}
