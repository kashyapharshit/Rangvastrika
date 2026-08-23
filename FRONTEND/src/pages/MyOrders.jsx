import { useFetch } from "../hooks/useFetch";
import { getMyOrders } from "../api/orderApi";
import { formatCurrency } from "../utils/formatCurrency";

export default function MyOrders() {
  const { data: orders, loading, error } = useFetch(getMyOrders);
  const orderList = orders || [];

  return (
    <section
      className="page min-h-[80vh] px-4 sm:px-8 py-10 max-w-4xl mx-auto"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-6">
        My Orders
      </h1>

      {loading && (
        <p className="text-sm text-center text-[#4a2f1d] py-10">
          Loading orders...
        </p>
      )}
      {error && (
        <p className="error text-sm text-red-500 text-center py-10">
          {error}
        </p>
      )}
      {!loading && !orderList.length && (
        <p className="text-sm text-gray-500 text-center py-10">
          No orders yet.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {orderList.map((order) => (
          <article
            key={order._id}
            className="card-sm bg-white rounded-2xl shadow-sm border border-amber-900/10 p-5 flex items-center justify-between flex-wrap gap-2"
          >
            <p className="text-sm font-semibold text-[#2b1a12]">
              Order #{order._id.slice(-6)}
            </p>
            <p className="text-sm text-[#7a5236] font-medium">
              {formatCurrency(order.totalPrice)}
            </p>
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {order.isPaid ? "Paid" : "Pending"}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}