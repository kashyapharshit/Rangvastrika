import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { items } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Rangvastrika</Link>
      <div className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart <Badge>{items.length}</Badge></Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile">{user?.name || 'Profile'}</Link>
            <Link to="/my-orders">Orders</Link>
            {isAdmin && <Link to="/admin">Admin</Link>}
            <button className="link-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
