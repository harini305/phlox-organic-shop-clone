import styles from "./Price.module.css";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value) {
  return formatter.format(value);
}

/**
 * Current price, followed by the struck-through regular price when on sale
 * (same order as the reference: sale price first, then the old price).
 *
 * size: "md" (product cards) | "lg" (featured / best-deal cards)
 */
export default function Price({ price, regularPrice, size = "md", className = "" }) {
  const onSale = regularPrice != null && regularPrice > price;

  return (
    <p className={[styles.price, styles[size], className].filter(Boolean).join(" ")}>
      {onSale && <span className="visually-hidden">Sale price: </span>}
      <ins className={styles.current}>{formatPrice(price)}</ins>
      {onSale && (
        <>
          <span className="visually-hidden"> Original price: </span>
          <del className={styles.regular}>{formatPrice(regularPrice)}</del>
        </>
      )}
    </p>
  );
}
