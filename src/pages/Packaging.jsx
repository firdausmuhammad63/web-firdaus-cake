import React from "react";
import { motion } from "framer-motion";
import { FaBoxOpen } from "react-icons/fa";
import { CheckCircle } from "lucide-react";

export default function Packaging() {
  const rules = [
    "Kami tidak melayani pemesanan kue untuk perayaan ulang tahun.",
    "Produk kami hanya diperuntukkan untuk bingkisan, kado, cenderamata, atau oleh-oleh.",
    "Setiap packaging dibuat eksklusif agar terlihat elegan dan pantas untuk berbagai momen spesial.",
    "Kami menjaga kualitas kemasan agar kue tetap aman dan tampil menarik.",
  ];

  const packagingImages = [
    "https://images.unsplash.com/photo-1694395998892-5225e95b8a47?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section className="bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-gray-500 dark:to-gray-900 py-16">
      <div className="max-w-sm md:max-w-lg mx-auto px-3 mb-7">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-6xl font-cake font-bold text-yellow-700 dark:text-yellow-500">
              Aturan Packaging
            </h1>
          </div>
          <p className="mt-3 text-yellow-700 font-body text-sm dark:text-yellow-200">
            Kami ingin setiap cake tampil elegan, layak dan berkesan.
          </p>
        </div>

        {/* Rules List */}
        <ul className="space-y-6">
          {rules.map((rule, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex items-start font-body gap-3 text-yellow-800 dark:text-yellow-300"
            >
              <CheckCircle className="mt-1 text-yellow-600 dark:text-yellow-400 w-6 h-6 flex-shrink-0" />
              <span>{rule}</span>
            </motion.li>
          ))}
        </ul>

        {/* Gambar Packaging di Tengah */}
        <div className="mt-10 flex justify-center">
          {packagingImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Packaging ${idx + 1}`}
              className="w-full max-w-lg object-cover rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ willChange: "transform, opacity" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
