import styles from "./IconBox.module.css";

/**
 * Icon + title + short description (the "Free Shipping / Secure Payment" strip).
 *
 * icon:   any React node (e.g. a react-icons component)
 * tone:   "light" (white text, for dark/green backgrounds) | "dark"
 * layout: "row" (icon left of text, default) | "stack" (icon above text, centered)
 */
export default function IconBox({
  icon,
  title,
  description,
  tone = "light",
  layout = "row",
  as: TitleTag = "h3",
  className = "",
}) {
  return (
    <div className={[styles.box, styles[tone], styles[layout], className].filter(Boolean).join(" ")}>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      <div className={styles.text}>
        <TitleTag className={styles.title}>{title}</TitleTag>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
