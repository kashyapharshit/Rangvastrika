import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressForm from '../components/checkout/AddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import WhatsAppCheckoutButton from '../components/checkout/WhatsAppCheckoutButton';
import Button from '../components/common/Button';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../api/orderApi';
import { validateAddress } from '../utils/validators';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitOrder = async () => {
    const validationMessage = validateAddress(shippingAddress);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createOrder({
        shippingAddress,
        totalPrice: total,
        orderItems: items.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: Number(item.price || 0),
        })),
      });

      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Checkout</h1>
      <AddressForm value={shippingAddress} onChange={setShippingAddress} />
      <OrderSummary items={items} total={total} />
      <WhatsAppCheckoutButton message={`Hi, I want to confirm my order worth ₹${total}.`} />
      {error && <p className="error">{error}</p>}
      <Button onClick={submitOrder} disabled={!items.length || loading}>
        {loading ? 'Placing order...' : 'Place Order'}
      </Button>
    </section>
  );
}
