import { SHOP_WHATSAPP_NUMBER } from './constants';

export const buildWhatsAppLink = (message, phone = SHOP_WHATSAPP_NUMBER) => {
  if (!phone) return '#';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
