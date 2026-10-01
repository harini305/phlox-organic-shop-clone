import { shippingNotice } from "@/data/site";
import styles from "./TopBar.module.css";

/** Thin promo strip above the header, on the orange-fruit photo. */
export default function TopBar() {
  return (
    <div className={styles.bar}>
      <p className={`container ${styles.text}`}>{shippingNotice}</p>
    </div>
  );
}
