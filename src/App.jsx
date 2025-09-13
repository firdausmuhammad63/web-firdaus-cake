import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import CakeDetail from "./pages/CakeDetail";
import Home from "./pages/Home";
import BackToTop from "./pages/BackToTop";
import ScrollToTop from "./pages/ScrollToTop";
import BestSellerDetail from "./pages/BestSellerDetail";
import { products } from "./data/DataProducts";
import Packaging from "./pages/Packaging";
import OrderOnline from "./pages/OrderOnline";

export default function App() {
  const [dark, setDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // === DARK MODE EFFECT ===
  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  // === CART FUNCTIONS ===
  const addToCart = (product) => {
    const existing = cart.find((p) => p.id === product.id);
    if (existing) {
      setCart(
        cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((p) => (p.id === id ? { ...p, quantity: qty } : p)));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Router>
      <div className="font-sans text-gray-900 dark:text-white transition-colors duration-300">
        {/* === HEADER === */}
        <Header
          dark={dark}
          setDark={setDark}
          cart={cart}
          setCartOpen={setCartOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <ScrollToTop />

        {/* === ROUTES === */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                products={products}
                cartOpen={cartOpen}
                searchQuery={searchQuery}
              />
            }
          />
          <Route
            path="/cake/:id"
            element={<CakeDetail addToCart={addToCart} products={products} />}
          />
          <Route
            path="/bestseller/:id"
            element={<BestSellerDetail addToCart={addToCart} />}
          />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/order-online" element={<OrderOnline />} />
        </Routes>

        {/* === FOOTER === */}
        <Footer />

        {/* === CART SIDEBAR === */}
        <CartSidebar
          cart={cart}
          setCart={setCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          totalPrice={totalPrice}
          open={cartOpen}
          setOpen={setCartOpen}
        />

        {/* === BACK TO TOP === */}
        {!cartOpen && (
          <div className="fixed bottom-1 left-2/4 transform -translate-x-1/2 z-20">
            <BackToTop />
          </div>
        )}

        {/* === FLOATING WHATSAPP BUTTON === */}
        {!cartOpen && (
          <a
            href={`https://wa.me/62895413263355?text=${encodeURIComponent(
              "Halo Firdaus Cake, saya ingin memesan kue: "
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold py-3 px-4 rounded-full shadow-lg flex items-center space-x-2 z-50 transition-transform transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
            </svg>
            <span>Tanya via WA</span>
          </a>
        )}
      </div>
    </Router>
  );
}
