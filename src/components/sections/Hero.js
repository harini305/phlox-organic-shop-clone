import CategoryMenu from "@/components/ui/CategoryMenu";
import PromoBanner from "@/components/ui/PromoBanner";
import { heroBanners } from "@/data/promotions";
import styles from "./Hero.module.css";

/** Category sidebar + "Mega Sale" banner + tall "Fresh Fruit" banner. */
export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="visually-hidden">
        Organic Shop — fresh organic fruit, vegetables and groceries
      </h1>

      <div className={`container ${styles.grid}`}>
        <nav className={styles.sidebar} aria-label="Product categories" data-hero-item>
          <CategoryMenu />
        </nav>

        <PromoBanner
          {...heroBanners.main}
          size="lg"
          contentPosition="end"
          valign="start"
          priority
          className={styles.main}
          data-hero-item
        />

        <PromoBanner
          {...heroBanners.side}
          valign="end"
          className={styles.side}
          data-hero-item
        />
      </div>
    </section>
  );
}
