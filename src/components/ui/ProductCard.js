import Image from "next/image";
import Link from "next/link";
import { IoBagHandleOutline, IoShareSocialOutline } from "react-icons/io5";
import { getCategory, getCategoryHref } from "@/data/categories";
import { getProductHref, isOnSale } from "@/data/products";
import Badge from "./Badge";
import Price from "./Price";
import StarRating from "./StarRating";
import styles from "./ProductCard.module.css";

/**
 * Product tile: image (with sale badge and hover tool panel), categories,
 * title, rating and price. Data comes from `src/data/products.js`.
 *
 * size: "md" (carousels) | "lg" (Today's Best Deals)
 * onAddToCart / onShare: optional handlers (callers must be client components to pass them)
 */
export default function ProductCard({
  product,
  size = "md",
  priority = false,
  onAddToCart,
  onShare,
  className = "",
}) {
  const href = getProductHref(product);
  const onSale = isOnSale(product);
  const sizes =
    size === "lg"
      ? "(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 485px"
      : "(max-width: 767px) 90vw, (max-width: 1024px) 33vw, 280px";

  return (
    <article className={[styles.card, styles[size], className].filter(Boolean).join(" ")}>
      <div className={styles.media}>
        <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
          <Image
            src={product.image}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className={styles.image}
          />
        </Link>

        {onSale && (
          <Badge variant="sale" className={styles.saleBadge}>
            Sale!
          </Badge>
        )}

        <div className={styles.tools}>
          <button
            type="button"
            className={styles.tool}
            aria-label={`Add ${product.name} to cart`}
            onClick={onAddToCart ? () => onAddToCart(product) : undefined}
          >
            <IoBagHandleOutline aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.tool}
            aria-label={`Share ${product.name}`}
            onClick={onShare ? () => onShare(product) : undefined}
          >
            <IoShareSocialOutline aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {product.categories?.length > 0 && (
          <p className={styles.categories}>
            {product.categories.map((slug, i) => {
              const category = getCategory(slug);
              if (!category) return null;
              return (
                <span key={slug}>
                  {i > 0 && ", "}
                  <Link href={getCategoryHref(slug)}>{category.name}</Link>
                </span>
              );
            })}
          </p>
        )}

        <h3 className={styles.title}>
          <Link href={href}>{product.name}</Link>
        </h3>

        {product.rating != null && <StarRating value={product.rating} />}

        <Price
          price={product.price}
          regularPrice={product.regularPrice}
          size={size}
          className={styles.price}
        />
      </div>
    </article>
  );
}
