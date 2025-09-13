import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GiCakeSlice } from "react-icons/gi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function BestSeller({ products, addToCart, highlightSearch, customTitle }) {
  // Jika products sudah difilter dari parent (saat ada filter aktif), gunakan langsung
  // Jika tidak (tampilan normal), filter untuk bestseller saja
  const displayProducts = products.filter ? products : products.filter((p) => p.isBestSeller);

  // Jika tidak ada produk, jangan render apapun
  if (!displayProducts || displayProducts.length === 0) return null;

  // Gunakan customTitle dari props atau default
  const sectionTitle = customTitle || "Best Sellers";

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-gray-500 dark:to-gray-800">
      <div className="w-full flex flex-col items-center">
        <h3 className="text-7xl font-cake font-bold text-center mb-10 text-orange-700 dark:text-orange-400 flex items-center justify-center gap-3">
          {sectionTitle}
        </h3>

        {/* Mobile & Tablet - Swiper */}
        <div className="w-full max-w-6xl px-1 lg:hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next-custom-bestseller",
              prevEl: ".swiper-button-prev-custom-bestseller",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            breakpoints={{ 
              768: { 
                slidesPerView: 2,
                centeredSlides: displayProducts.length === 1
              }
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

            {/* Tombol Navigasi untuk Mobile/Tablet - dengan class unik */}
            <div className="swiper-button-prev-custom-bestseller absolute top-1/2 -left-5 transform -translate-y-1/2 z-10 text-orange-600 hover:text-orange-700 cursor-pointer text-2xl font-bold">
              ❮
            </div>
            <div className="swiper-button-next-custom-bestseller absolute top-1/2 -right-5 transform -translate-y-1/2 z-10 text-orange-600 hover:text-orange-700 cursor-pointer text-2xl font-bold">
              ❯
            </div>
          </Swiper>
        </div>

        {/* Desktop - Grid Layout */}
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

// Komponen ProductCard untuk menghindari duplikasi kode
function ProductCard({ product, index, addToCart, highlightSearch, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className={`p-4 border border-orange-400 rounded-lg bg-white dark:bg-gray-700 flex flex-col justify-between h-full ${
        isMobile ? 'w-full max-w-sm md:max-w-md mx-auto' : 'w-full'
      }`}
    >
      <div className="relative">
        {/* Badge untuk New */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
            NEW
          </span>
        )}
        
        {/* Badge untuk Best Seller */}
        {product.isBestSeller && (
          <span className={`absolute top-2 ${product.isNew ? 'right-2' : 'left-2'} bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded shadow z-10`}>
            BEST SELLER
          </span>
        )}
        
        <img
          src={product.img}
          alt={product.name}
          className={`w-full object-cover rounded-md mb-4 ${isMobile ? 'h-72' : 'h-56'}`}
        />
        
        <h4 className="font-semibold text-lg mb-2 text-orange-800 dark:text-white text-left">
          {highlightSearch && product.highlightedName ? (
            <span dangerouslySetInnerHTML={{ __html: product.highlightedName }} />
          ) : (
            product.name
          )}
        </h4>
        
        <p className="text-orange-600 dark:text-orange-300 mb-2 text-left font-bold">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
        
        {/* Deskripsi singkat jika ada */}
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
          className="flex-1 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors duration-200 font-medium"
        >
          Add to Cart
        </button>
        <Link
          to={`/bestseller/${product.id}`}
          className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 text-center font-medium"
        >
          Detail
        </Link>
      </div>
    </motion.div>
  );
}
