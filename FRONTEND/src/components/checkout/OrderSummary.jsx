import { formatCurrency } from "../../utils/formatCurrency";

export default function OrderSummary({ items, total }) {
  return (
    <div className="card-sm bg-white rounded-2xl shadow-md border border-amber-900/10 p-6 max-w-sm w-full">
      <h3 className="text-lg font-semibold text-[#2b1a12] mb-3">
        Order Summary
      </h3>
      <div className="flex flex-col gap-1 mb-4">
        {items.map((item) => (
          <p key={item._id} className="text-sm text-gray-600">
            {item.name} x {item.quantity}
          </p>
        ))}
      </div>
      <strong className="block text-sm font-semibold text-[#4a2f1d] pt-3 border-t border-amber-900/10">
        Total: {formatCurrency(total)}
      </strong>
    </div>
  );
}