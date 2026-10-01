import { IoStar } from "react-icons/io5";
import styles from "./StarRating.module.css";

/**
 * Five-star rating display. `value` is 0–5 (fractions allowed).
 * color: "secondary" (bright green, product cards) | "primary" (deep green, testimonials)
 */
export default function StarRating({ value, color = "secondary", className = "" }) {
  const percent = Math.max(0, Math.min(5, value)) * 20;
  const stars = Array.from({ length: 5 }, (_, i) => <IoStar key={i} aria-hidden="true" />);

  return (
    <div
      className={[styles.rating, styles[color], className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      <span className={styles.base}>{stars}</span>
      <span className={styles.fill} style={{ width: `${percent}%` }}>
        {stars}
      </span>
    </div>
  );
}
