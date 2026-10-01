import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import styles from "./Pagination.module.css";

/** Numbered page buttons with previous / next and "Last", as on the reference shop. */
export default function Pagination({ page, pageCount, onChange, className = "" }) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Product pages" className={[styles.nav, className].filter(Boolean).join(" ")}>
      <ul className={styles.list}>
        {page > 1 && (
          <li>
            <button type="button" className={styles.arrow} onClick={() => onChange(page - 1)} aria-label="Previous page">
              <PiCaretLeftBold aria-hidden="true" />
            </button>
          </li>
        )}
        {pages.map((n) => (
          <li key={n}>
            <button
              type="button"
              className={`${styles.page} ${n === page ? styles.current : ""}`}
              onClick={() => onChange(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Page ${n}`}
            >
              {n}
            </button>
          </li>
        ))}
        {page < pageCount && (
          <>
            <li>
              <button type="button" className={styles.arrow} onClick={() => onChange(page + 1)} aria-label="Next page">
                <PiCaretRightBold aria-hidden="true" />
              </button>
            </li>
            <li>
              <button type="button" className={styles.text} onClick={() => onChange(pageCount)}>
                Last
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
