import { Link } from 'react-router-dom';

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/my-orders">Orders</Link>
    </div>
  );
}
