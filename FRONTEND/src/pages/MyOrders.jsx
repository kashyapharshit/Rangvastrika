import { useFetch } from "../hooks/useFetch";
import { getMyOrders } from "../api/orderApi";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";

const statusStyles = {
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
};

export default function MyOrders() {
  const { data: orders, loading, error } = useFetch(getMyOrders);
  const orderList = orders || [];

  return (
    // 1. OUTER CONTAINER: w-full for full screen width background
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FBF7F2" }}>
      
      {/* 2. INNER CONTAINER: max-w-4xl and mx-auto to center the content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2b1a12] mb-8">
          My Orders
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7a5236]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-sm text-red-500 text-center py-10 bg-white rounded-2xl shadow-sm border border-red-100">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && !orderList.length && (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-[#7a5236]/10">
            <p className="text-lg text-gray-500 mb-4 font-medium">You haven't placed any orders yet.</p>
            <Link to="/products" className="inline-block px-6 py-2.5 bg-[#7a5236] text-white rounded-full font-medium hover:bg-[#634026] transition-colors">
              Start Shopping
            </Link>
          </div>
        )}

        {/* Order List */}
        {!loading && !error && orderList.length > 0 && (
          <div className="flex flex-col gap-5">
            {orderList.map((order) => {
              const status = order.status || "Pending";
              
              return (
                <article
                  key={order._id}
                  className="bg-white rounded-2xl shadow-sm border border-[#7a5236]/15 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all duration-300"
                >
                  {/* Order ID & Date */}
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold text-[#2b1a12]">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      }) : 'Recent Order'}
                    </p>
                  </div>
                  
                  {/* Price & Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
                    <p className="text-lg font-bold text-[#7a5236]">
                      {formatCurrency(order.totalPrice)}
                    </p>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full ${
                        statusStyles[status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}