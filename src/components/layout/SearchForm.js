"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { PiCaretDownBold, PiMagnifyingGlassLight } from "react-icons/pi";
import { categories } from "@/data/categories";
import { getProductHref, products } from "@/data/products";
import { formatPrice } from "@/components/ui/Price";
import styles from "./SearchForm.module.css";

const MAX_RESULTS = 6;

/**
 * Header product search: keyword + category filter. Results are matched
 * client-side against the local catalogue and shown in a dropdown panel.
 */
export default function SearchForm({ className = "" }) {
  const id = useId();
  const formRef = useRef(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);

  const term = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!term && !category) return [];
    return products
      .filter((p) => !category || p.categories.includes(category))
      .filter((p) => !term || p.name.toLowerCase().includes(term))
      .slice(0, MAX_RESULTS);
  }, [term, category]);

  const showPanel = open && (term.length > 0 || category !== "");

  // Close when focus or a click leaves the form; Escape closes too.
  useEffect(() => {
    if (!showPanel) return;
    const onPointer = (e) => {
      if (!formRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [showPanel]);

  return (
    <form
      ref={formRef}
      role="search"
      className={[styles.form, className].filter(Boolean).join(" ")}
      onSubmit={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <label htmlFor={`${id}-q`} className="visually-hidden">
        Search products
      </label>
      <input
        id={`${id}-q`}
        type="search"
        className={styles.input}
        placeholder="Search..."
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        aria-controls={`${id}-results`}
      />

      <div className={styles.selectWrap}>
        <label htmlFor={`${id}-cat`} className="visually-hidden">
          Category
        </label>
        <select
          id={`${id}-cat`}
          className={styles.select}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setOpen(true);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <PiCaretDownBold className={styles.caret} aria-hidden="true" />
      </div>

      <button type="submit" className={styles.submit} aria-label="Search">
        <PiMagnifyingGlassLight aria-hidden="true" />
      </button>

      <div id={`${id}-results`} className={styles.panel} hidden={!showPanel}>
        <p className={styles.count} aria-live="polite">
          {showPanel && (results.length ? `${results.length} matching products` : "No products found")}
        </p>
        {results.length > 0 && (
          <ul className={styles.results}>
            {results.map((p) => (
              <li key={p.id}>
                <Link href={getProductHref(p)} className={styles.result} onClick={() => setOpen(false)}>
                  <Image src={p.image} alt="" width={48} height={52} className={styles.thumb} />
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.price}>{formatPrice(p.price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
