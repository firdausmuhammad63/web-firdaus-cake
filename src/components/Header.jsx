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
  products = [],
  onSearchResults,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const mobileRef = useRef(null);
  const searchRef = useRef(null);
  const desktopSearchRef = useRef(null);

  // Scroll ke section
  const goToSection = (section) => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setShowResults(false);

    const element = document.getElementById(section);

    if (element) {
      const headerHeight = document.querySelector("header")?.offsetHeight || 80;
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: "smooth",
      });
    } else {
      // jika sedang bukan di homepage, navigasi ke root dulu
      navigate("/", { state: { scrollTo: section }, replace: false });
    }
  };

  // Jalankan scroll jika datang dari navigasi
  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = location.state.scrollTo;
      const element = document.getElementById(section);
      if (element) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 80;
        window.scrollTo({
          top: element.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
      // Bersihkan state agar tidak scroll lagi jika reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Search logic
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(true);

    if (onSearchResults) onSearchResults(filtered, query);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
      goToSection("products");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Close search if clicked outside
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

        {/* LOGO + HAMBURGER MOBILE */}
        <div className="flex items-center gap-4">
          {/* Hamburger (Mobile Only) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-yellow-700 dark:bg-yellow-400 rounded"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-yellow-700 dark:bg-yellow-400 rounded"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-yellow-700 dark:bg-yellow-400 rounded"
              />
            </button>
          </div>

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => goToSection("home")}
          >
            <GiCakeSlice className="hidden md:block text-3xl text-yellow-600 dark:text-white mr-2" />
            <h1 className="text-3xl font-cake font-bold text-yellow-600 dark:text-yellow-400">
              Firdaus Cake
            </h1>
          </div>
        </div>

        {/* DESKTOP NAVBAR */}
        <nav className="hidden md:flex space-x-4 items-center">
          {["home", "products", "about", "contact", "pesanonline"].map((sec) => (
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
          ))}

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
          </div>

          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-yellow-200 dark:hover:bg-slate-700 transition"
          >
            {dark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-yellow-900" />}
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

        {/* MOBILE RIGHT ICONS */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-yellow-700 dark:text-yellow-400 text-2xl p-1 rounded-full hover:bg-yellow-200 dark:hover:bg-slate-700 transition-colors"
          >
            <FiSearch />
          </button>

          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 transition" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-yellow-200 dark:hover:bg-slate-700 transition"
          >
            {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-yellow-600" />}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH */}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-gradient-to-r from-yellow-50 to-yellow-200 dark:from-slate-900 dark:to-slate-800 shadow-md flex flex-col items-center space-y-3 pb-4 overflow-hidden"
          >
            {["home", "products", "about", "contact", "pesanonline"].map((sec) => (
              <button
                key={sec}
                onClick={() => goToSection(sec)}
                className={`px-4 py-2 rounded-full w-full text-center font-semibold transition ${
                  sec === "pesanonline"
                    ? "text-md text-yellow-700 hover:bg-yellow-500 hover:text-white"
                    : "text-yellow-700 hover:text-white dark:text-yellow-500 dark:hover:text-white hover:bg-yellow-500"
                }`}
              >
                {sec === "pesanonline"
                  ? "Pesan Online"
                  : sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
