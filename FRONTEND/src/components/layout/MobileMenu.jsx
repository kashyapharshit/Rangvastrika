import { Link } from "react-router-dom";

export default function MobileMenu() {
  return (
    <div
      className="mobile-menu w-full flex flex-col gap-1 px-4 py-3 border-t border-amber-900/40"
      style={{
        background:
          "linear-gradient(90deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
      }}
    >
      <Link
        to="/products"
        className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition"
      >
        Products
      </Link>
      <Link
        to="/cart"
        className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition"
      >
        Cart
      </Link>
      <Link
        to="/my-orders"
        className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition"
      >
        Orders
      </Link>
    </div>
  );
}