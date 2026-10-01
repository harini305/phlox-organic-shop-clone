"use client";

import Image from "next/image";
import Link from "next/link";
import { PiXLight } from "react-icons/pi";
import { useCart } from "@/context/CartContext";
import { getProductHref } from "@/data/products";
import { useHydrated } from "@/lib/persistentStore";
import Button from "@/components/ui/Button";
import Price from "@/components/ui/Price";
import styles from "./WishlistView.module.css";

/** Saved products table (Product / Price / Stock status) with add-to-cart and remove. */
export default function WishlistView() {
  const hydrated = useHydrated();
  const { wishlist, toggleWishlist, addItem } = useCart();

  if (!hydrated) return <div className={styles.placeholder} aria-hidden="true" />;

  return (
    <div className={styles.wrap} data-reveal>
      <table className={styles.table}>
        <caption className="visually-hidden">Your wishlist</caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="visually-hidden">Remove</span>
            </th>
            <th scope="col" colSpan={2}>
              Product
            </th>
            <th scope="col">Price</th>
            <th scope="col">Stock status</th>
            <th scope="col">
              <span className="visually-hidden">Add to cart</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {wishlist.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.emptyCell}>
                No products added to the wishlist yet. <Link href="/shop">Browse the shop</Link> and tap{" "}
                <em>Add To Wishlist</em> on any product.
              </td>
            </tr>
          ) : (
            wishlist.map((product) => (
              <tr key={product.id}>
                <td className={styles.removeCell}>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => toggleWishlist(product)}
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <PiXLight aria-hidden="true" />
                  </button>
                </td>
                <td className={styles.thumbCell}>
                  <Link href={getProductHref(product)} tabIndex={-1} aria-hidden="true">
                    <Image src={product.image} alt="" width={80} height={86} className={styles.thumb} />
                  </Link>
                </td>
                <td>
                  <Link href={getProductHref(product)} className={styles.name}>
                    {product.name}
                  </Link>
                </td>
                <td data-label="Price">
                  <Price price={product.price} regularPrice={product.regularPrice} />
                </td>
                <td data-label="Stock" className={styles.stock}>
                  In stock
                </td>
                <td className={styles.actionCell}>
                  <Button type="button" variant="accent" onClick={() => addItem(product)}>
                    Add to cart
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
