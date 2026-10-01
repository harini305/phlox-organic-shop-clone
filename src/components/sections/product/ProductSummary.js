"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { PiHeartFill, PiHeartLight, PiShareNetworkLight } from "react-icons/pi";
import { getCategory, getCategoryHref } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import Price from "@/components/ui/Price";
import QuantityInput from "@/components/ui/QuantityInput";
import StarRating from "@/components/ui/StarRating";
import styles from "./ProductSummary.module.css";

function CategoryLinks({ slugs }) {
  return slugs.map((slug, i) => (
    <span key={slug}>
      {i > 0 && ", "}
      <Link href={getCategoryHref(slug)}>{getCategory(slug)?.name}</Link>
    </span>
  ));
}

/** Right-hand column of the product page: rating, title, price, quantity / add to cart, share, wishlist. */
export default function ProductSummary({ product, summary, reviewCount }) {
  const id = useId();
  const { addItem, shareProduct, isWishlisted, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const listed = isWishlisted(product.id);

  return (
    <div className={styles.summary} data-reveal>
      <a href="#product-reviews" className={styles.rating}>
        <StarRating value={product.rating} />
        <span className="visually-hidden">
          , {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
        </span>
      </a>

      <h1 className={styles.title}>{product.name}</h1>

      <p className={styles.meta}>
        <span className={styles.metaLabel}>Tags</span>
        <span className={styles.metaValue}>
          <CategoryLinks slugs={product.categories} />
        </span>
      </p>

      <Price price={product.price} regularPrice={product.regularPrice} size="lg" className={styles.price} />

      <span className={styles.rule} aria-hidden="true" />

      {summary && <p className={styles.excerpt}>{summary}</p>}

      <form
        className={styles.buy}
        onSubmit={(e) => {
          e.preventDefault();
          addItem(product, quantity);
          setQuantity(1);
        }}
      >
        <label htmlFor={`${id}-qty`} className={styles.qtyLabel}>
          Quantity:
        </label>
        <QuantityInput id={`${id}-qty`} value={quantity} onChange={setQuantity} label={`Quantity of ${product.name}`} />
        <button type="submit" className={styles.addButton}>
          Add to cart
        </button>
      </form>

      <div className={styles.actions}>
        <button type="button" className={styles.action} onClick={() => shareProduct(product)}>
          Share <PiShareNetworkLight aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.action}
          aria-pressed={listed}
          onClick={() => toggleWishlist(product)}
        >
          {listed ? "In Your Wishlist" : "Add To Wishlist"}
          {listed ? (
            <PiHeartFill aria-hidden="true" className={styles.heartOn} />
          ) : (
            <PiHeartLight aria-hidden="true" />
          )}
        </button>
      </div>

      <span className={styles.rule} aria-hidden="true" />

      <p className={styles.meta}>
        <span className={styles.metaLabel}>Categories</span>
        <span className={styles.metaValue}>
          <CategoryLinks slugs={product.categories} />
        </span>
      </p>
    </div>
  );
}
