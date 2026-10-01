import Link from "next/link";
import { getCategory, getCategoryHref } from "@/data/categories";
import { contactInfo, footerAbout, footerCategoryColumns, siteName } from "@/data/site";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import styles from "./Footer.module.css";

/** Deep-green site footer: brand blurb + socials, category links, contact details. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo variant="light" />
          <p className={styles.about}>{footerAbout}</p>
          <SocialLinks variant="boxed" className={styles.social} />
        </div>

        <nav className={styles.column} aria-labelledby="footer-category-heading">
          <h2 id="footer-category-heading" className={styles.heading}>
            Category
          </h2>
          <div className={styles.categoryColumns}>
            {footerCategoryColumns.map((column, i) => (
              <ul key={i} className={styles.list}>
                {column.map((slug) => (
                  <li key={slug}>
                    <Link href={getCategoryHref(slug)} className={styles.link}>
                      {getCategory(slug)?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.heading}>Contact</h2>
          <address className={styles.contact}>
            <a href={contactInfo.phoneHref} className={styles.link}>
              {contactInfo.phone}
            </a>
            <p>{contactInfo.address}</p>
            <a href={`mailto:${contactInfo.email}`} className={styles.link}>
              {contactInfo.email}
            </a>
          </address>
        </div>
      </div>

      <div className="container">
        <p className={styles.copyright}>
          © {year} {siteName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
