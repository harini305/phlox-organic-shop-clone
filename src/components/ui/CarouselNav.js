import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import styles from "./CarouselNav.module.css";

/** Prev / next square buttons for a carousel; the carousel binds to them via the refs. */
export default function CarouselNav({ label, prevRef, nextRef, className = "" }) {
  return (
    <div className={[styles.nav, className].filter(Boolean).join(" ")}>
      <button type="button" ref={prevRef} className={styles.button} aria-label={`Previous ${label}`}>
        <PiCaretLeftBold aria-hidden="true" />
      </button>
      <button type="button" ref={nextRef} className={styles.button} aria-label={`Next ${label}`}>
        <PiCaretRightBold aria-hidden="true" />
      </button>
    </div>
  );
}
