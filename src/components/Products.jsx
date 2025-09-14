import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Fungsi format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", { 
    style: "currency", 
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

export default function Products({ products, addToCart, highlightSearch, customTitle }) {
  // Jika tidak ada produk, jangan render apapun
  if (!products || products.length === 0) return null;

  // Gunakan customTitle dari props atau default
  const sectionTitle = customTitle || "All Cakes";

  return (
    <section
      id="products"
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-yellow-50 to-yellow-400 dark:from-slate-600 dark:to-slate-900"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 lg:mb-16 px-4"
      >
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-cake font-bold text-yellow-700 dark:text-yellow-500">
          {sectionTitle}
        </h3>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              delay: i * 0.08, 
              duration: 0.5, 
              ease: "easeOut" 
            }}
            whileHover={{
              y: -4,
              boxShadow: "0px 12px 24px rgba(234,179,8,0.3)",
              scale: 1.02
            }}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-xl border border-yellow-200 dark:border-gray-600 overflow-hidden transition-all duration-300 flex flex-col h-full"
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              {/* Badges */}
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
                className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover transition-transform duration-300 hover:scale-105"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content Container */}
            <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">
              {/* Product Name */}
              <h4 className="font-semibold text-base sm:text-lg lg:text-xl mb-2 text-yellow-800 dark:text-white line-clamp-2 leading-tight">
                {highlightSearch && product.highlightedName ? (
                  <span dangerouslySetInnerHTML={{ __html: product.highlightedName }} />
                ) : (
                  product.name
                )}
              </h4>

              {/* Price */}
              <p className="text-yellow-700 dark:text-yellow-300 mb-3 font-bold text-sm sm:text-base lg:text-lg">
                {formatRupiah(product.price)}
              </p>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed flex-grow">
                  {product.description}
                </p>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={index < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                    ({product.rating})
                  </span>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2 sm:py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  Add to Cart
                </motion.button>
                <Link
                  to={`/cake/${product.id}`}
                  className="flex-1"
                >
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
        ))}
      </div>

      {/* Info Section */}
      {customTitle && products.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12 px-4"
        >
          <p className="text-yellow-700 dark:text-yellow-300 text-sm sm:text-base">
            Menampilkan {products.length} produk
          </p>
        </motion.div>
      )}
    </section>
  );
}
