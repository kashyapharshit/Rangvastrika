import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

import { useFetch } from "../hooks/useFetch";
import { getProducts } from "../api/productApi";
import { formatCurrency } from "../utils/formatCurrency";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image0 from "../assets/image0.png";
import "./Home.css";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: products, loading, error } = useFetch(getProducts);

  const sliderImages = [image0, image1, image2, image3];

  // Har image ka crop-focus point (mobile pe zyada crop hota hai isliye tune karo)
 // Har image ka crop-focus: mobile pe alag, desktop pe alag
// format: "mobile-position sm:desktop-position"
const imagePositions = [
  "object-center sm:object-center",           // image0
  "object-[25%_center] sm:object-center",     // image1 - mannequin left side pe hai, mobile pe usko dikhane ke liye left-focus
  "object-center sm:object-center",           // image2
  "object-top sm:object-[center_30%]",        // image3 (16:9, widest) - mobile pe top-focus
];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const displayProducts = products ? products.slice(0, 6) : [];

  const scrollToProducts = () => {
    document.getElementById("latest-collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* --- HERO SECTION (SLIDER) --- */}
      <section className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {sliderImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } ${imagePositions[index]}`}
          />
        ))}

        {/* Halka gradient - sirf text readability ke liye */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        <div className="hero-content relative z-10 text-center flex flex-col items-center max-w-3xl mx-4 px-4">
          <span className="hero-tagline text-sm sm:text-base md:text-lg font-semibold uppercase text-[#F3E3D0] mb-3 sm:mb-5">
            Ethnic Elegance & Textiles
          </span>
          <h1 className="hero-title text-5xl sm:text-7xl md:text-8xl font-serif font-bold text-white mb-6 sm:mb-8">
            Rangvastrika Store
          </h1>
          <p className="hero-desc text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 sm:mb-10 leading-relaxed max-w-xl">
            Handpicked ethnic products and handcrafted collections, curated for every occasion.
          </p>
          <Link
            to="/products"
            className="hero-btn px-10 py-4 rounded-full text-white text-base sm:text-lg font-medium transition duration-300 hover:scale-105"
            style={{ backgroundColor: "#7a5236" }}
          >
            Browse products
          </Link>
          <p className="hero-hindi text-[#F3E3D0] mt-7 font-serif text-xl sm:text-2xl">रंगवस्त्रिका स्टोर</p>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll down arrow */}
        <button
          onClick={scrollToProducts}
          aria-label="Scroll to products"
          className="absolute bottom-20 sm:bottom-8 right-8 z-10 text-white/80 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* --- DYNAMIC PRODUCTS SECTION --- */}
      <section id="latest-collection" className="py-20 px-4 sm:px-8 bg-[#FBF3E9]/30 w-full">
        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl font-serif font-bold text-[#2b1a12]">Our Latest Collection</h2>
            <Link to="/products" className="text-[#7a5236] font-medium hover:underline flex items-center gap-1">
              View All Products &rarr;
            </Link>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7a5236]"></div>
            </div>
          )}
          {error && (
            <div className="text-center py-12 text-red-500 font-medium">
              Failed to load products. Please try again later.
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#7a5236]/10 flex flex-col h-full"
                >
                  <div className="relative h-96 overflow-hidden bg-gray-50">
                    <img
                      src={product.image || (product.images && product.images[0]) || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-medium text-gray-800 line-clamp-1 group-hover:text-[#7a5236] transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#2b1a12]">
                        {formatCurrency(product.price)}
                      </span>
                      {product.category && (
                        <span className="text-xs font-medium text-[#7a5236] bg-[#7a5236]/10 px-3 py-1.5 rounded-full">
                          {product.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}