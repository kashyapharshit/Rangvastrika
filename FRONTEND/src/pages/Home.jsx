import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 1. आपके API हुक्स और यूटिलिटीज को इम्पोर्ट करें
// (ध्यान दें: अगर Home.jsx 'src/pages' में है, तो ये पाथ सही रहेंगे, वरना अपने फोल्डर स्ट्रक्चर के हिसाब से एडजस्ट कर लें)
import { useFetch } from "../hooks/useFetch";
import { getProducts } from "../api/productApi";
import { formatCurrency } from "../utils/formatCurrency";

// 2. स्लाइडर इमेजेज
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 3. डेटाबेस/API से प्रोडक्ट्स फेच करना
  const { data: products, loading, error } = useFetch(getProducts);

  const sliderImages = [image1, image2, image3];

  // Auto-play slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000); 
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // होमपेज पर दिखाने के लिए सिर्फ शुरुआती 8 प्रोडक्ट्स लें (ताकि पेज बहुत लंबा न हो)
  const displayProducts = products ? products.slice(0, 8) : [];

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* --- HERO SECTION (SLIDER) --- */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        {sliderImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}

        <div className="relative z-10 bg-black/60 backdrop-blur-sm p-10 rounded-2xl text-center flex flex-col items-center max-w-2xl mx-4 border border-white/10 shadow-2xl">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#F3E3D0] mb-4">
            Ethnic Elegance & Textiles
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4">
            Rangvastrika Store
          </h1>
          <p className="text-base sm:text-lg text-gray-200 mb-8 leading-relaxed">
            Handpicked ethnic products and handcrafted collections, curated for every occasion.
          </p>
          <Link
            to="/products"
            className="px-8 py-3 rounded-full text-white text-sm font-medium transition duration-300 hover:scale-105"
            style={{ backgroundColor: "#7a5236" }}
          >
            Browse products
          </Link>
          <p className="text-[#F3E3D0] mt-6 font-serif text-lg">रंगवस्त्रिका स्टोर</p>
        </div>

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
      </section>

      {/* --- DYNAMIC PRODUCTS SECTION --- */}
      <section className="py-20 px-4 sm:px-8 bg-[#FBF3E9]/30 w-full">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl font-serif font-bold text-[#2b1a12]">Our Latest Collection</h2>
            <Link to="/products" className="text-[#7a5236] font-medium hover:underline flex items-center gap-1">
              View All Products &rarr;
            </Link>
          </div>

          {/* Loading & Error States */}
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

          {/* Product Cards Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayProducts.map((product) => (
                <Link 
                  key={product._id} 
                  to={`/products/${product._id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#7a5236]/10 flex flex-col h-full"
                >
                  {/* Product Image */}
                  <div className="relative h-72 overflow-hidden bg-gray-50">
                    <img 
                      // यहाँ चेक करें कि आपके डेटाबेस में इमेज का फील्ड 'image' है या 'images[0]'
                      src={product.image || (product.images && product.images[0]) || "https://via.placeholder.com/400"} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-gray-800 line-clamp-1 group-hover:text-[#7a5236] transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-xl font-bold text-[#2b1a12]">
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