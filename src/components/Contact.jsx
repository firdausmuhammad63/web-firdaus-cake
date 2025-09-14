import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-slate-700 dark:to-slate-900"
    >
      {/* Judul */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-center gap-3 text-yellow-700 dark:text-yellow-400 mb-10"
      >
        <h3 className="text-5xl font-cake font-extrabold -mt-8">Hubungi Kami</h3>
      </motion.div>


      <div className="max-w-3xl mx-auto px-6 flex-col md:flex-row justify-center items-center gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white border border-yellow-500 dark:bg-slate-800 rounded-2xl shadow-lg p-8 transition hover:shadow-2xl"
        >
          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="mb-4 text-center text-green-600 dark:text-green-400"
              >
                ✅ Terima kasih, pesan Anda telah terkirim!
              </motion.p>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Alamat Email"
              value={form.email}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              required
            />
            <textarea
              name="message"
              placeholder="Tulis pesan Anda..."
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-slate-700 dark:text-yellow-400 focus:ring-2 focus:ring-yellow-500 outline-none transition"
              required
            ></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl bg-yellow-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-yellow-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
              Kirim Pesan
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
