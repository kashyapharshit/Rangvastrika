import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api/productApi";
import { useFetch } from "../hooks/useFetch";
import ProductImageZoom from "../components/product/ProductImageZoom";
import Button from "../components/common/Button";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../utils/formatCurrency";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: products, loading, error } = useFetch(getProducts);
  const { addToCart } = useCart();

  const product = useMemo(
    () => (products || []).find((item) => item._id === id),
    [products, id]
  );

  if (loading)
    return (
      <p className="page text-center py-16 text-[#4a2f1d]">
        Loading product...
      </p>
    );
  if (error)
    return (
      <p className="page error text-center py-16 text-red-500">{error}</p>
    );
  if (!product)
    return (
      <p className="page text-center py-16 text-[#4a2f1d]">
        Product not found.
      </p>
    );

  const mainImage = (product.images && product.images[0]) || product.image || '';

  return (
    <section
      className="page min-h-[80vh] px-4 sm:px-8 py-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <ProductImageZoom src={mainImage} alt={product.name} />
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-3">
          {product.name}
        </h1>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {product.description || "No description available."}
        </p>
        <p className="text-xl font-semibold text-[#7a5236] mb-6">
          {formatCurrency(product.price)}
        </p>
        <Button onClick={() => addToCart(product)} className="px-8">
          Add to Cart
        </Button>
      </div>
    </section>
  );
}
