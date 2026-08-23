import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User } from "lucide-react";
import Badge from "../common/Badge";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useFetch } from "../../hooks/useFetch";
import { getProducts } from "../../api/productApi";
import { formatCurrency } from "../../utils/formatCurrency";
import logo from "../../assets/logo.jpeg"; // src/components/layout -> src/assets

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

  const linkStyles =
    "px-5 py-2 rounded-full border border-gray-300/70 text-white text-sm font-medium hover:bg-white/10 transition";

  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 border-b border-amber-900/40"
      style={{
        background:
          "linear-gradient(90deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
      }}
    >
      {/* Brand / Logo */}
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="Rangvastrika Logo"
          className="h-14 w-14 object-contain"
        />
      </Link>

      {/* Search bar with live suggestions */}
      <div ref={searchBoxRef} className="relative max-w-md w-full mx-6">
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white rounded-full overflow-hidden w-full"
        >
          <span className="pl-4 pr-2 text-gray-400">
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
            placeholder="Search products..."
            className="flex-1 py-2 px-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: "#7a5236" }}
          >
            Go
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-lg border border-amber-900/10 overflow-hidden z-50">
            {suggestions.map((product) => (
              <button
                key={product._id}
                type="button"
                onClick={() => handleSuggestionClick(product)}
                className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-amber-900/5 transition border-b border-amber-900/5 last:border-b-0"
              >
                <span className="text-sm text-[#2b1a12] line-clamp-1">
                  {product.name}
                </span>
                <span className="text-xs font-medium text-[#7a5236] whitespace-nowrap">
                  {formatCurrency(product.price)}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => goToResults(searchTerm)}
              className="w-full text-center text-xs font-medium text-[#4a2f1d] py-2 hover:bg-amber-900/5 transition"
            >
              See all results for "{searchTerm}"
            </button>
          </div>
        )}
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-3">
        <Link to="/products" className={linkStyles}>
          Products
        </Link>

        <Link
          to="/cart"
          className={`${linkStyles} flex items-center gap-2 relative`}
        >
          <ShoppingBag size={16} />
          Cart
          {items.length > 0 && <Badge className="ml-1">{items.length}</Badge>}
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className={`${linkStyles} flex items-center gap-2`}
            >
              <User size={16} />
              {user?.name || "Profile"}
            </Link>
            <Link to="/my-orders" className={linkStyles}>
              Orders
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="px-5 py-2 rounded-full border border-yellow-400 text-yellow-400 text-sm font-medium hover:bg-yellow-400/10 transition"
              >
                Admin
              </Link>
            )}
            <button type="button" onClick={logout} className={linkStyles}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={linkStyles}>
              Login
            </Link>
            <Link to="/register" className={linkStyles}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}