import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function CartSummary({ items = [], total = 0 }) {
  return (
    <div className="card-sm bg-white rounded-2xl shadow-md border border-amber-900/10 p-6 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-[#2b1a12] mb-3">
        Cart Summary
      </h3>
      <p className="text-sm text-gray-600 mb-1">Items: {items.length}</p>
      <p className="text-sm text-gray-600 mb-4">
        Total:{" "}
        <span className="font-semibold text-[#4a2f1d]">
          {formatCurrency(total)}
        </span>
      </p>
      <Link
        to="/checkout"
        className="block text-center w-full py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90"
        style={{ backgroundColor: "#7a5236" }}
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}