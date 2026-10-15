import type { Metadata } from "next";
import { AppShell } from "@/components/shared/app-shell";
import { requireAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Administration | MedProcedure",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <AppShell isAdminMode>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
        {children}
      </main>
    </AppShell>
  );
}
