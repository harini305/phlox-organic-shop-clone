import styles from "./Badge.module.css";

/**
 * Small label used for sale markers and discount callouts.
 *
 * variant: "sale"   — orange rounded rectangle on product images ("Sale!")
 *          "circle" — round red-orange discount bubble on banners ("%50")
 *          "tag"    — compact uppercase rectangle on banners ("Sale", "%15")
 * color:   "hot" (red-orange) | "accent" (orange) — overrides the variant default
 */
export default function Badge({ variant = "tag", color, className = "", children }) {
  const classes = [styles.badge, styles[variant], color && styles[color], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
