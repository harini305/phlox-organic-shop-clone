import ContactForm from "@/components/sections/contact/ContactForm";
import { storeLocation } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "Contact",
  description: "Questions about an order or our growers? Send us a message and we'll reply within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <div className={styles.map}>
        <iframe
          src={storeLocation.mapSrc}
          title={`Map showing our ${storeLocation.city} store`}
          loading="lazy"
          className={styles.mapFrame}
        />
      </div>

      <section className={styles.section}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.formCol} data-reveal>
            <p className={styles.eyebrow}>Please Get in Touch</p>
            <h1 className={styles.title}>Contact Us</h1>
            <ContactForm />
          </div>

          <address className={styles.location} data-reveal>
            <h2 className={styles.city}>{storeLocation.city}</h2>
            <span className={styles.divider} aria-hidden="true" />
            {storeLocation.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              Tel: <a href={storeLocation.phoneHref}>{storeLocation.phone}</a>
            </p>
          </address>
        </div>
      </section>
    </>
  );
}
