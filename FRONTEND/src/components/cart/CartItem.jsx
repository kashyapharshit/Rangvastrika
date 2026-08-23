import { formatCurrency } from '../../utils/formatCurrency';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="row-between card-sm">
      <div>
        <strong>{item.name}</strong>
        <p>{formatCurrency(item.price)} x {item.quantity}</p>
      </div>
      <div className="row">
        <button className="link-btn" onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}>-</button>
        <button className="link-btn" onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}>+</button>
        <button className="link-btn" onClick={() => onRemove(item._id)}>Remove</button>
      </div>
    </div>
  );
}
