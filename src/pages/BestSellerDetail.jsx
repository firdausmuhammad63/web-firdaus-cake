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

  if (!product) return <p className="text-center py-20">Produk tidak ditemukan.</p>;

  // Styles khusus Best Seller
  const styles = {
    bgClass: "from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-700",
    nameClass: "text-3xl font-bold text-orange-700 dark:text-orange-400 mb-4",
    priceClass: "text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-6",
    orderBtnClass: "px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition",
  };

  return (
    <div
      className={`min-h-screen pt-28 pb-24 px-6 bg-gradient-to-r ${styles.bgClass} scroll-mt-28`}
    >
      <motion.div
        className="max-w-3xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Label BEST SELLER */}
        {product.isBestSeller && (
          <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
            BEST SELLER
          </span>
        )}

        {/* Gambar */}
        <motion.img
          src={product.img}
          alt={product.name}
          className="w-full h-72 md:h-96 object-cover rounded-lg mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />

        {/* Nama & Deskripsi */}
        <motion.h2
          className={styles.nameClass}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {product.name}
        </motion.h2>

        <motion.p
          className="text-gray-700 font-body dark:text-gray-300 mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {product.desc}
        </motion.p>

        <motion.p
          className={styles.priceClass}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {formatRupiah(product.price)}
        </motion.p>

        {/* Tombol */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className={styles.orderBtnClass}
          >
            Pesan Sekarang
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
