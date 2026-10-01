import Link from "next/link";
import { PiCaretRightBold } from "react-icons/pi";
import styles from "./Breadcrumbs.module.css";

/**
 * Large breadcrumb trail used as the shop/category page heading
 * ("Home › Products › Fruits") followed by the green gradient rule.
 * items: [{ label, href? }] — the last item is the current page (rendered as the h1).
 */
export default function Breadcrumbs({ items, className = "" }) {
  const last = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={[styles.nav, className].filter(Boolean).join(" ")}>
      <ol className={styles.list}>
        {items.map((item, i) => (
          <li key={item.label} className={styles.item}>
            {i < last ? (
              <>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
                <PiCaretRightBold className={styles.sep} aria-hidden="true" />
              </>
            ) : (
              <h1 className={styles.current} aria-current="page">
                {item.label}
              </h1>
            )}
          </li>
        ))}
      </ol>
      <span className={styles.rule} aria-hidden="true" />
    </nav>
  );
}
