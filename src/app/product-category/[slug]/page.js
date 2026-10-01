import { notFound } from "next/navigation";
import ShopCatalog from "@/components/sections/shop/ShopCatalog";
import { categories, getCategory } from "@/data/categories";
import { getProductsInCategory } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.filter((c) => getProductsInCategory(c.slug).length > 0).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `Shop organic ${category.name.toLowerCase()} — fresh from certified growers, delivered plastic-free.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <ShopCatalog
      products={getProductsInCategory(slug)}
      activeCategory={slug}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/shop" },
        { label: category.name, href: `/product-category/${slug}` },
      ]}
    />
  );
}
