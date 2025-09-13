// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiCakeSlice } from "react-icons/gi";
import { Moon, Sun, ShoppingCart, X } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({
  dark,
  setDark,
  cart,
  setCartOpen,
  searchQuery,
  setSearchQuery,
  products = [], // Tambahkan products sebagai prop
  onSearchResults, // Callback untuk hasil pencarian
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const mobileRef = useRef(null);
  const searchRef = useRef(null);
  const desktopSearchRef = useRef(null);

  const goToSection = (section) => {
    setOpen(false);
    setSearchOpen(false);
    setShowResults(false);

    if (location.pathname === "/") {
      setTimeout(() => scrollToSection(section), 100);
    } else {
      navigate("/", { state: { scrollTo: section }, replace: false });
    }
  };

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 80;
      window.scrollTo({ top: element.offsetTop - headerHeight, behavior: "smooth" });
    }
  };

  // Fungsi pencarian yang case-insensitive
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(true);
    
    // Callback untuk parent component
    if (onSearchResults) {
      onSearchResults(filtered, query);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      // Navigate to products section with search results
      if (location.pathname !== "/") {
        navigate("/", { state: { scrollTo: "products", searchQuery } });
      } else {
        scrollToSection("products");
      }
      setSearchOpen(false);
      setShowResults(false);
    }
  };

  // Handle product click from search results
  const handleProductClick = (product) => {
    setSearchOpen(false);
    setShowResults(false);
    setSearchQuery("");
    // Navigate to product detail or add to cart
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: "products", selectedProduct: product.id } });
    } else {
      scrollToSection("products");
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Close search if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (searchOpen || showResults) &&
        searchRef.current &&
        !searchRef.current.contains(e.target) &&
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(e.target) &&
        mobileRef.current &&
        !mobileRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen, showResults]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-gray-900 dark:to-slate-800 shadow-md z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4 md:p-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <GiCakeSlice className="text-3xl text-yellow-600 dark:text-yellow-400" />
          <h1 className="text-3xl font-cake font-bold text-yellow-600 dark:text-yellow-400">
            Firdaus Cake
          </h1>
        </div>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-4 items-center">
          {["home", "products", "about", "contact", "pesanonline"].map(
            (sec) => (
              <button
                key={sec}
                onClick={() => goToSection(sec)}
                className={`px-4 py-2 rounded-full transition font-semibold ${
                  sec === "pesanonline"
                    ? "bg-yellow-700 text-xs text-white hover:bg-orange-600"
                    : "text-yellow-700 hover:text-white hover:bg-yellow-500 dark:text-yellow-400 dark:hover:text-white"
                }`}
              >
                {sec === "pesanonline"
                  ? "Pesan Online"
                  : sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            )
          )}

          {/* Desktop Search */}
          <div ref={desktopSearchRef} className="relative">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari kue..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="w-48 px-4 py-2 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-600 hover:text-yellow-800"
                >
                  <FiSearch size={16} />
                </button>
              </div>
            </form>

            {/* Desktop Search Results */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-96 overflow-y-auto z-50"
                >
                  <div className="p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 border-b">
                      {searchResults.length} hasil ditemukan
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer rounded-lg"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {product.category}
                          </p>
                          <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                            Rp {product.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-yellow-200 dark:hover:bg-slate-700 transition"
          >
            {dark ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-yellow-900" />
            )}
          </button>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div ref={mobileRef} className="flex items-center gap-4 md:hidden">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-yellow-700 dark:text-yellow-400 text-2xl p-1 rounded-full hover:bg-yellow-200 dark:hover:bg-slate-700 transition-colors"
          >
            <FiSearch />
          </button>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          {/* Dark Mode Mobile */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-yellow-200 dark:hover:bg-slate-700 transition"
          >
            {dark ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-yellow-600" />
            )}
          </button>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)}>
            <span className="text-3xl text-yellow-700 dark:text-yellow-400">
              {open ? "✖" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            ref={searchRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-4 pb-4 overflow-hidden"
          >
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Cari kue..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
              >
                Cari
              </button>
            </form>

            {/* Mobile Search Results */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-64 overflow-y-auto"
                >
                  <div className="p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 border-b">
                      {searchResults.length} hasil ditemukan
                    </div>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {product.category}
                          </p>
                          <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                            Rp {product.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-slate-900 dark:to-slate-800 shadow-md flex flex-col items-center space-y-3 pb-4 overflow-hidden"
          >
            {["home", "products", "about", "contact", "pesanonline"].map(
              (sec) => (
                <button
                  key={sec}
                  onClick={() => goToSection(sec)}
                  className={`px-4 py-2 rounded-full w-full text-center font-semibold transition ${
                    sec === "pesanonline"
                      ? "bg-yellow-700 text-sm text-white w-auto hover:bg-orange-600"
                      : "text-yellow-700 hover:text-white dark:text-yellow-500 dark:hover:text-white hover:bg-yellow-500"
                  }`}
                >
                  {sec === "pesanonline"
                    ? "Pesan Online"
                    : sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
