import React from "react";
import { motion } from "framer-motion";
import { GiCakeSlice } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-50 via-yellow-200 to-yellow-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 text-center shadow-inner">
      <motion.div
        className="max-w-3xl mx-auto flex flex-col items-center -mt-3 gap-5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <motion.h2
          className="flex items-center text-3xl font-bold text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <GiCakeSlice className="text-5xl text-slate-700 dark:text-white mr-2" />
          <span className="font-cake text-slate-700 dark:text-white -mt text-5xl">Firdaus Cake</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-gray-700 font-body text-sm px-12 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Membuat momen Anda lebih manis dengan kue terbaik.
        </motion.p>

        {/* Sosmed */}
        <motion.div
          className="flex gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Instagram */}
          <motion.a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition"
            whileHover={{ scale: 1.2 }}
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
          </motion.a>

          {/* Facebook */}
          <motion.a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition"
            whileHover={{ scale: 1.2 }}
          >
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5.019 3.676 9.163 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.324 21.163 22 17.019 22 12"/>
            </svg>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/6283434882"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-gray-600 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition"
            whileHover={{ scale: 1.2 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.885.492 3.728 1.428 5.353L2 22l4.755-1.396A9.953 9.953 0 0 0 12.004 22c5.527 0 10.004-4.477 10.004-9.996C22.008 6.477 17.531 2 12.004 2zm5.292 15.492c-.243.547-1.417 1.049-1.94 1.162-.523.112-1.16.16-1.872-.118-.427-.136-.98-.319-1.694-.625-2.98-1.148-4.927-4.15-5.076-4.348-.149-.2-1.213-1.613-1.213-3.075 0-1.463.768-2.182 1.04-2.479.272-.297.594-.372.792-.372.199 0 .398.002.571.01.182.01.427-.069.669.51.247.596.841 2.058.916 2.207.075.149.124.323.025.521-.1.199-.149.324-.298.497-.149.173-.313.387-.447.52-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.326 2.39 1.475.297.148.471.123.644-.075.173-.199.742-.869.94-1.166.199-.298.397-.249.67-.15.272.1 1.733.818 2.03.967.297.149.495.223.57.347.075.124.075.719-.173 1.413z"/>
            </svg>
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-sm text-gray-600 font-body dark:text-gray-400 mt-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} Firdaus Cake. Semua hak cipta dilindungi.
        </motion.p>
      </motion.div>
    </footer>
  );
}
