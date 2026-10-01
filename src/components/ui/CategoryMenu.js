import Link from "next/link";
import { GiMushroomGills } from "react-icons/gi";
import {
  PiBeerBottleLight,
  PiBowlFoodLight,
  PiBowlSteamLight,
  PiCallBellLight,
  PiCaretRightBold,
  PiCoffeeLight,
  PiFireLight,
  PiHamburgerLight,
  PiLeafLight,
  PiPintGlassLight,
} from "react-icons/pi";
import { categories, getCategoryHref } from "@/data/categories";
import styles from "./CategoryMenu.module.css";

// Line icon + colour per category, matching the reference's coloured glyphs.
const categoryIcons = {
  vegetables: { Icon: PiLeafLight, color: "#22c157" },
  fruits: { Icon: PiBowlFoodLight, color: "#fb7645" },
  meat: { Icon: PiHamburgerLight, color: "#ea9802" },
  "canned-organic": { Icon: PiCoffeeLight, color: "#107cce" },
  organic: { Icon: PiBeerBottleLight, color: "#a9d80b" },
  mushrooms: { Icon: GiMushroomGills, color: "#fc2c2c" },
  "organic-food": { Icon: PiCallBellLight, color: "#f2cf00" },
  "fresh-onion": { Icon: PiFireLight, color: "#0daa42" },
  oatmeal: { Icon: PiBowlSteamLight, color: "#ff4040" },
  "organic-juice": { Icon: PiPintGlassLight, color: "#ff7127" },
};

/**
 * Vertical category list with coloured icons and a "View All" link.
 * variant: "card" (hero sidebar / dropdown — white card) | "plain" (mobile drawer)
 * onNavigate: optional click handler (e.g. close the surrounding menu)
 */
export default function CategoryMenu({ variant = "card", onNavigate, id, className = "" }) {
  return (
    <ul id={id} className={[styles.menu, styles[variant], className].filter(Boolean).join(" ")}>
      {categories.map(({ slug, name }) => {
        const { Icon, color } = categoryIcons[slug] ?? {};
        return (
          <li key={slug} className={styles.item}>
            <Link href={getCategoryHref(slug)} className={styles.link} onClick={onNavigate}>
              {Icon && <Icon className={styles.icon} style={{ color }} aria-hidden="true" />}
              <span className={styles.label}>{name}</span>
              <PiCaretRightBold className={styles.caret} aria-hidden="true" />
            </Link>
          </li>
        );
      })}
      <li className={styles.viewAll}>
        <Link href="/shop" className={styles.viewAllLink} onClick={onNavigate}>
          View All <PiCaretRightBold aria-hidden="true" />
        </Link>
      </li>
    </ul>
  );
}
