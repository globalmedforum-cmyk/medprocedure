import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import {
  getAdminDossiers,
  parseDossierStatusFilter,
  type DossierStatusFilter,
} from "@/lib/admin-queries";
import { AdminDossierList } from "@/components/admin/admin-lists";
import { AdminPageHeader, AdminSection } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dossiers | Administration MedProcedure",
};

const filters: { value: DossierStatusFilter; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "non-commences", label: "Non commencés" },
  { value: "en-cours", label: "En cours" },
  { value: "termines", label: "Terminés" },
];

const sectionTitles: Record<DossierStatusFilter, string> = {
  tous: "Tous les dossiers",
  "non-commences": "Dossiers non commencés",
  "en-cours": "Dossiers en cours",
  termines: "Procédures terminées",
};

interface AdminDossiersPageProps {
  searchParams: Promise<{ statut?: string }>;
}

export default async function AdminDossiersPage({
  searchParams,
}: AdminDossiersPageProps) {
  await requireAdmin();
  const { statut } = await searchParams;
  const filter = parseDossierStatusFilter(statut);
  const { dossiers, counts } = await getAdminDossiers(filter);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Dossiers" backHref="/admin" />

      <nav aria-label="Filtrer les dossiers" className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <Link
            key={item.value}
            href={
              item.value === "tous"
                ? "/admin/dossiers"
                : `/admin/dossiers?statut=${item.value}`
            }
            aria-current={item.value === filter ? "page" : undefined}
            className={cn(
              "flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
              item.value === filter
                ? "border-accent-primary bg-accent-soft text-accent-primary"
                : "border-border-default bg-bg-surface text-text-muted hover:text-text-primary",
            )}
          >
            {item.label}
            <span className="font-mono text-xs">{counts[item.value]}</span>
          </Link>
        ))}
      </nav>

      <AdminSection
        title={sectionTitles[filter]}
        description="Du plus récemment modifié au plus ancien."
      >
        <AdminDossierList dossiers={dossiers} />
      </AdminSection>
    </div>
  );
}
