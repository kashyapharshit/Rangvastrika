import Sidebar from "../../components/layout/Sidebar";
import { useFetch } from "../../hooks/useFetch";
import { getMyOrders } from "../../api/orderApi";

export default function AdminOrders() {
  const { data: orders, loading, error } = useFetch(getMyOrders);
  const orderList = orders || [];

  return (
    <section className="page admin-layout flex min-h-screen">
      <Sidebar />
      <div
        className="flex-1 px-6 sm:px-10 py-10"
        style={{ backgroundColor: "#FBF7F2" }}
      >
        <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-1">
          Admin Orders
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Starter view (using available backend endpoint).
        </p>

        {loading && (
          <p className="text-sm text-[#4a2f1d] py-6">Loading...</p>
        )}
        {error && (
          <p className="error text-sm text-red-500 py-6">{error}</p>
        )}

        <div className="flex flex-col gap-3">
          {orderList.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-sm border border-amber-900/10 px-5 py-4 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-[#2b1a12]">
                #{order._id.slice(-6)}
              </span>
              <span className="text-sm text-gray-600">
                {order.orderItems.length} items
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}