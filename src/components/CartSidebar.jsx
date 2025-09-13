import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";

// Dummy database (local memory)
let dummyDB = [];

export default function CartSidebar({ cart, setCart, updateQuantity, removeFromCart, open, setOpen }) {
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "Credit Card",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [toast, setToast] = useState("");

  const toggleGlobalElements = (hide) => {
    const backToTop = document.getElementById("backToTop");
    const waButton = document.getElementById("waButton");
    if (backToTop) backToTop.style.display = hide ? "none" : "block";
    if (waButton) waButton.style.display = hide ? "none" : "block";
  };

  useEffect(() => toggleGlobalElements(open), [open]);
  useEffect(() => toggleGlobalElements(checkoutStep > 0), [checkoutStep]);

  useEffect(() => {
    if (!open) {
      setCheckoutStep(0);
      setFormData({
        name: "",
        email: "",
        address: "",
        payment: "Credit Card",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
      toggleGlobalElements(false);
    }
  }, [open]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(number);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  // Simpan ke dummy database
  const handleConfirm = () => {
    if (!formData.name || !formData.email || !formData.address) {
      showToast("Harap isi semua data terlebih dahulu!");
      return;
    }

    const orderData = {
      ...formData,
      cart,
      amount: totalPrice,
      method: formData.payment,
      id: Date.now(), // id unik
    };

    // Simpan ke dummyDB
    dummyDB.push(orderData);
    console.log("Dummy DB:", dummyDB);
    showToast("Pesanan berhasil dikirim!");

    if (formData.payment === "QRIS" || formData.payment === "E-Wallet") setCheckoutStep(2);
    else if (formData.payment === "Bank Transfer") setCheckoutStep(3);
    else if (formData.payment === "Credit Card") setCheckoutStep(4);
    else setCheckoutStep(5);
  };

  const resetCart = () => {
    setCheckoutStep(0);
    setOpen(false);
    setCart([]);
    setFormData({
      name: "",
      email: "",
      address: "",
      payment: "Credit Card",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
    toggleGlobalElements(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cartSidebar"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center border-b dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {checkoutStep === 0 ? "Cart" :
               checkoutStep === 1 ? "Form Payment" :
               checkoutStep === 2 ? "QRIS / E-Wallet" :
               checkoutStep === 3 ? "Bank Transfer" :
               checkoutStep === 4 ? "Credit Card" :
               "Pembayaran Berhasil!"}
            </h3>
            <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-300">✖</button>
          </div>

          {/* Toast */}
          {toast && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-md z-50"
            >
              {toast}
            </motion.div>
          )}

          {/* Body */}
          <div className="p-6 flex flex-col gap-4 overflow-y-auto h-[calc(100%-140px)]">
            {/* Step 0: Cart */}
            {checkoutStep === 0 && (
              cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">Cart kosong</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-2 border-b pb-2">
                    <div className="flex flex-col w-full">
                      <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                      <p className="text-gray-500 dark:text-gray-300">
                        {formatRupiah(item.price)} x {item.quantity} = {formatRupiah(item.price * item.quantity)}
                      </p>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-20 p-1 border rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white mt-1"
                      />
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700 transition"
                    >
                      Hapus
                    </button>
                  </div>
                ))
              )
            )}

            {/* Step 1: Form */}
            {checkoutStep === 1 && (
              <div className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Nama" value={formData.name} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
                <textarea name="address" placeholder="Alamat" value={formData.address} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
                <select name="payment" value={formData.payment} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="COD">COD</option>
                  <option value="E-Wallet">E-Wallet</option>
                  <option value="QRIS">QRIS</option>
                </select>
                <button onClick={handleConfirm} className="w-full py-2 bg-green-600 text-white rounded hover:bg-yellow-700 transition">Konfirmasi</button>
              </div>
            )}

            {/* Step 2-4 */}
            {checkoutStep === 2 && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-900 dark:text-white font-bold text-lg">Scan {formData.payment} untuk bayar</p>
                <QRCode value={`PAYMENT|${formData.payment}|${formData.name}|${totalPrice}`} size={180}/>
                <p className="text-gray-700 dark:text-gray-300 text-center">Total: {formatRupiah(totalPrice)}</p>
                <button onClick={() => setCheckoutStep(5)} className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Saya Sudah Membayar</button>
              </div>
            )}

            {checkoutStep === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-gray-900 dark:text-white font-bold">Bank Transfer</p>
                <p className="text-gray-700 dark:text-gray-300">Silakan transfer ke rekening berikut:</p>
                <p className="font-semibold text-gray-900 dark:text-white">BCA 123-456-7890 a/n Toko Bule</p>
                <p className="text-gray-700 dark:text-gray-300">Total transfer: {formatRupiah(totalPrice)}</p>
                <button onClick={() => setCheckoutStep(5)} className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Saya Sudah Transfer</button>
              </div>
            )}

            {checkoutStep === 4 && (
              <div className="flex flex-col gap-4">
                <p className="text-gray-900 dark:text-white font-bold">Credit Card Payment</p>
                <input type="text" name="cardNumber" placeholder="Nomor Kartu" value={formData.cardNumber} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
                <input type="text" name="expiry" placeholder="Expiry MM/YY" value={formData.expiry} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} className="p-2 rounded border dark:bg-gray-800 dark:border-gray-600 dark:text-white"/>
                <p className="text-gray-700 dark:text-gray-300">Total pembayaran: {formatRupiah(totalPrice)}</p>
                <button onClick={() => setCheckoutStep(5)} className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Bayar Sekarang</button>
              </div>
            )}

            {checkoutStep === 5 && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-700 dark:text-gray-300 text-center">Terima kasih, {formData.name}. Pesanan Anda telah diterima.</p>
                <p className="text-gray-700 dark:text-gray-300">Total: {formatRupiah(totalPrice)}</p>
                {formData.payment === "COD" && <p className="text-yellow-700 dark:text-yellow-300 text-center">Pesanan Anda akan dibayar saat barang diterima.</p>}
                <button onClick={resetCart} className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition">Tutup</button>
              </div>
            )}
          </div>

          {/* Footer Checkout */}
          {checkoutStep === 0 && cart.length > 0 && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}
              className="p-6 border-t dark:border-gray-700 absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900"
            >
              <p className="font-bold text-gray-900 dark:text-white mb-4">Total: {formatRupiah(totalPrice)}</p>
              <button onClick={() => setCheckoutStep(1)} className="w-full py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">Checkout</button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
