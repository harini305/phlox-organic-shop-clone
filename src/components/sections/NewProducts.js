import ProductCarousel from "@/components/ui/ProductCarousel";
import { getCollection } from "@/data/products";
import styles from "./ProductSection.module.css";

export default function NewProducts() {
  return (
    <section className={styles.section} aria-labelledby="new-products-heading">
      <div className="container">
        <ProductCarousel
          eyebrow="Recently Added Our Store"
          title="New Products"
          headingId="new-products-heading"
          products={getCollection("newProducts")}
        />
      </div>
    </section>
  );
}
