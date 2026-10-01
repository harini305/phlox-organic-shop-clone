import { notFound } from "next/navigation";
import ProductGallery from "@/components/sections/product/ProductGallery";
import ProductSummary from "@/components/sections/product/ProductSummary";
import ProductTabs from "@/components/sections/product/ProductTabs";
import CartProductCard from "@/components/ui/CartProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProduct, getProductDetails, getRelatedProducts, isOnSale, products } from "@/data/products";
import { getReviews } from "@/data/reviews";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return {};
  const { summary } = getProductDetails(product);
  return {
    title: product.name,
    description: summary,
    openGraph: { title: product.name, description: summary, images: [product.image] },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const details = getProductDetails(product);
  const reviews = getReviews(product.id);
  const related = getRelatedProducts(product);

  return (
    <>
      <section className={styles.top}>
        <div className="container">
          <div className={styles.columns}>
            <ProductGallery product={product} onSale={isOnSale(product)} />
            <ProductSummary product={product} summary={details.summary} reviewCount={reviews.length} />
          </div>
          <ProductTabs product={product} details={details} initialReviews={reviews} />
        </div>
      </section>

      {related.length > 0 && (
        <section className={styles.related} aria-labelledby="related-heading">
          <div className="container">
            <SectionHeading
              eyebrow="From Our Shop"
              title="Related Products"
              id="related-heading"
              className={styles.relatedHeading}
              data-reveal
            />
            <ul className={styles.relatedGrid} data-reveal>
              {related.map((p) => (
                <li key={p.id}>
                  <CartProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
