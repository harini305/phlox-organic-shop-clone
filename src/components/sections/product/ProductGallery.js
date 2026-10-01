"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiMagnifyingGlassPlusLight, PiXLight } from "react-icons/pi";
import Badge from "@/components/ui/Badge";
import styles from "./ProductGallery.module.css";

/** Product photo card with a sale badge and a zoom button that opens a lightbox. */
export default function ProductGallery({ product, onSale }) {
  const [zoomed, setZoomed] = useState(false);
  const zoomButtonRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!zoomed) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const zoomButton = zoomButtonRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") setZoomed(false);
      if (e.key === "Tab") {
        e.preventDefault(); // only one control inside the dialog
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      zoomButton?.focus();
    };
  }, [zoomed]);

  return (
    <div className={styles.gallery} data-reveal>
      <div className={styles.frame}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 580px"
          className={styles.image}
        />
        {onSale && (
          <Badge variant="sale" className={styles.badge}>
            Sale!
          </Badge>
        )}
        <button
          ref={zoomButtonRef}
          type="button"
          className={styles.zoom}
          onClick={() => setZoomed(true)}
          aria-label={`Enlarge image of ${product.name}`}
        >
          <PiMagnifyingGlassPlusLight aria-hidden="true" />
        </button>
      </div>

      {zoomed && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image`}
          onClick={() => setZoomed(false)}
        >
          <button ref={closeRef} type="button" className={styles.close} aria-label="Close image">
            <PiXLight aria-hidden="true" />
          </button>
          <div className={styles.lightboxImage} onClick={(e) => e.stopPropagation()}>
            <Image src={product.image} alt={product.name} fill sizes="90vw" className={styles.image} />
          </div>
        </div>
      )}
    </div>
  );
}
