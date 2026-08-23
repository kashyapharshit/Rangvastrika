import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  return (
    <section className="page">
      <h1>Cart</h1>
      {!items.length && <p>Your cart is empty.</p>}
      {items.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      ))}
      <CartSummary items={items} total={total} />
    </section>
  );
}
