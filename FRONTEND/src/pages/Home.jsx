import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      className="page min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20"
      style={{
        background:
          "linear-gradient(180deg, #FBF3E9 0%, #F3E3D0 100%)",
      }}
    >
      <span className="text-xs font-semibold tracking-widest uppercase text-[#7a5236] mb-3">
        Ethnic Elegance & Textiles
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2b1a12] mb-4">
        Rangvastrika Store
      </h1>
      <p className="text-base text-[#4a2f1d]/80 max-w-md mb-8">
        Handpicked ethnic products and handcrafted collections, curated for
        every occasion.
      </p>
      <Link
        to="/products"
        className="px-8 py-3 rounded-full text-white text-sm font-medium transition hover:opacity-90"
        style={{ backgroundColor: "#7a5236" }}
      >
        Browse products
      </Link>
    </section>
  );
}