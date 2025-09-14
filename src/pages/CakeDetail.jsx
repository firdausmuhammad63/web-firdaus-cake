import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Data produk
const products = [
  { 
    id: 1, 
    name: "Lapis Legit Premium", 
    price: 180000, 
    img: "https://javara.co.id/wp-content/uploads/2023/01/istockphoto.jpeg",
    desc: "Kue tradisional berlapis-lapis dengan cita rasa manis legit khas rempah pilihan. Dibuat dari banyak lapisan tipis dengan mentega premium, telur segar, dan bumbu rempah nusantara, menghasilkan tekstur lembut dan aroma harum yang elegan. Cocok untuk hadiah, hampers, atau sajian di momen spesial." 
  },
  { 
    id: 2, 
    name: "Premium Choco Rose Cake", 
    price: 250000, 
    img: "https://images.unsplash.com/photo-1580745497986-76cbf3d259da?q=80&w=1548&auto=format&fit=crop&=80", 
    desc: "Kue cokelat premium dengan tekstur moist dan rasa kaya cokelat, berlapis krim lembut berkualitas tinggi, dihias elegan dengan cream cantik yang menarik mata. Cocok untuk momen spesial atau perayaan romantis, memberikan kesan mewah dan berkesan bagi siapa pun yang menikmatinya." 
  },
  { 
    id: 3, 
    name: "Palm Cheese", 
    price: 155000, 
    img: "https://asset.kompas.com/crops/QqRi14iIqQEJbQU7KC-DO-IStdk=/0x39:1000x706/1200x800/data/photo/2021/12/21/61c18043d7d4d.jpg", 
    desc: "Perpaduan manis alami gula aren dan gurihnya keju premium, menghasilkan rasa autentik yang lembut sekaligus kaya. Tekstur moist dengan sentuhan modern menjadikannya pilihan elegan untuk setiap momen spesial." 
  },
  { 
    id: 4, 
    name: "Kastengel Keju Premium", 
    price: 150000, 
    img: "https://cdn0-production-images-kly.akamaized.net/zpGY7r7c8h4qg26qB9dRmlCe6CA=/0x274:750x697/1200x675/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4370161/original/043741400_1679641233-shutterstock_1748008952.jpg", 
    desc: "Kue kering klasik berbentuk stik dengan taburan keju Edam dan Cheddar berkualitas. Renyah, gurih, dan harum keju yang melimpah, menjadikannya camilan elegan untuk hari istimewa." 
  },
  { 
    id: 5, 
    name: "Matcha Tres Leches", 
    price: 450000, 
    img: "https://sisterssansgluten.com/wp-content/uploads/2020/03/matcha-2-scaled.jpg", 
    desc: "Kue lembut yang direndam dalam tiga jenis susu, dipadukan dengan bubuk matcha premium pilihan. Rasanya creamy, manis seimbang, dan menghadirkan sensasi autentik khas Jepang dalam setiap gigitan." 
  },
  { 
    id: 6, 
    name: "Brownies Kukus Premium", 
    price: 120000, 
    img: "https://foto.kontan.co.id/mrrVhlWYRgrpzEcr_FrEvQvKkWY=/smart/2024/07/10/296713580p.jpg", 
    desc: "Brownies kukus dengan tekstur lembut dan rasa cokelat pekat yang meleleh di mulut. Dibuat dari cokelat pilihan dan bahan berkualitas tinggi, menghadirkan sensasi manis yang pas dan moist sempurna. Cocok untuk teman ngopi, hadiah, atau oleh-oleh keluarga." 
  },
  {
    id: 7,
    name: "Chocolate Truffle Cake",
    price: 500000,
    img: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?q=80&w=2524&auto=format&fit=crop&=80",
    desc: "Cake premium dengan lapisan cokelat truffle lembut dan taburan cokelat meses, cocok untuk pencinta cokelat sejati.",
  },
  {
    id: 8,
    name: "Delicious Oreo Cake",
    price: 250000,
    img: "https://images.unsplash.com/photo-1626263468007-a9e0cf83f1ac?q=80&w=1740&auto=format&fit=crop&=80",
    desc: "Cake lembut dengan lapisan krim Oreo yang kaya rasa, dihiasi potongan biskuit Oreo renyah di atasnya. Setiap gigitan menghadirkan sensasi cokelat dan krim yang creamy dan memanjakan lidah.",
  },
  {
    id: 9,
    name: "Red Velvet Cake",
    price: 350000,
    img: "https://images.unsplash.com/photo-1602630209855-dceac223adfe?q=80&w=1773&auto=format&fit=crop&=80",
    desc: "Cake lembut dengan warna merah menggoda, lapisan cream cheese yang creamy dan manis pas, dihiasi taburan red velvet crumbs di atasnya. Setiap gigitan menghadirkan perpaduan tekstur lembut cake dan sedikit crunch dari taburan merah, menciptakan sensasi rasa manis elegan yang memanjakan lidah. Cocok untuk momen spesial.",
  },
    {
    id: 10,
    name: "Donuts Premium",
    price: 10000,
    img: "https://images.unsplash.com/photo-1630150275481-fdd323506564?q=80&w=1208&auto=format&fit=crop&=80",
    desc: "Donuts premium dengan balutan coklat, dihiasi taburan meses yang creamy diatasnya. Setiap gigitan menghadirkan perpaduan tekstur manis memanjakan dan cocok untuk momen spesial.",
  },
  {
  id: 11,
  name: "Mini Ice Cream Cake",
  price: 15000,
  img: "https://images.unsplash.com/photo-1570806516998-c4c167ee2f55?q=80&w=1374&auto=format&fit=crop&=80",
  desc: "Kue mungil berbalut es krim lembut dengan tekstur creamy dan manis seimbang. Ukurannya pas untuk porsi pribadi, cocok sebagai camilan manis atau hidangan penutup istimewa.",
  }
];

