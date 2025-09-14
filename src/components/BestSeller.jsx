// src/components/BestSeller.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);

export default function BestSeller({ products, addToCart, highlightSearch, customTitle }) {
  const displayProducts = Array.isArray(products) ? products.filter((p) => p.isBestSeller) : [];
  if (!displayProducts.length) return null;

  const sectionTitle = customTitle || "Best Sellers";

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-gray-500 dark:to-gray-800">
      <div className="w-full flex flex-col items-center">
        <h3 className="text-5xl font-cake font-bold text-center mb-10 text-orange-700 dark:text-orange-400">{sectionTitle}</h3>

        {/* MOBILE & TABLET SWIPER */}
        <div className="w-full max-w-6xl px-1 lg:hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{
              768: { slidesPerView: 2, centeredSlides: displayProducts.length === 1 },
            }}
            className="relative w-full"
          >
            {displayProducts.map((product, i) => (
              <SwiperSlide key={product.id} className="flex justify-center">
                <ProductCard
                  product={product}
                  index={i}
                  addToCart={addToCart}
                  highlightSearch={highlightSearch}
                  isMobile={true}
                />
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev-custom absolute top-1/2 -left-5 transform -translate-y-1/2 z-10 text-orange-600 hover:text-orange-700 cursor-pointer text-2xl font-bold">❮</div>
            <div className="swiper-button-next-custom absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 text-orange-600 hover:text-orange-700 cursor-pointer text-2xl font-bold">❯</div>
          </Swiper>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:flex justify-center w-full max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                addToCart={addToCart}
                highlightSearch={highlightSearch}
                isMobile={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, addToCart, highlightSearch, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0px 12px 24px rgba(234,179,8,0.3)", scale: 1.02 }}
      className="bg-white dark:bg-gray-700 rounded-xl max-w-sm mx-auto shadow-md hover:shadow-xl border border-yellow-200 dark:border-gray-600 overflow-hidden transition-all duration-300 flex flex-col h-full"
    >
      {/* IMAGE & BADGES */}
      <div className="relative overflow-hidden">
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10">
          <div className="flex flex-col gap-1">
            {product.isNew && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md"
              >
                NEW
              </motion.span>
            )}
            {product.isBestSeller && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md"
              >
                BEST SELLER
              </motion.span>
            )}
          </div>
        </div>

        <motion.img
          src={product.img}
          alt={product.name}
          className={`w-full object-cover ${isMobile ? "h-72" : "h-56"} transition-transform duration-300 hover:scale-105`}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
        <h4 className="font-semibold text-base sm:text-lg lg:text-xl mb-2 text-yellow-800 dark:text-white line-clamp-2 leading-tight">
          {highlightSearch && product.highlightedName ? (
            <span dangerouslySetInnerHTML={{ __html: product.highlightedName }} />
          ) : (
            product.name
          )}
        </h4>

        <p className="text-yellow-700 dark:text-yellow-300 mb-3 font-bold text-sm sm:text-base lg:text-lg">
          {formatRupiah(product.price)}
        </p>

        {product.description && (
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}

        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 text-sm">
              {[...Array(5)].map((_, idx) => (
                <span key={idx}>{idx < Math.floor(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">({product.rating})</span>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product)}
            className="flex-1 py-2 sm:py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium text-sm sm:text-base"
          >
            Add to Cart
          </motion.button>
          <Link to={`/bestseller/${product.id}`} className="flex-1">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 sm:py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-center font-medium text-sm sm:text-base"
            >
              Detail
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
