import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

export default function CartSummary({ items = [], total = 0 }) {
  return (
    <div className="card-sm">
      <h3>Cart Summary</h3>
      <p>Items: {items.length}</p>
      <p>Total: {formatCurrency(total)}</p>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}
