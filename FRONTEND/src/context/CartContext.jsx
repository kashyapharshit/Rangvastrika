import { createContext, useEffect, useMemo, useState } from 'react';
import { CART_STORAGE_KEY } from '../utils/constants';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item._id === product._id);
      if (existing) {
        return current.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (_id, quantity) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item._id !== _id));
      return;
    }

    setItems((current) =>
      current.map((item) => (item._id === _id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (_id) => setItems((current) => current.filter((item) => item._id !== _id));
  const clearCart = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
