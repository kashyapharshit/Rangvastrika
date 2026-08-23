import { SHOP_WHATSAPP_NUMBER } from './constants';
import { formatCurrency } from './formatCurrency';

export const buildWhatsAppLink = (message, phone = SHOP_WHATSAPP_NUMBER) => {
  if (!phone) return '#';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const buildOrderMessage = (order, cartItems) => {
  const itemLines = cartItems
    .map((item) => `• ${item.name} x${item.quantity} - ${formatCurrency(item.price)}`)
    .join('\n');

  return (
    `Naya Order! 🛍️\n\n` +
    `Order ID: ${order._id}\n\n` +
    `${itemLines}\n\n` +
    `Total: ${formatCurrency(order.totalPrice)}\n` +
    `Shipping Address: ${order.shippingAddress || 'N/A'}`
  );
};

export const buildWhatsAppOrderLink = (order, cartItems, phone = SHOP_WHATSAPP_NUMBER) =>
  buildWhatsAppLink(buildOrderMessage(order, cartItems), phone);