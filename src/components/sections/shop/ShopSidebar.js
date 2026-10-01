"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { PiCheckBold, PiMagnifyingGlassLight } from "react-icons/pi";
import { categories, getCategoryHref } from "@/data/categories";
import { getProductsInCategory, products } from "@/data/products";
import { formatPrice } from "@/components/ui/Price";
import styles from "./ShopSidebar.module.css";

// Slider range: the catalogue's cheapest and dearest items, rounded outwards.
export const PRICE_BOUNDS = {
  min: Math.floor(Math.min(...products.map((p) => p.price))),
  max: Math.ceil(Math.max(...products.map((p) => p.price))),
};

const categoryCounts = categories
  .map((c) => ({ ...c, count: getProductsInCategory(c.slug).length }))
  .filter((c) => c.count > 0)
  .sort((a, b) => a.name.localeCompare(b.name));

/**
 * Shop filters card: product search, price range slider and category list.
 * Search and price apply on submit (like the reference's Search / Filter
 * buttons); categories are links to their listing pages.
 * Remounted (via `key`) whenever the applied filters change.
 */
export default function ShopSidebar({ params, activeCategory, onSearch, onPriceFilter, className = "" }) {
  const id = useId();
  const [term, setTerm] = useState(params.s);
  const [min, setMin] = useState(params.min);
  const [max, setMax] = useState(params.max);

  const span = PRICE_BOUNDS.max - PRICE_BOUNDS.min;
  const left = ((min - PRICE_BOUNDS.min) / span) * 100;
  const right = ((max - PRICE_BOUNDS.min) / span) * 100;

  return (
    <aside className={[styles.card, className].filter(Boolean).join(" ")} aria-label="Product filters">
      <section className={styles.block}>
        <h2 className={styles.heading}>Search</h2>
        <form
          role="search"
          className={styles.search}
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(term.trim());
          }}
        >
          <label htmlFor={`${id}-s`} className="visually-hidden">
            Search products
          </label>
          <input
            id={`${id}-s`}
            type="search"
            className={styles.input}
            placeholder="Search products..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            Search <PiMagnifyingGlassLight aria-hidden="true" />
          </button>
        </form>
      </section>

      <section className={styles.block}>
        <h2 className={styles.heading}>Filter By Price</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPriceFilter(min, max);
          }}
        >
          <p className={styles.priceLabels} aria-hidden="true">
            <span>{formatPrice(min).replace(".00", "")}</span>
            <span>{formatPrice(max).replace(".00", "")}</span>
          </p>
          <div className={styles.range} style={{ "--left": `${left}%`, "--right": `${right}%` }}>
            <label htmlFor={`${id}-min`} className="visually-hidden">
              Minimum price
            </label>
            <input
              id={`${id}-min`}
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={1}
              value={min}
              aria-valuetext={formatPrice(min)}
              onChange={(e) => setMin(Math.min(Number(e.target.value), max - 1))}
            />
            <label htmlFor={`${id}-max`} className="visually-hidden">
              Maximum price
            </label>
            <input
              id={`${id}-max`}
              type="range"
              min={PRICE_BOUNDS.min}
              max={PRICE_BOUNDS.max}
              step={1}
              value={max}
              aria-valuetext={formatPrice(max)}
              onChange={(e) => setMax(Math.max(Number(e.target.value), min + 1))}
            />
          </div>
          <button type="submit" className={styles.filterButton}>
            Filter
          </button>
        </form>
      </section>

      <section className={styles.block}>
        <h2 className={styles.heading}>Category</h2>
        <ul className={styles.categories}>
          {categoryCounts.map((c) => {
            const active = c.slug === activeCategory;
            return (
              <li key={c.slug}>
                <Link
                  href={active ? "/shop" : getCategoryHref(c.slug)}
                  className={`${styles.category} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className={styles.box} aria-hidden="true">
                    {active && <PiCheckBold />}
                  </span>
                  <span className={styles.categoryName}>{c.name}</span>
                  <span className={styles.categoryCount}>
                    ({c.count})<span className="visually-hidden"> products</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}
