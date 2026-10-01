"use client";

import { useCart } from "@/context/CartContext";
import ProductCard from "./ProductCard";

/** ProductCard wired to the basket (add to cart / share hover tools). */
export default function CartProductCard(props) {
  const { addItem, shareProduct } = useCart();
  return <ProductCard {...props} onAddToCart={addItem} onShare={shareProduct} />;
}
