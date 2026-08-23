import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <section
      className="page min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl mb-5">
        ✓
      </div>
      <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-2">
        Order placed successfully
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Thank you for shopping with us.
      </p>
      <Link
        to="/my-orders"
        className="px-8 py-3 rounded-full text-white text-sm font-medium transition hover:opacity-90"
        style={{ backgroundColor: "#7a5236" }}
      >
        View my orders
      </Link>
    </section>
  );
}