import { FaFacebookF, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import { socialLinks } from "@/data/site";
import styles from "./SocialLinks.module.css";

const icons = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  pinterest: FaPinterest,
  youtube: FaYoutube,
};

/**
 * Social profile icons.
 * variant: "plain" (green glyphs, header nav) | "boxed" (orange tiles, footer)
 */
export default function SocialLinks({ variant = "plain", className = "" }) {
  return (
    <ul className={[styles.list, styles[variant], className].filter(Boolean).join(" ")}>
      {socialLinks.map(({ id, label, href }) => {
        const Icon = icons[id];
        return (
          <li key={id}>
            <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
