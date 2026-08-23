import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, LogOut } from "lucide-react";
import Badge from "../common/Badge";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { getProducts } from "../../api/productApi";
import { formatCurrency } from "../../utils/formatCurrency";
import logo from "../../assets/logo.jpeg"; 

export default function Navbar() {
  const { items } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef(null);

  const { data: products } = useFetch(getProducts);

  const suggestions =
    searchTerm.trim().length > 0
      ? (products || [])
          .filter((p) =>
            p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToResults = (term) => {
    const trimmed = term.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    goToResults(searchTerm);
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm("");
    setShowSuggestions(false);
    navigate(`/products/${product._id}`);
  };

  // --- Styles ---
  // Normal text links ke liye (बिना बॉर्डर के)
  const navTextStyles = "inline-flex items-center text-white/90 hover:text-[#F3E3D0] text-sm font-medium transition-colors duration-300 touch-target";
  
  // Action buttons ke liye (Cart, Login aadi)
  const actionBtnStyles = "touch-target flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all";

  return (
    <nav
      className="w-full flex items-center justify-between px-4 md:px-8 py-3 shadow-lg z-50 sticky top-0"
      style={{
        background: "linear-gradient(90deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
      }}
    >
      {/* 1. Brand / Logo (Fixed for JPEG) */}
      <Link to="/" className="flex items-center gap-3">
        {/* Logo container with white circular background */}
        <div className="bg-white p-1 rounded-full shadow-md flex items-center justify-center">
          <img
            src={logo}
            alt="Rangvastrika"
            className="h-10 w-10 md:h-11 md:w-11 object-contain rounded-full"
          />
        </div>
        {/* Text logo hidden on small screens */}
        <span className="text-[#F3E3D0] font-serif font-bold text-xl hidden lg:block tracking-wide">
          Rangvastrika
        </span>
      </Link>

      {/* 2. Search bar with live suggestions */}
      <div ref={searchBoxRef} className="relative hidden md:block max-w-md w-full mx-6">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white/95 rounded-full overflow-hidden w-full shadow-inner focus-within:ring-2 focus-within:ring-[#7a5236] transition-all"
        >
          <span className="pl-4 pr-2 text-gray-500">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search ethnic collections..."
            className="flex-1 py-2.5 px-1 text-sm text-gray-800 placeholder-gray-500 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="touch-target px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition"
            style={{ backgroundColor: "#7a5236" }}
          >
            Search
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-3 w-full max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            {suggestions.map((product) => (
              <button
                key={product._id}
                type="button"
                onClick={() => handleSuggestionClick(product)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-orange-50 transition border-b border-gray-100 last:border-b-0 touch-target"
              >
                <span className="text-sm text-gray-800 line-clamp-1">
                  {product.name}
                </span>
                <span className="text-xs font-semibold text-[#7a5236] whitespace-nowrap">
                  {formatCurrency(product.price)}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToResults(searchTerm)}
              className="w-full text-center text-xs font-medium text-gray-500 py-3 hover:bg-gray-50 transition bg-gray-50/50 touch-target"
            >
              See all results for "{searchTerm}"
            </button>
          </div>
        )}
      </div>

      {/* 3. Nav links & Buttons */}
      <div className="flex items-center gap-4 md:gap-6">
        
        <Link to="/products" className={`${navTextStyles} hidden md:block`}>
          Products
        </Link>

        {isAuthenticated && (
          <Link to="/my-orders" className={`${navTextStyles} hidden lg:block`}>
            Orders
          </Link>
        )}

        {/* Cart Button */}
        <Link to="/cart" className={actionBtnStyles}>
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">Cart</span>
          {items.length > 0 && <Badge className="ml-1 bg-red-500 text-white border-none">{items.length}</Badge>}
        </Link>

        {isAuthenticated ? (
          <>
            <Link to="/profile" className={actionBtnStyles}>
              <User size={18} />
              <span className="hidden sm:inline">{user?.name?.split(' ')[0] || "Profile"}</span>
            </Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-yellow-400 text-sm font-medium hover:text-yellow-300 hidden lg:block">
                Admin
              </Link>
            )}
            
            <button type="button" onClick={logout} className="touch-target text-white/70 hover:text-red-400 transition" title="Logout">
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className={navTextStyles}>
              Login
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/register" className={navTextStyles}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}