import Link from "next/link";
import styles from "./Button.module.css";

/**
 * Pill-cornered call-to-action used across banners and forms.
 * Renders a Next <Link> when `href` is set, otherwise a <button>.
 *
 * variant: "hot" (red-orange, default) | "accent" (orange) | "primary" (green) | "light" (white)
 * size:    "md" (default) | "lg"
 */
export default function Button({
  href,
  variant = "hot",
  size = "md",
  icon,
  iconPosition = "end",
  className = "",
  children,
  ...rest
}) {
  const classes = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ");

  const content = (
    <>
      {icon && iconPosition === "start" && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {icon && iconPosition === "end" && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
