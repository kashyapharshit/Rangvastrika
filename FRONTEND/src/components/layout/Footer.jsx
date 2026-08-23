import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="w-full text-[#F3E3D0]"
      style={{
        background: "linear-gradient(90deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
      }}
    >
      {/* --- Main 3-Column Footer Content --- */}
      {/* Yahan lg:grid-cols-4 ki jagah lg:grid-cols-3 kar diya gaya hai */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* 1. Brand Details */}
        <div className="pr-4">
          <div className="bg-white p-2 rounded w-max mb-4 inline-block">
            <span className="text-[#3a261c] font-bold text-lg font-serif">Rangvastrika</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            Celebrating tradition in ethnic products, sarees, and handcrafted textiles. We bring you the finest collections curated for every occasion.
          </p>
        </div>

        {/* 2. Quick Links */}
        <div className="lg:justify-self-center">
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="/products" className="hover:text-white transition">Shop All</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Orders</Link></li>
            <li><Link to="#" className="hover:text-white transition">Track Order</Link></li>
          </ul>
        </div>

        {/* 3. Support */}
        <div className="lg:justify-self-end">
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-white transition">Returns</Link></li>
            <li><Link to="#" className="hover:text-white transition">FAQs</Link></li>
            <li><Link to="#" className="hover:text-white transition">Wholesale</Link></li>
          </ul>
        </div>

      </div>

      {/* --- Bottom Copyright Section --- */}
      <div className="w-full text-center py-4 text-sm text-white/80 border-t border-amber-900/40">
        © {new Date().getFullYear()} Rangvastrika. All rights reserved.
      </div>
    </footer>
  );
}