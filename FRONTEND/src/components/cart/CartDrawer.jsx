import Modal from '../common/Modal';
import CartItem from './CartItem';

export default function CartDrawer({ open, items, onClose, onUpdateQuantity, onRemove }) {
  return (
    <Modal open={open} title="Your Cart" onClose={onClose}>
      {items.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </Modal>
  );
}
