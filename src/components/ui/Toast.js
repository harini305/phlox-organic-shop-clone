import { PiCheckCircleLight } from "react-icons/pi";
import styles from "./Toast.module.css";

/**
 * Bottom-centre status message. The live region is always rendered so screen
 * readers announce each new message; `toast` is `{ message, key }` or null.
 */
export default function Toast({ toast }) {
  return (
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        <p key={toast.key} className={styles.toast}>
          <PiCheckCircleLight aria-hidden="true" className={styles.icon} />
          {toast.message}
        </p>
      )}
    </div>
  );
}
