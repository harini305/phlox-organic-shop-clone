import ShopCatalog from "@/components/sections/shop/ShopCatalog";
import { products } from "@/data/products";

export const metadata = {
  title: "Shop",
  description: "Browse fresh organic fruit, vegetables, sprouts and juices. Filter by price and category.",
};

export default function ShopPage() {
  return (
    <ShopCatalog
      products={products}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Products", href: "/shop" },
      ]}
    />
  );
}
