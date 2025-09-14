import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Data produk (hanya contoh, bisa impor dari file lain)
const products = [
  {
    id: 6, 
    name: "Brownies Kukus Premium", 
    price: 120000, 
    img: "https://foto.kontan.co.id/mrrVhlWYRgrpzEcr_FrEvQvKkWY=/smart/2024/07/10/296713580p.jpg",
    desc: "Brownies kukus dengan tekstur lembut dan rasa cokelat pekat yang meleleh di mulut. Dibuat dari cokelat pilihan dan bahan berkualitas tinggi, menghadirkan sensasi manis yang pas dan moist sempurna. Cocok untuk teman ngopi, hadiah, atau oleh-oleh keluarga.",
    isBestSeller: true,
  },
  {
    id: 1, 
    name: "Lapis Legit Premium", 
    price: 180000, 
    img: "https://javara.co.id/wp-content/uploads/2023/01/istockphoto.jpeg",
    desc: "Kue tradisional berlapis-lapis dengan cita rasa manis legit khas rempah pilihan. Dibuat dari banyak lapisan tipis dengan mentega premium, telur segar, dan bumbu rempah nusantara, menghasilkan tekstur lembut dan aroma harum yang elegan. Cocok untuk hadiah, hampers, atau sajian di momen spesial.",
    isBestSeller: true,
  },
  {
    id: 10,
    name: "Donuts Premium",
    price: 10000,
    img: "https://images.unsplash.com/photo-1630150275481-fdd323506564?q=80&w=1208&auto=format&fit=crop&=80",
    desc: "Donuts premium dengan balutan coklat, dihiasi taburan meses yang creamy diatasnya.",
    isBestSeller: true,
  },
  {
    id: 11,
    name: "Mini Ice Cream Cake",
    price: 15000,
    img: "https://images.unsplash.com/photo-1570806516998-c4c167ee2f55?q=80&w=1374&auto=format&fit=crop&=80",
    desc: "Kue mungil berbalut es krim lembut dengan tekstur creamy dan manis seimbang. Ukurannya pas untuk porsi pribadi, cocok sebagai camilan manis atau hidangan penutup istimewa.",
    isBestSeller: true,
  }
];

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);

export default function BestSellerDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-700">
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          Produk tidak ditemukan.
        </p>
      </div>
    );
  }

  // Styles khusus Best Seller
  const styles = {
    bgClass: "from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-700",
    nameClass: "text-xl sm:text-2xl lg:text-3xl font-bold text-orange-700 dark:text-orange-400 mb-3",
    priceClass: "text-lg sm:text-xl lg:text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-4",
    orderBtnClass: "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm sm:text-base font-medium",
  };

  return (
    <div
      className={`min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-r ${styles.bgClass} scroll-mt-28`}
    >
      <motion.div
        className="max-w-2xl lg:max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Label BEST SELLER */}
        {product.isBestSeller && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded shadow-md z-10"
          >
            BEST SELLER
          </motion.span>
        )}

        {/* Gambar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-48 sm:h-64 lg:h-60 object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Nama Produk */}
          <motion.h1
            className={styles.nameClass}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {product.name}
          </motion.h1>

          {/* Deskripsi */}
          <motion.p
            className="text-gray-700 font-body dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base lg:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {product.desc}
          </motion.p>

          {/* Harga */}
          <motion.div
            className={styles.priceClass}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {formatRupiah(product.price)}
          </motion.div>

          {/* Tombol */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 text-sm sm:text-base font-medium"
            >
              ← Kembali
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(product)}
              className={styles.orderBtnClass}
            >
              Pesan Sekarang
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
