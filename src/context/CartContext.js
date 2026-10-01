"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useRef, useState } from "react";
import { getProductHref } from "@/data/products";
import Toast from "@/components/ui/Toast";

// Front-end only basket for the demo: kept in memory, no checkout/back end.
const CartContext = createContext(null);

function cartReducer(items, action) {
  switch (action.type) {
    case "add": {
      const { product } = action;
      if (items.some((item) => item.id === product.id)) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...items,
        { id: product.id, name: product.name, image: product.image, price: product.price, quantity: 1 },
      ];
    }
    case "remove":
      return items.filter((item) => item.id !== action.id);
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const notify = useCallback((message) => {
    setToast({ message, key: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const addItem = useCallback(
    (product) => {
      dispatch({ type: "add", product });
      notify(`${product.name} added to your basket`);
    },
    [notify],
  );

  const removeItem = useCallback(
    (item) => {
      dispatch({ type: "remove", id: item.id });
      notify(`${item.name} removed from your basket`);
    },
    [notify],
  );

  const shareProduct = useCallback(
    async (product) => {
      const url = new URL(getProductHref(product), window.location.origin).href;
      try {
        if (navigator.share) {
          await navigator.share({ title: product.name, url });
          return;
        }
        await navigator.clipboard.writeText(url);
        notify("Product link copied to clipboard");
      } catch (error) {
        if (error?.name !== "AbortError") notify("Sharing isn't available in this browser");
      }
    },
    [notify],
  );

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { items, count, total, addItem, removeItem, shareProduct };
  }, [items, addItem, removeItem, shareProduct]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <Toast toast={toast} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
