import Image from "next/image";
import { certificationBadges } from "@/data/site";
import styles from "./CertificationBadges.module.css";

/** White card of certification stamps, overlapping the top of the green footer area. */
export default function CertificationBadges() {
  return (
    <section className={styles.section} aria-labelledby="certifications-heading">
      <h2 id="certifications-heading" className="visually-hidden">
        Our certifications
      </h2>
      <div className="container">
        <ul className={styles.card} data-reveal>
          {certificationBadges.map((badge) => (
            <li key={badge.src} className={styles.item}>
              <Image
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
