import CartProductCard from "@/components/ui/CartProductCard";
import PromoBanner from "@/components/ui/PromoBanner";
import SectionHeading from "@/components/ui/SectionHeading";
import { getCollection } from "@/data/products";
import { bestDealBanner } from "@/data/promotions";
import styles from "./BestDeals.module.css";

/** "Today's Best Deals": large Super Deal banner beside two highlighted products. */
export default function BestDeals() {
  return (
    <section className={styles.section} aria-labelledby="best-deals-heading">
      <div className="container">
        <SectionHeading
          eyebrow="100% Natural"
          title="Today’s Best Deals"
          id="best-deals-heading"
          className={styles.heading}
          data-reveal
        />

        <div className={styles.grid}>
          <PromoBanner {...bestDealBanner} valign="end" className={styles.banner} data-reveal />

          {getCollection("bestDeals").map((product) => (
            <div key={product.id} data-reveal>
              <CartProductCard product={product} size="lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
