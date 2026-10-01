import styles from "./SectionHeading.module.css";

/**
 * Section title with a small green "eyebrow" pill above it
 * (e.g. eyebrow "Recently Added Our Store", title "New Products").
 *
 * align: "center" (default) | "left"
 * tone:  "dark" (near-black title) | "green" (deep green title)
 * decorated: draws the thin green gradient rule beside the title
 */
export default function SectionHeading({
  eyebrow,
  title,
  as: Tag = "h2",
  align = "center",
  tone = "dark",
  decorated = false,
  className = "",
}) {
  const classes = [styles.heading, styles[align], styles[tone], decorated && styles.decorated, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Tag className={styles.title}>{title}</Tag>
    </div>
  );
}
