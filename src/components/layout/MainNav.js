"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiListLight } from "react-icons/pi";
import CategoryMenu from "@/components/ui/CategoryMenu";
import SocialLinks from "@/components/ui/SocialLinks";
import { isCurrent, mainNav } from "@/data/site";
import MobileMenu from "./MobileMenu";
import styles from "./MainNav.module.css";

/**
 * White navigation card: "Shop by Category" dropdown, page links and social
 * icons. Becomes a fixed bar once the user scrolls past it. Below 1025px the
 * page links move into the <MobileMenu> drawer.
 */
export default function MainNav() {
  const pathname = usePathname();
  const sentinelRef = useRef(null);
  const categoryRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Stick the bar once its original position scrolls out of view.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Close the category dropdown on outside click / Escape.
  useEffect(() => {
    if (!categoriesOpen) return;
    const onPointer = (e) => {
      if (!categoryRef.current?.contains(e.target)) setCategoriesOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setCategoriesOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [categoriesOpen]);

  return (
    <div className={styles.zone}>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <div className={styles.slot}>
        <div className={`${styles.bar} ${stuck ? styles.stuck : ""}`}>
          <div className="container">
            <div className={styles.card}>
              <div className={styles.categories} ref={categoryRef}>
                <button
                  type="button"
                  className={styles.categoryButton}
                  aria-expanded={categoriesOpen}
                  aria-controls="nav-category-menu"
                  onClick={() => setCategoriesOpen((v) => !v)}
                >
                  Shop by Category
                </button>
                <div className={styles.dropdown} hidden={!categoriesOpen}>
                  <CategoryMenu id="nav-category-menu" onNavigate={() => setCategoriesOpen(false)} />
                </div>
              </div>

              <nav className={styles.nav} aria-label="Main">
                <ul className={styles.links}>
                  {mainNav.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className={styles.link}
                        aria-current={isCurrent(pathname, href) ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <SocialLinks className={styles.social} />

              <button
                ref={menuButtonRef}
                type="button"
                className={styles.menuButton}
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-menu"
                onClick={() => setDrawerOpen(true)}
              >
                <PiListLight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu id="mobile-menu" open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
