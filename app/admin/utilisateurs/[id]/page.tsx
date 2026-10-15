import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { getAdminUser } from "@/lib/admin-queries";
import {
  AdminDossierList,
  formatAdminDate,
} from "@/components/admin/admin-lists";
import {
  AdminPageHeader,
  AdminSection,
  adminCardClassName,
} from "@/components/admin/admin-ui";

export const metadata: Metadata = {
  title: "Utilisateur | Administration MedProcedure",
};

interface AdminUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserPage({ params }: AdminUserPageProps) {
  await requireAdmin();
  const { id } = await params;
  const user = await getAdminUser(id);

  if (!user) {
    notFound();
  }

  const completedCount = user.dossiers.filter(
    (dossier) => dossier.status === "COMPLETED",
  ).length;

  const details = [
    { label: "Adresse e-mail", value: user.email },
    { label: "Inscription", value: formatAdminDate(user.createdAt) },
    {
      label: "Conditions générales",
      value: user.termsAcceptedAt
        ? `Acceptées le ${formatAdminDate(user.termsAcceptedAt)}`
        : "Non acceptées",
    },
    {
      label: "Dossiers",
      value: `${user.dossiers.length} ouvert${user.dossiers.length > 1 ? "s" : ""}, ${completedCount} terminé${completedCount > 1 ? "s" : ""}`,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={user.name ?? user.email}
        eyebrow="Utilisateur"
        backHref="/admin/utilisateurs"
        backLabel="Retour aux utilisateurs"
      />

      <dl className={`${adminCardClassName} grid gap-4 sm:grid-cols-2`}>
        {details.map((detail) => (
          <div key={detail.label} className="space-y-0.5">
            <dt className="text-xs font-medium text-text-muted">
              {detail.label}
            </dt>
            <dd className="font-semibold break-all">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <AdminSection
        title="Dossiers"
        description="Du plus récemment modifié au plus ancien."
      >
        <AdminDossierList dossiers={user.dossiers} showUser={false} />
      </AdminSection>
    </div>
  );
}
