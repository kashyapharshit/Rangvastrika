import Sidebar from "../../components/layout/Sidebar";
import { getOrders, updateOrderStatus } from "../../api/orderApi";
import { useFetch } from "../../hooks/useFetch";
import { formatCurrency } from "../../utils/formatCurrency";

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered"];

export default function AdminOrders() {
  const {
    data: orders,
    loading,
    error,
    run: refetchOrders,
    setData,
  } = useFetch(getOrders);
  const orderList = orders || [];

  const changeStatus = async (orderId, status) => {
    try {
      const updated = await updateOrderStatus(orderId, status);
      setData((current) =>
        (current || []).map((order) =>
          order._id === orderId ? { ...order, status: updated.status } : order
        )
      );
    } catch {
      await refetchOrders();
    }
  };

  const formatItems = (items = []) =>
    items
      .map((item) => `${item.name} x${item.quantity}`)
      .join(", ");

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
          View orders, customer details and update delivery status.
        </p>

        {loading && <p className="text-sm text-[#4a2f1d] py-6">Loading...</p>}
        {error && <p className="error text-sm text-red-500 py-6">{error}</p>}

        <div className="flex flex-col gap-4">
          {orderList.map((order) => {
            const customer = order.customerDetails || {};
            const status = order.status || "Pending";

            return (
              <article
                key={order._id}
                className="bg-white rounded-2xl shadow-sm border border-amber-900/10 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <p className="text-sm font-semibold text-[#2b1a12]">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm font-medium text-[#7a5236]">
                    {formatCurrency(order.totalPrice || 0)}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <p>
                    <span className="font-medium text-[#2b1a12]">Name:</span>{" "}
                    {customer.name || order.user?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-[#2b1a12]">Mobile:</span>{" "}
                    {customer.mobile || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-[#2b1a12]">Email:</span>{" "}
                    {customer.email || order.user?.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-[#2b1a12]">Address:</span>{" "}
                    {customer.address || order.shippingAddress || "N/A"}
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-medium text-[#2b1a12]">Products:</span>{" "}
                    {formatItems(order.orderItems) || "N/A"}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <label className="text-sm font-medium text-[#2b1a12]" htmlFor={`status-${order._id}`}>
                    Status
                  </label>
                  <select
                    id={`status-${order._id}`}
                    className="rounded-xl border border-amber-900/20 px-3 py-1.5 text-sm"
                    value={status}
                    onChange={(e) => changeStatus(order._id, e.target.value)}
                  >
                    {ORDER_STATUSES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </article>
            );
          })}

          {!loading && !orderList.length && (
            <p className="text-sm text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
