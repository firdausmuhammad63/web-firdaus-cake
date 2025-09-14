import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function OurLocation() {
  return (
    <section className="py-20 bg-gradient-to-r from-yellow-100 to-yellow-500 dark:from-gray-600 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-12">
        {/* Judul */}
        <motion.h3
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl font-cake font-bold -mt-8 text-yellow-700 dark:text-yellow-500"
        >
          Our Location
        </motion.h3>

        {/* Google Maps */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl h-52 rounded-2xl overflow-hidden shadow-xl -mt-5"
        >
          <iframe
            title="Firdaus Cake Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1234567890123!2d106.816666!3d-6.200000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175xxxxxx:0x1234567890abcdef!2sFirdaus%20Cake!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: "10px double #FACC15" }}
            allowFullScreen=""
            loading="lazy"
            className="transition-transform duration-500 rounded-2xl"
          ></iframe>
        </motion.div>

        {/* Kontak */}
        <div className="flex flex-col md:flex-row gap-8 -mt-3 text-yellow-900 -mb-5 dark:text-yellow-200">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 -mb-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaMapMarkerAlt className="text-2xl text-yellow-700 dark:text-yellow-500" />
            </motion.div>
            <span className="font-semibold font-body -mb-3 text-left text-lg dark:text-yellow-500">
              Srengseng Sawah, Jakarta Selatan
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FaPhoneAlt className="text-2xl text-yellow-700 dark:text-yellow-500" />
            </motion.div>
            <span className="font-semibold font-body text-lg -mb-2 dark:text-yellow-500">
              +62 895 4132 63355
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
