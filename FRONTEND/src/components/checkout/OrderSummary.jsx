import { formatCurrency } from '../../utils/formatCurrency';

export default function OrderSummary({ items, total }) {
  return (
    <div className="card-sm">
      <h3>Order Summary</h3>
      {items.map((item) => (
        <p key={item._id}>{item.name} x {item.quantity}</p>
      ))}
      <strong>Total: {formatCurrency(total)}</strong>
    </div>
  );
}
