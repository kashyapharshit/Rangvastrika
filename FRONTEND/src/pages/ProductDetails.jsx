import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../api/productApi';
import { useFetch } from '../hooks/useFetch';
import ProductImageZoom from '../components/product/ProductImageZoom';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: products = [], loading, error } = useFetch(getProducts);
  const { addToCart } = useCart();

  const product = useMemo(() => products.find((item) => item._id === id), [products, id]);

  if (loading) return <p className="page">Loading product...</p>;
  if (error) return <p className="page error">{error}</p>;
  if (!product) return <p className="page">Product not found.</p>;

  return (
    <section className="page">
      <ProductImageZoom src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description || 'No description available.'}</p>
      <p>{formatCurrency(product.price)}</p>
      <Button onClick={() => addToCart(product)}>Add to Cart</Button>
    </section>
  );
}
