import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  // Image URL logic
  const thumbnail = (product.images && product.images[0]) || product.image || "https://placehold.co/600x800?text=No+Image";
  
  // Stock logic (Aapke backend schema ke hisaab se 'stock' ya 'countInStock' ho sakta hai)
  const stockCount = product.stock ?? product.countInStock ?? 0;
  const isOutOfStock = stockCount === 0;
  const isLowStock = stockCount > 0 && stockCount <= 5;

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-[#7a5236]/15 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
      
      {/* --- Image Section --- */}
      <Link to={`/products/${product._id}`} className="relative w-full aspect-[4/5] overflow-hidden bg-[#FBF3E9]/50 block">
        <img
          src={thumbnail}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Out of Stock Overlay/Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* --- Product Details Section --- */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Category & Low Stock Alert */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {product.category || "Ethnic"}
          </span>
          {!isOutOfStock && isLowStock && (
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
              Only {stockCount} left!
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-serif font-semibold text-[#2b1a12] line-clamp-1 mb-1 group-hover:text-[#7a5236] transition-colors">
          <Link to={`/products/${product._id}`}>
            {product.name}
          </Link>
        </h3>
        
        {/* Price */}
        <p className="text-lg font-bold text-[#7a5236] mb-5">
          {formatCurrency(product.price)}
        </p>

        {/* --- Action Buttons --- */}
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link
            to={`/products/${product._id}`}
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-[#4a2f1d] bg-[#FBF3E9] rounded-xl hover:bg-[#f3e3d0] transition-colors"
          >
            Details
          </Link>
          
          <Button
            className={`px-4 py-2 text-sm rounded-xl transition-all ${
              isOutOfStock 
                ? "opacity-50 cursor-not-allowed grayscale" 
                : "hover:-translate-y-0.5 shadow-md"
            }`}
            onClick={() => {
              if (!isOutOfStock) onAddToCart(product);
            }}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Sold Out" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </article>
  );
}