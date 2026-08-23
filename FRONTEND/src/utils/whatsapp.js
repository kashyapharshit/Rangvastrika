import { SHOP_WHATSAPP_NUMBER } from './constants';
import { formatCurrency } from './formatCurrency';

export const buildWhatsAppLink = (message, phone = SHOP_WHATSAPP_NUMBER) => {
  if (!phone) return '#';
  const normalizedPhone = String(phone).replace(/\D/g, '');
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};

const getItemImage = (item) =>
  item.image ||
  (Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '') ||
  'N/A';

export const buildOrderMessage = (order, cartItems = []) => {
  const customer = order.customerDetails || {};
  const items = cartItems.length ? cartItems : order.orderItems || [];

  const itemLines = items
    .map((item, index) => {
      const quantity = Number(item.quantity || 0);
      const unitPrice = Number(item.price || 0);
      const lineTotal = quantity * unitPrice;
      const imageUrl = getItemImage(item);

      return [
        `${index + 1}. ${item.name || 'Product'}`,
        `   Qty: ${quantity}`,
        `   Unit Price: ${formatCurrency(unitPrice)}`,
        `   Line Total: ${formatCurrency(lineTotal)}`,
        `   Image: ${imageUrl}`,
      ].join('\n');
    })
    .join('\n\n');

  const detailLines = [
    '🛍️ New Order Request',
    '',
    'Customer Details:',
  ];

  if (customer.name) {
    detailLines.push(`Name: ${customer.name}`);
  }

  detailLines.push(
    `Mobile: ${customer.mobile || 'N/A'}`,
    `Email: ${customer.email || 'N/A'}`,
    `Address: ${customer.address || order.shippingAddress || 'N/A'}`,
    '',
    'Products:',
    itemLines || 'No items',
    '',
    `Grand Total: ${formatCurrency(order.totalPrice || 0)}`
  );

  return detailLines.join('\n');
};

export const buildWhatsAppOrderLink = (order, cartItems, phone = SHOP_WHATSAPP_NUMBER) =>
  buildWhatsAppLink(buildOrderMessage(order, cartItems), phone);
