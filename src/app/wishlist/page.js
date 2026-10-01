import WishlistView from "@/components/sections/wishlist/WishlistView";
import PageShell from "@/components/ui/PageShell";

export const metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <PageShell title="Wishlist">
      <WishlistView />
    </PageShell>
  );
}
