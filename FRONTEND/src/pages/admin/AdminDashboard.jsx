import Sidebar from '../../components/layout/Sidebar';

export default function AdminDashboard() {
  return (
    <section className="page admin-layout">
      <Sidebar />
      <div>
        <h1>Admin Dashboard</h1>
        <p>Manage products and orders.</p>
      </div>
    </section>
  );
}