// Format Rupiah
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);
};

export default function CakeDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-gray-900 dark:to-gray-800">
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          Produk tidak ditemukan.
        </p>
      </div>
    );
  }

  // Cek produk baru (id 7,8,9)
  const isNewProduct = [7, 8, 9].includes(product.id);
  // Tambahkan cek BestSeller
  const isBestSeller = product.isBestSeller;

  // Styles khusus produk baru / best seller
  const styles = {
    bgClass: isNewProduct
      ? "from-pink-50 to-pink-200 dark:from-gray-900 dark:to-gray-800"
      : isBestSeller
      ? "from-yellow-100 to-yellow-300 dark:from-gray-900 dark:to-gray-700"
      : "from-yellow-50 to-yellow-400 dark:from-gray-900 dark:to-gray-800",
    nameClass: isNewProduct
      ? "text-xl sm:text-2xl lg:text-3xl font-bold text-pink-700 dark:text-pink-400 mb-3"
      : isBestSeller
      ? "text-xl sm:text-2xl lg:text-3xl font-bold text-orange-700 dark:text-orange-400 mb-3"
      : "text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-700 dark:text-yellow-400 mb-3",
    priceClass: isNewProduct
      ? "text-lg sm:text-xl lg:text-2xl font-semibold text-pink-600 dark:text-pink-400 mb-4"
      : isBestSeller
      ? "text-lg sm:text-xl lg:text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-4"
      : "text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-600 dark:text-yellow-300 mb-4",
    orderBtnClass: isNewProduct
      ? "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-200 text-sm sm:text-base font-medium"
      : isBestSeller
      ? "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 text-sm sm:text-base font-medium"
      : "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 text-sm sm:text-base font-medium",
  };

  return (
    <div
      id="detail-produk"
      className={`min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-r ${styles.bgClass} scroll-mt-28`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl lg:max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden relative"
      >
        {/* Label NEW */}
        {isNewProduct && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-pink-600 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded shadow-md z-10"
          >
            NEW
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
            className="w-full h-60 sm:h-64 lg:h-80 object-cover"
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
            className="font-body text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-sm sm:text-base lg:text-lg"
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
