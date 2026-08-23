import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/orders">Orders</Link>
    </aside>
  );
}
