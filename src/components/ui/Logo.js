import Image from "next/image";
import Link from "next/link";
import { siteName } from "@/data/site";
import styles from "./Logo.module.css";

/**
 * Brand logo linking home.
 * variant: "default" (green, header) | "light" (white, footer)
 */
export default function Logo({ variant = "default", priority = false, className = "" }) {
  const light = variant === "light";

  return (
    <Link href="/" className={[styles.logo, className].filter(Boolean).join(" ")} aria-label={`${siteName} home`}>
      <Image
        src={light ? "/images/brand/logo-footer.png" : "/images/brand/logo.png"}
        alt=""
        width={light ? 185 : 212}
        height={light ? 62 : 72}
        priority={priority}
        className={styles.image}
      />
    </Link>
  );
}
