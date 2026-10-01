"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { PiHandbagLight, PiXLight } from "react-icons/pi";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/components/ui/Price";
import styles from "./CartMenu.module.css";

/** Header basket button with a dropdown listing the items added in this session. */
export default function CartMenu() {
  const { items, count, total, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.iconWrap}>
          <PiHandbagLight aria-hidden="true" className={styles.icon} />
          <span className={styles.count} aria-hidden="true">
            {count}
          </span>
        </span>
        <span className={styles.text}>
          <span className={styles.label}>Shopping Basket</span>
          <span className={styles.total}>{formatPrice(total)}</span>
        </span>
        <span className="visually-hidden">
          , {count} {count === 1 ? "item" : "items"}
        </span>
      </button>

      <div id={panelId} className={styles.panel} hidden={!open}>
        <div className={styles.panelHead}>
          <p className={styles.panelTitle}>Shopping Basket</p>
          <button type="button" className={styles.close} aria-label="Close basket" onClick={() => setOpen(false)}>
            <PiXLight aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <Image src="/images/icons/empty-cart.svg" alt="" width={90} height={90} unoptimized />
            <p>Cart is empty</p>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <Image src={item.image} alt="" width={60} height={65} className={styles.thumb} />
                  <div className={styles.itemText}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemMeta}>
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.remove}
                    aria-label={`Remove ${item.name} from basket`}
                    onClick={() => removeItem(item)}
                  >
                    <PiXLight aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <p className={styles.subtotal}>
              <span>Subtotal</span>
              <strong>{formatPrice(total)}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
