"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Page-level GSAP effects, driven by data attributes so the sections can stay
 * server components:
 *   [data-hero-item]  staggered entrance on load (with banner text + sticker)
 *   [data-reveal]     fade/slide up once when scrolled into view
 *   [data-parallax]   banner photo drifts against the scroll
 *   [data-sticker]    stickers rotate slightly with the scroll
 * Everything is skipped when the user prefers reduced motion.
 */
export default function ScrollEffects() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Hero entrance
      const heroItems = gsap.utils.toArray("[data-hero-item]");
      if (heroItems.length) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(heroItems, { autoAlpha: 0, y: 40, duration: 0.9, stagger: 0.12 })
          .from(
            "[data-hero-item] [data-banner-content] > *",
            { autoAlpha: 0, y: 24, duration: 0.7, stagger: 0.07 },
            "-=0.55",
          )
          .from(
            "[data-hero-item] [data-sticker] img",
            { autoAlpha: 0, scale: 0.5, rotate: -30, duration: 0.9, ease: "back.out(1.6)" },
            "-=0.7",
          );
      }

      // Section reveals
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 50 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out", overwrite: true }),
      });

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
    });

    return () => mm.revert();
  });

  return null;
}
