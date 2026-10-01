"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { PiUserLight, PiXLight } from "react-icons/pi";
import CategoryMenu from "@/components/ui/CategoryMenu";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import { mainNav } from "@/data/site";
import styles from "./MobileMenu.module.css";

/**
 * Off-canvas navigation drawer for tablet and mobile. Modal while open:
 * focus moves inside, Tab is kept within the panel, Escape / the overlay /
 * any link closes it, and page scroll is locked.
 */
export default function MobileMenu({ id, open, onClose }) {
  const pathname = usePathname();
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll('a[href], button:not([disabled]), input, select');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div className={`${styles.root} ${open ? styles.open : ""}`} inert={!open}>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <div
        id={id}
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.head}>
          <Logo />
          <button ref={closeRef} type="button" className={styles.close} aria-label="Close menu" onClick={onClose}>
            <PiXLight aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className={styles.links}>
            {mainNav.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={styles.link}
                  aria-current={pathname === href ? "page" : undefined}
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/my-account" className={styles.link} onClick={onClose}>
                Login <PiUserLight aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </nav>

        <h2 className={styles.heading}>Shop by Category</h2>
        <CategoryMenu variant="plain" onNavigate={onClose} />

        <SocialLinks variant="boxed" className={styles.social} />
      </div>
    </div>
  );
}
