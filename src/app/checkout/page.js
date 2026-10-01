import CheckoutView from "@/components/sections/checkout/CheckoutView";
import PageShell from "@/components/ui/PageShell";

export const metadata = {
  title: "Checkout",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <PageShell title="Checkout">
      <CheckoutView />
    </PageShell>
  );
}
