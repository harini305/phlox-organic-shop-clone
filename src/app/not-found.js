import Button from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
};

// Shop, product, category and account links point at routes this front-end
// demo doesn't implement yet; they land here instead of a bare 404.
export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page isn’t part of the demo yet</h1>
        <p className={styles.text}>
          The storefront home page is fully built; shop, product and account pages are coming later.
        </p>
        <Button href="/" variant="primary" size="lg">
          Back to home
        </Button>
      </div>
    </section>
  );
}
