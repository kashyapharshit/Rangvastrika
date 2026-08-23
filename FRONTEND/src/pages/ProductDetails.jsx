import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../api/productApi";
import { useFetch } from "../hooks/useFetch";
import ProductImageZoom from "../components/product/ProductImageZoom";
import Button from "../components/common/Button";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/formatCurrency";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: products, loading, error } = useFetch(getProducts);
  const { addToCart } = useCart();

  const product = useMemo(
    () => (products || []).find((item) => item._id === id),
    [products, id]
  );

  // --- Loading State ---
  if (loading)
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#FBF3E9]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7a5236]"></div>
      </div>
    );

  // --- Error State ---
  if (error)
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#FBF3E9]">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );

  // --- Not Found State ---
  if (!product)
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center bg-[#FBF3E9]">
        <p className="text-[#4a2f1d] font-medium">Product not found.</p>
      </div>
    );

  // --- Variables ---
  const images = (product.images && product.images.length > 0) ? product.images : (product.image ? [product.image] : []);
  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const weather = Array.isArray(product.weather) ? product.weather : [];
  const stockCount = Number(product.countInStock || product.stock || 0);
  const inStock = stockCount > 0;

  return (
    // 1. Full-width Background Container
    <div className="w-full min-h-screen bg-[#FBF3E9] py-10">
      
      {/* 2. Centered Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-6">
          <Link to="/products" className="text-sm font-medium text-[#7a5236] hover:underline flex items-center gap-2 w-max">
            &larr; Back to Products
          </Link>
        </div>

        {/* 3. Main Product Card */}
        <section className="bg-white rounded-3xl shadow-sm border border-[#7a5236]/15 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 sm:p-10 items-start">
            
            {/* Left: Product Image */}
            <div className="w-full rounded-2xl overflow-hidden bg-[#FBF3E9]/50 border border-gray-100">
              <ProductImageZoom images={images} alt={product.name} />
            </div>
            
            {/* Right: Product Details */}
            <div className="flex flex-col h-full">
              
              {/* Title & Price */}
              <div className="mb-6">
                {product.category && (
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2 block">
                    {product.category}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b1a12] mb-3">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-[#7a5236]">
                  {formatCurrency(product.price)}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[#2b1a12] mb-2">Description</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {product.description || "No description available for this authentic piece."}
                </p>
              </div>

              {/* Attributes (Sizes, Material, Weather) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 py-6 border-y border-gray-100">
                
                {/* Sizes */}
                <div>
                  <h3 className="text-sm font-bold text-[#2b1a12] mb-3">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.length > 0 ? (
                      sizes.map((size) => (
                        <span key={size} className="px-4 py-1.5 text-sm font-medium border border-[#7a5236]/30 text-[#4a2f1d] rounded-lg bg-[#FBF3E9]/30">
                          {size}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">Free Size / Standard</span>
                    )}
                  </div>
                </div>

                {/* Other Details */}
                <div>
                  <h3 className="text-sm font-bold text-[#2b1a12] mb-3">Product Details</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li><strong className="font-medium text-[#2b1a12]">Material:</strong> {product.material || "Premium Blend"}</li>
                    <li><strong className="font-medium text-[#2b1a12]">Weather:</strong> {weather.length ? weather.join(", ") : "All Season"}</li>
                  </ul>
                </div>
              </div>

              {/* Stock Status & Action Button */}
              <div className="mt-auto pt-4">
                
                {/* Stock Indicator */}
                <div className="flex items-center gap-2 mb-5">
                  <div className={`w-2.5 h-2.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-sm font-semibold ${inStock ? 'text-green-700' : 'text-red-600'}`}>
                    {inStock ? `In Stock (${stockCount} available)` : "Out of Stock"}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  onClick={() => { if(inStock) addToCart(product) }} 
                  className={`w-full sm:w-auto px-10 py-3.5 text-base rounded-xl transition-all ${
                    !inStock 
                      ? 'opacity-50 cursor-not-allowed grayscale' 
                      : 'hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                  disabled={!inStock}
                >
                  {inStock ? "Add to Cart" : "Sold Out"}
                </Button>

              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}