"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Page-level GSAP effects, driven by data attributes so the sections can stay
 * server components:
 *   [data-hero-item]  staggered entrance on load (with banner text + sticker)
 *   [data-reveal]     fade/slide up once when scrolled into view
 *   [data-parallax]   banner photo drifts against the scroll
 *   [data-sticker]    stickers rotate slightly with the scroll
 * Everything is skipped when the user prefers reduced motion. Mounted once in
 * the root layout and rebuilt on every route change.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Only opacity is animated (never `visibility`), so content waiting to be
      // revealed stays focusable and in the keyboard tab order.

      // Hero entrance
      const heroItems = gsap.utils.toArray("[data-hero-item]");
      if (heroItems.length) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(heroItems, { opacity: 0, y: 40, duration: 0.9, stagger: 0.12 })
          .from(
            "[data-hero-item] [data-banner-content] > *",
            { opacity: 0, y: 24, duration: 0.7, stagger: 0.07 },
            "-=0.55",
          )
          .from(
            "[data-hero-item] [data-sticker] img",
            { opacity: 0, scale: 0.5, rotate: -30, duration: 0.9, ease: "back.out(1.6)" },
            "-=0.7",
          );
      }

      // Section reveals
      const reveal = (targets, stagger = 0.12) =>
        gsap.to(targets, { opacity: 1, y: 0, duration: 0.9, stagger, ease: "power3.out", overwrite: true });
      gsap.set("[data-reveal]", { opacity: 0, y: 50 });
      ScrollTrigger.batch("[data-reveal]", { start: "top 90%", once: true, onEnter: (batch) => reveal(batch) });

      // Keyboard users can focus into a block before it scrolls into view: show it at once.
      const onFocusIn = (e) => {
        const block = e.target.closest?.("[data-reveal]");
        if (block && gsap.getProperty(block, "opacity") < 1) reveal(block, 0);
      };
      document.addEventListener("focusin", onFocusIn);

      // Banner parallax (the .bg layer is 120% tall, so ±6% stays inside the frame)
      gsap.utils.toArray("[data-parallax]").forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Sticker sway outside the hero
      gsap.utils.toArray("[data-sticker] img").forEach((img) => {
        if (img.closest("[data-hero-item]")) return;
        gsap.fromTo(
          img,
          { rotate: -10 },
          {
            rotate: 8,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });

      return () => document.removeEventListener("focusin", onFocusIn);
    });

    return () => mm.revert();
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
