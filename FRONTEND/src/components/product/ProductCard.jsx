import Button from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="card">
      <img src={product.image || 'https://placehold.co/600x400?text=Product'} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{formatCurrency(product.price)}</p>
      <div className="row">
        <Link to={`/products/${product._id}`}>View</Link>
        <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </div>
    </article>
  );
}
