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
      className="py-9 bg-gradient-to-r from-yellow-50 to-yellow-400 dark:from-slate-600 dark:to-slate-900"
    >
      <h3 className="text-7xl font-cake font-bold text-center mb-8 text-yellow-700 dark:text-yellow-500">
        {sectionTitle}
      </h3>

      {/* Grid responsif yang lebih baik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 place-items-center">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={{
              boxShadow: "0px 8px 20px rgba(234,179,8,0.4)", // glow kuning
              scale: 1.02
            }}
            className="p-4 border border-yellow-500 rounded-lg bg-gray-50  dark:bg-gray-700 flex flex-col justify-center max-w-sm h-full"
          >
            <div className="relative">
              {/* Badge untuk New */}
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
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
                className="w-full sm:h-56 md:h-60 object-cover rounded-md mb-4"
              />
              
              <h4 className="font-semibold text-lg mb-2 text-yellow-800 dark:text-white text-left">
                {highlightSearch && product.highlightedName ? (
                  <span dangerouslySetInnerHTML={{ __html: product.highlightedName }} />
                ) : (
                  product.name
                )}
              </h4>
              
              <p className="text-yellow-700 dark:text-yellow-300 mb-2 text-left font-bold">
                {formatRupiah(product.price)}
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

            {/* Tombol */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors duration-200 font-medium"
              >
                Add to Cart
              </button>
              <Link
                to={`/cake/${product.id}`}
                className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 text-center font-medium"
              >
                Detail
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info tambahan jika sedang dalam mode filter */}
      {customTitle && products.length > 0 && (
        <div className="text-center mt-8 px-4">
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            Menampilkan {products.length} produk
          </p>
        </div>
      )}
    </section>
  );
}
