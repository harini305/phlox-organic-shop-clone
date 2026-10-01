import NewsletterForm from "./NewsletterForm";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.section} aria-labelledby="newsletter-heading">
      <div className={`container ${styles.inner}`} data-reveal>
        <p className={styles.eyebrow}>Get discount</p>
        <h2 id="newsletter-heading" className={styles.title}>
          Subscribe to our Newsletter
        </h2>
        <NewsletterForm />
      </div>
    </section>
  );
}
