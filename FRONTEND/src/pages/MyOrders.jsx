import { useFetch } from '../hooks/useFetch';
import { getMyOrders } from '../api/orderApi';
import { formatCurrency } from '../utils/formatCurrency';

export default function MyOrders() {
  const { data: orders, loading, error } = useFetch(getMyOrders);
  const orderList = orders || [];

  return (
    <section className="page">
      <h1>My Orders</h1>
      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !orderList.length && <p>No orders yet.</p>}
      {orderList.map((order) => (
        <article key={order._id} className="card-sm">
          <p>Order #{order._id.slice(-6)}</p>
          <p>Total: {formatCurrency(order.totalPrice)}</p>
          <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p>
        </article>
      ))}
    </section>
  );
}