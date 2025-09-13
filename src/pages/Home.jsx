import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Contact from "../components/Contact";
import About from "../components/About";
import LatestProducts from "../components/LatestProducts";
import BestSeller from "../components/BestSeller";
import OurLocation from "../components/OurLocation";
import Packaging from "./Packaging";
import { products } from "../data/DataProducts";
import OrderOnline from "./OrderOnline";
import Keistimewaan from "./Keistimewaan";

export default function Home({ addToCart, cartOpen }) {
  const location = useLocation();
  const scrollExecuted = useRef(false);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Hide/Show BackToTop & WA Button
  useEffect(() => {
    const backToTop = document.getElementById("backToTop");
    const waButton = document.getElementById("waButton");
    if (backToTop) backToTop.style.display = cartOpen ? "none" : "block";
    if (waButton) waButton.style.display = cartOpen ? "none" : "block";
  }, [cartOpen]);

  const searchInText = (text, query) => {
    if (!query.trim()) return true;
    const searchWords = query.trim().toLowerCase().split(/\s+/);
    const textLower = text.toLowerCase();
    return searchWords.every((word) => textLower.includes(word));
  };

  const highlightText = (text, query) => {
    if (!query.trim()) return text;
    const searchWords = query.trim().split(/\s+/);
    const regexParts = searchWords
      .filter((w) => w.length > 0)
      .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (regexParts.length === 0) return text;
    const regex = new RegExp(`(${regexParts.join("|")})`, "gi");
    return text.replace(
      regex,
      '<span class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">$1</span>'
    );
  };

  const signatureProducts = products.filter((p) => p.isSignature);
  const nonSignatureProducts = products.filter((p) => !p.isSignature);

  let filteredProducts = nonSignatureProducts
    .filter((product) => {
      let matchesCategory = true;
      if (selectedCategory === "New") matchesCategory = product.isNew;
      else if (selectedCategory === "Best Seller") matchesCategory = product.isBestSeller;
      let matchesSearch = true;
      if (searchQuery.trim()) matchesSearch = searchInText(product.name, searchQuery);
      return matchesCategory && matchesSearch;
    })
    .map((product) => ({
      ...product,
      highlightedName: searchQuery.trim()
        ? highlightText(product.name, searchQuery)
        : product.name,
    }));

  if (sortOrder === "asc") filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortOrder === "desc") filteredProducts.sort((a, b) => b.price - a.price);

  // Scroll ke section jika ada state.scrollTo
  useEffect(() => {
    if (!location.state?.scrollTo || scrollExecuted.current) return;
    scrollExecuted.current = true;
    const targetId = location.state.scrollTo;

    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const header = document.querySelector("header");
        const headerHeight = header ? header.offsetHeight : 0;
        window.scrollTo({ top: element.offsetTop - headerHeight, behavior: "smooth" });
      }
    };

    const elementAlreadyExists = document.getElementById(targetId);
    if (elementAlreadyExists) {
      scrollToElement();
      return;
    }

    const observer = new MutationObserver((mutations, obs) => {
      if (document.getElementById(targetId)) {
        scrollToElement();
        obs.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      scrollExecuted.current = false;
    };
  }, [location]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortOrder("");
  };

  const hasActiveFilter =
    searchQuery.trim() || selectedCategory !== "All" || sortOrder !== "";

  const getFilterTitle = () => {
    if (searchQuery.trim() && selectedCategory !== "All") return `Hasil pencarian "${searchQuery}" dalam kategori ${selectedCategory}`;
    else if (searchQuery.trim()) return `Hasil pencarian "${searchQuery}"`;
    else if (selectedCategory === "New") return "Fresh Cakes";
    else if (selectedCategory === "Best Seller") return "Best Seller";
    return "Semua Produk";
  };

  const renderSections = () => {
    if (hasActiveFilter) {
      return (
        <Products
          products={filteredProducts}
          addToCart={addToCart}
          highlightSearch={!!searchQuery.trim()}
          customTitle={getFilterTitle()}
        />
      );
    }

    return (
      <>
        <Products products={products} addToCart={addToCart} highlightSearch={false} />
        <LatestProducts products={products.filter((p) => p.isNew)} addToCart={addToCart} highlightSearch={false} />
        <BestSeller products={products.filter((p) => p.isBestSeller)} addToCart={addToCart} highlightSearch={false} />
      </>
    );
  };

  return (
    <>
      <Hero />

      {/* Filter + Search */}
      <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {["All", "New", "Best Seller"].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-green-500 text-white shadow-md transform scale-105"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-green-500 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full md:w-auto items-center">
          <input
            type="text"
            placeholder="Cari produk..."
            className="border rounded-lg px-4 py-2 w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Urutkan</option>
            <option value="asc">Harga Termurah</option>
            <option value="desc">Harga Termahal</option>
          </select>

          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 whitespace-nowrap"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {hasActiveFilter && (
        <div className="text-center mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mx-4">
          <p className="text-gray-700 dark:text-gray-300">
            {getFilterTitle()} -
            <span className="font-bold text-blue-600 dark:text-blue-400 ml-1">
              {filteredProducts.length} produk ditemukan
            </span>
          </p>
          {filteredProducts.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Coba gunakan kata kunci yang berbeda atau ubah kategori
            </p>
          )}
        </div>
      )}

      {renderSections()}

      {!hasActiveFilter && (
        <>
          <About />
          <Keistimewaan />
          <Packaging />
          <OurLocation />
          <OrderOnline />
          <Contact />
        </>
      )}
    </>
  );
}
