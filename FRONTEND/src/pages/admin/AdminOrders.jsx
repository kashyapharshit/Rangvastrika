import { useFetch } from '../../hooks/useFetch';
import { getMyOrders } from '../../api/orderApi';

export default function AdminOrders() {
  const { data: orders, loading, error } = useFetch(getMyOrders);
  const orderList = orders || [];

  return (
    <section className="page">
      <h1>Admin Orders</h1>
      <p>Starter view (using available backend endpoint).</p>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {orderList.map((order) => (
        <p key={order._id}>#{order._id.slice(-6)} - {order.orderItems.length} items</p>
      ))}
    </section>
  );
}