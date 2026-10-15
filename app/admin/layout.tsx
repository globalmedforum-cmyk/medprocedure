import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/site-header";
import { requireAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Administration | MedProcedure",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showAdmin isAdminMode />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-12">
        <nav
          aria-label="Administration"
          className="mb-8 flex items-center gap-6 text-sm text-text-muted"
        >
          <Link
            href="/admin"
            className="underline underline-offset-4 hover:text-text-primary"
          >
            Administration
          </Link>
          <Link
            href="/editor"
            className="underline underline-offset-4 hover:text-text-primary"
          >
            Voir le site
          </Link>
        </nav>

        {children}
      </main>
    </div>
  );
}
