import LostPasswordForm from "@/components/sections/account/LostPasswordForm";
import PageShell from "@/components/ui/PageShell";

export const metadata = {
  title: "Lost password",
  robots: { index: false },
};

export default function LostPasswordPage() {
  return (
    <PageShell title="Lost password">
      <LostPasswordForm />
    </PageShell>
  );
}
