"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { PiCaretDownBold } from "react-icons/pi";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CartProductCard from "@/components/ui/CartProductCard";
import Pagination from "@/components/ui/Pagination";
import ShopSidebar, { PRICE_BOUNDS } from "./ShopSidebar";
import styles from "./ShopCatalog.module.css";

const PER_PAGE = 9;

export const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "rating", label: "Average rating" },
  { value: "latest", label: "Latest" },
  { value: "price", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function sortProducts(list, orderby) {
  const sorted = [...list];
  switch (orderby) {
    case "rating":
      return sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "latest":
      return sorted.reverse();
    case "price":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
}

function readParams(searchParams) {
  const num = (key, fallback) => {
    const n = parseFloat(searchParams?.get(key));
    return Number.isFinite(n) ? n : fallback;
  };
  return {
    s: searchParams?.get("s") ?? "",
    min: num("min", PRICE_BOUNDS.min),
    max: num("max", PRICE_BOUNDS.max),
    orderby: searchParams?.get("orderby") ?? "",
    page: Math.max(1, Math.floor(num("page", 1))),
  };
}

/**
 * Shop / category listing: sidebar filters, breadcrumb heading, sort menu,
 * 3-column product grid and pagination. Filters live in the URL query so
 * results are shareable. The static HTML shows the unfiltered first page.
 */
export default function ShopCatalog(props) {
  return (
    <Suspense fallback={<Catalog {...props} params={readParams(null)} />}>
      <CatalogWithParams {...props} />
    </Suspense>
  );
}

function CatalogWithParams(props) {
  const searchParams = useSearchParams();
  return <Catalog {...props} params={readParams(searchParams)} />;
}

function Catalog({ products, crumbs, activeCategory, params }) {
  const router = useRouter();
  const pathname = usePathname();

  const filtered = useMemo(() => {
    const term = params.s.trim().toLowerCase();
    const matches = products.filter(
      (p) =>
        (!term || p.name.toLowerCase().includes(term)) && p.price >= params.min && p.price <= params.max,
    );
    return sortProducts(matches, params.orderby);
  }, [products, params.s, params.min, params.max, params.orderby]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(params.page, pageCount);
  const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Merge changes into the query string; any filter change resets to page 1.
  function update(changes) {
    const next = new URLSearchParams();
    const merged = { ...params, page: 1, ...changes };
    if (merged.s) next.set("s", merged.s);
    if (merged.min !== PRICE_BOUNDS.min) next.set("min", String(merged.min));
    if (merged.max !== PRICE_BOUNDS.max) next.set("max", String(merged.max));
    if (merged.orderby) next.set("orderby", merged.orderby);
    if (merged.page > 1) next.set("page", String(merged.page));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const filtersActive = params.s || params.min !== PRICE_BOUNDS.min || params.max !== PRICE_BOUNDS.max;

  return (
    <div className={`container ${styles.layout}`}>
      <ShopSidebar
        key={`${params.s}|${params.min}|${params.max}`}
        params={params}
        activeCategory={activeCategory}
        onSearch={(s) => update({ s })}
        onPriceFilter={(min, max) => update({ min, max })}
        className={styles.sidebar}
      />

      <div className={styles.main}>
        <div className={styles.toolbar}>
          <Breadcrumbs items={crumbs} />
          <div className={styles.sort}>
            <label htmlFor="shop-orderby" className="visually-hidden">
              Sort products
            </label>
            <span className={styles.sortPrefix} aria-hidden="true">
              Sort by:
            </span>
            <select
              id="shop-orderby"
              className={styles.sortSelect}
              value={params.orderby}
              onChange={(e) => update({ orderby: e.target.value })}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <PiCaretDownBold className={styles.sortCaret} aria-hidden="true" />
          </div>
        </div>

        <p className={styles.count} aria-live="polite">
          {filtered.length === 0
            ? "No products were found matching your selection."
            : `Showing ${(page - 1) * PER_PAGE + 1}–${(page - 1) * PER_PAGE + visible.length} of ${filtered.length} results`}
          {filtersActive && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => update({ s: "", min: PRICE_BOUNDS.min, max: PRICE_BOUNDS.max })}
            >
              Clear filters
            </button>
          )}
        </p>

        {visible.length > 0 && (
          <ul className={styles.grid}>
            {visible.map((product) => (
              <li key={product.id}>
                <CartProductCard product={product} />
              </li>
            ))}
          </ul>
        )}

        <Pagination
          page={page}
          pageCount={pageCount}
          onChange={(n) => {
            update({ page: n });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={styles.pagination}
        />
      </div>
    </div>
  );
}
