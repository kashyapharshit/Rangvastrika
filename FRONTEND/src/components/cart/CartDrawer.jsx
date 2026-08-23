import Modal from "../common/Modal";
import CartItem from "./CartItem";

export default function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQuantity,
  onRemove,
}) {
  return (
    <Modal open={open} title="Your Cart" onClose={onClose}>
      <div className="flex flex-col divide-y divide-amber-900/10">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            Your cart is empty.
          </p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))
        )}
      </div>
    </Modal>
  );
}