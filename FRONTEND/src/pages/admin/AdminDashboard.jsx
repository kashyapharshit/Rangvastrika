import Sidebar from "../../components/layout/Sidebar";

export default function AdminDashboard() {
  return (
    <section className="page admin-layout flex min-h-screen">
      <Sidebar />
      <div
        className="flex-1 px-6 sm:px-10 py-10"
        style={{ backgroundColor: "#FBF7F2" }}
      >
        <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Manage products and orders.
        </p>
      </div>
    </section>
  );
}