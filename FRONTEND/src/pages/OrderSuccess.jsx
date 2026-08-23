import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <section className="page">
      <h1>Order placed successfully</h1>
      <p>Thank you for shopping with us.</p>
      <Link to="/my-orders">View my orders</Link>
    </section>
  );
}
