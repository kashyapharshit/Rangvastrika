import { formatCurrency } from "../../utils/formatCurrency";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="row-between card-sm flex items-center justify-between gap-4 py-3 border-b border-amber-900/10 last:border-b-0">
      <div>
        <strong className="text-[#2b1a12] text-sm">{item.name}</strong>
        <p className="text-sm text-gray-500 mt-1">
          {formatCurrency(item.price)} x {item.quantity}
        </p>
      </div>
      <div className="row flex items-center gap-2">
        <button
          className="link-btn h-7 w-7 flex items-center justify-center rounded-full border border-amber-900/20 text-[#4a2f1d] text-sm font-medium hover:bg-amber-900/5 transition"
          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
        >
          -
        </button>
        <button
          className="link-btn h-7 w-7 flex items-center justify-center rounded-full border border-amber-900/20 text-[#4a2f1d] text-sm font-medium hover:bg-amber-900/5 transition"
          onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="link-btn px-3 py-1 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 transition"
          onClick={() => onRemove(item._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}