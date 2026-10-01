import PromoBanner from "@/components/ui/PromoBanner";
import styles from "./PromoPair.module.css";

/**
 * Two promotional banners side by side.
 * layout: "wide" (≈73/27 split, first pair) | "equal" (50/50, second pair)
 */
export default function PromoPair({ banners, layout = "equal", label }) {
  return (
    <section className={`${styles.section} ${styles[layout]}`} aria-label={label}>
      <div className={`container ${styles.grid}`}>
        {banners.map(({ id, ...banner }) => (
          <PromoBanner key={id} {...banner} className={`${styles.banner} ${styles[id] ?? ""}`} data-reveal />
        ))}
      </div>
    </section>
  );
}
