import AccountView from "@/components/sections/account/AccountView";
import PageShell from "@/components/ui/PageShell";

export const metadata = {
  title: "My account",
  robots: { index: false },
};

export default function MyAccountPage() {
  return (
    <PageShell title="My account">
      <AccountView />
    </PageShell>
  );
}
