import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], onAddToCart }) {
  if (!products.length) return <p className="muted">No products found.</p>;

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
