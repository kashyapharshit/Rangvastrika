import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass =
    "flex items-center px-4 py-3 md:py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition touch-target";

  const navLinks = (
    <>
      <Link to="/admin" onClick={() => setMobileOpen(false)} className={linkClass}>
        Dashboard
      </Link>
      <Link to="/admin/products" onClick={() => setMobileOpen(false)} className={linkClass}>
        Products
      </Link>
      <Link to="/admin/orders" onClick={() => setMobileOpen(false)} className={linkClass}>
        Orders
      </Link>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((current) => !current)}
        className="md:hidden fixed top-4 left-4 z-[70] flex items-center justify-center rounded-full bg-[#2b1a12] text-white border border-white/20 shadow-lg touch-target"
        aria-label={mobileOpen ? "Close admin menu" : "Open admin menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin menu overlay"
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-50 bg-black/40"
        />
      )}

      <aside
        className={`sidebar fixed md:static top-0 left-0 z-[60] h-full min-h-screen w-[85vw] max-w-72 md:w-56 flex flex-col gap-1 px-4 py-6 border-r border-amber-900/40 transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{
          background:
            "linear-gradient(180deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
        }}
      >
        <div className="md:hidden h-10" />
        {navLinks}
      </aside>
    </>
  );
}