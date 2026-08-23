import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section
      className="page min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <h1 className="text-6xl font-serif font-bold text-[#2b1a12] mb-2">
        404
      </h1>
      <p className="text-base text-gray-600 mb-8">Page not found</p>
      <Link
        to="/"
        className="px-8 py-3 rounded-full text-white text-sm font-medium transition hover:opacity-90"
        style={{ backgroundColor: "#7a5236" }}
      >
        Go to home
      </Link>
    </section>
  );
}