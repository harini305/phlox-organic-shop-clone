import CartView from "@/components/sections/cart/CartView";
import PageShell from "@/components/ui/PageShell";

export const metadata = {
  title: "Cart",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <PageShell title="Cart">
      <CartView />
    </PageShell>
  );
}
