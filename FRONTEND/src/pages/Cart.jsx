import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();

  return (
    <section
      className="page min-h-[80vh] px-4 sm:px-8 py-10 max-w-4xl mx-auto"
      style={{ backgroundColor: "#FBF7F2" }}
    >
      <h1 className="text-3xl font-serif font-bold text-[#2b1a12] mb-6">
        Cart
      </h1>

      {!items.length && (
        <p className="text-sm text-gray-500 text-center py-12">
          Your cart is empty.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-amber-900/10 p-6 flex flex-col divide-y divide-amber-900/10">
          {items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {Boolean(items.length) && (
          <CartSummary items={items} total={total} />
        )}
      </div>
    </section>
  );
}