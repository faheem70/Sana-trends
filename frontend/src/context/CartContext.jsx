import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sana_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sana_cart', JSON.stringify(cart));
  }, [cart]);

  // item: { productId, name, price, image, size, qty }
  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, qty: i.qty + item.qty }
            : i
        );
      }
      return [...prev, item];
    });
  }

  function updateQty(productId, size, qty) {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) =>
        i.productId === productId && i.size === size ? { ...i, qty } : i
      )
    );
  }

  function removeFromCart(productId, size) {
    setCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalAmount = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
