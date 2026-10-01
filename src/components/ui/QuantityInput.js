"use client";

import styles from "./QuantityInput.module.css";

/**
 * − / number / + stepper. Controlled: `value` and `onChange(nextValue)`.
 * `label` names the field for screen readers (e.g. "Quantity of Strawberry").
 */
export default function QuantityInput({ value, onChange, min = 1, max = 99, label = "Quantity", id, className = "" }) {
  const clamp = (n) => Math.min(max, Math.max(min, n));

  return (
    <div className={[styles.stepper, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        −
      </button>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        className={styles.input}
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(e) => {
          const next = parseInt(e.target.value, 10);
          if (!Number.isNaN(next)) onChange(clamp(next));
        }}
      />
      <button
        type="button"
        className={styles.step}
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        +
      </button>
    </div>
  );
}
