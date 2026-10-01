import ProductCarousel from "@/components/ui/ProductCarousel";
import { getCollection, products } from "@/data/products";
import styles from "./ProductSection.module.css";

// The reference carousel keeps scrolling past the hand-picked six, so the
// featured picks lead and the rest of the catalogue follows.
function getFeaturedProducts() {
  const featured = getCollection("featured");
  const ids = new Set(featured.map((p) => p.id));
  return [...featured, ...products.filter((p) => !ids.has(p.id))];
}

export default function FeaturedProducts() {
  return (
    <section className={`${styles.section} ${styles.featured}`} aria-labelledby="featured-products-heading">
      <div className="container">
        <ProductCarousel
          eyebrow="From Our Shop"
          title="Featured Products"
          headingId="featured-products-heading"
          layout="compact"
          products={getFeaturedProducts()}
        />
      </div>
    </section>
  );
}
