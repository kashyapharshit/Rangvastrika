import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], onAddToCart }) {
  if (!products.length) {
    return (
      <p className="muted text-sm text-gray-500 text-center py-12">
        No products found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}