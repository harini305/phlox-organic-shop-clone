"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { getProduct, getProductHref } from "@/data/products";
import { createPersistentStore, usePersistentStore } from "@/lib/persistentStore";
import Toast from "@/components/ui/Toast";

// Front-end only shop state for the demo (no back end): basket, wishlist,
// a mock signed-in customer and placed orders, persisted to localStorage so
// they survive navigation and reloads.
const cartStore = createPersistentStore("organic-shop:cart", []);
const wishlistStore = createPersistentStore("organic-shop:wishlist", []);
const accountStore = createPersistentStore("organic-shop:account", null);
const ordersStore = createPersistentStore("organic-shop:orders", []);

export const FREE_SHIPPING_THRESHOLD = 50;
export const FLAT_SHIPPING = 5;

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const items = usePersistentStore(cartStore);
  const wishlist = usePersistentStore(wishlistStore);
  const account = usePersistentStore(accountStore);
  const orders = usePersistentStore(ordersStore);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const notify = useCallback((message) => {
    setToast({ message, key: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const addItem = useCallback(
    (product, quantity = 1) => {
      cartStore.set((current) => {
        if (current.some((item) => item.id === product.id)) {
          return current.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          );
        }
        return [
          ...current,
          { id: product.id, name: product.name, image: product.image, price: product.price, quantity },
        ];
      });
      notify(`${quantity > 1 ? `${quantity} × ` : ""}${product.name} added to your basket`);
    },
    [notify],
  );

  const setQuantity = useCallback((id, quantity) => {
    cartStore.set((current) =>
      quantity < 1
        ? current.filter((item) => item.id !== id)
        : current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  }, []);

  const removeItem = useCallback(
    (item) => {
      cartStore.set((current) => current.filter((i) => i.id !== item.id));
      notify(`${item.name} removed from your basket`);
    },
    [notify],
  );

  const clearCart = useCallback(() => cartStore.set([]), []);

  const toggleWishlist = useCallback(
    (product) => {
      const listed = wishlistStore.getSnapshot().includes(product.id);
      wishlistStore.set((current) =>
        listed ? current.filter((id) => id !== product.id) : [...current, product.id],
      );
      notify(listed ? `${product.name} removed from your wishlist` : `${product.name} added to your wishlist`);
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

  const signIn = useCallback((name) => accountStore.set({ name }), []);
  const signOut = useCallback(() => accountStore.set(null), []);

  // Records the order locally and empties the basket; returns the order.
  const placeOrder = useCallback((details) => {
    const order = { ...details, number: String(Date.now()).slice(-6), date: new Date().toISOString() };
    ordersStore.set((current) => [order, ...current]);
    cartStore.set([]);
    return order;
  }, []);

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items,
      count,
      total,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      shareProduct,
      wishlist: wishlist.map(getProduct).filter(Boolean),
      isWishlisted: (id) => wishlist.includes(id),
      toggleWishlist,
      account,
      signIn,
      signOut,
      orders,
      placeOrder,
      notify,
    };
  }, [items, wishlist, account, orders, addItem, setQuantity, removeItem, clearCart, shareProduct, toggleWishlist, signIn, signOut, placeOrder, notify]);

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

/** Shipping rule from the top bar: free from $50, otherwise a flat rate. */
export function getShipping(subtotal) {
  return subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}
