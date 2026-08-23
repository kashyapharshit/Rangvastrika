import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="sidebar h-full min-h-screen w-56 flex flex-col gap-1 px-4 py-6 border-r border-amber-900/40"
      style={{
        background:
          "linear-gradient(180deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
      }}
    >
      <Link
        to="/admin"
        className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition"
      >
        Dashboard
      </Link>
      <Link
        to="/admin/products"
        className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition"
      >
        Products
      </Link>
      <Link
        to="/admin/orders"
        className="px-4 py-2 rounded-full text-white text-sm font-medium hover:bg-white/10 transition"
      >
        Orders
      </Link>
    </aside>
  );
}