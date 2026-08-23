import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card bg-white rounded-2xl shadow-sm border border-amber-900/10 overflow-hidden flex flex-col hover:shadow-md transition">
      <img
        src={product.image || "https://placehold.co/600x400?text=Product"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="text-sm font-semibold text-[#2b1a12] line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-[#7a5236] mb-3">
          {formatCurrency(product.price)}
        </p>
        <div className="row flex items-center justify-between mt-auto gap-2">
          <Link
            to={`/products/${product._id}`}
            className="text-sm font-medium text-[#4a2f1d] hover:underline"
          >
            View
          </Link>
          <Button
            className="px-4 py-1.5 text-xs"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}