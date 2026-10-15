import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { dossierStatusLabels, formatDossierDate } from "@/lib/dossiers";
import type { AdminDossier, AdminUserSummary } from "@/lib/admin-queries";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Europe/Paris",
});

export function formatAdminDate(date: Date) {
  return dateFormatter.format(date);
}

function StatusBadge({ status }: { status: AdminDossier["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-semibold",
        status === "COMPLETED"
          ? "bg-state-success/10 text-state-success"
          : status === "IN_PROGRESS"
            ? "bg-accent-soft text-accent-primary"
            : "bg-bg-subtle text-text-muted",
      )}
    >
      {dossierStatusLabels[status]}
    </span>
  );
}

export function AdminEmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border-default p-4 text-sm text-text-muted">
      {children}
    </p>
  );
}

interface AdminDossierListProps {
  dossiers: AdminDossier[];
  // Masqué sur la fiche d'un utilisateur, où il est déjà connu
  showUser?: boolean;
}

export function AdminDossierList({
  dossiers,
  showUser = true,
}: AdminDossierListProps) {
  if (dossiers.length === 0) {
    return <AdminEmptyState>Aucun dossier.</AdminEmptyState>;
  }

  return (
    <ul className="space-y-2">
      {dossiers.map((dossier) => (
        <li
          key={dossier.id}
          className="space-y-3 rounded-xl border border-border-default bg-bg-base p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 space-y-0.5">
              <p className="text-xs font-medium text-text-muted">
                {dossier.procedureTitle} · {dossier.procedureCountry}
              </p>
              <p className="font-semibold">{dossier.label}</p>
            </div>
            <StatusBadge status={dossier.status} />
          </div>

          {showUser && (
            <Link
              href={`/admin/utilisateurs/${dossier.user.id}`}
              className="flex w-fit flex-col text-sm font-medium text-accent-secondary hover:underline sm:flex-row sm:items-baseline sm:gap-1.5"
            >
              {dossier.user.name ?? dossier.user.email}
              {dossier.user.name && (
                <span className="font-normal text-text-muted">
                  {dossier.user.email}
                </span>
              )}
            </Link>
          )}

          <div className="space-y-1.5">
            <Progress
              value={dossier.done}
              max={dossier.total || 1}
              aria-label={`Avancement : ${dossier.done} étapes sur ${dossier.total}`}
              className="h-2 rounded-full border-0 bg-bg-subtle"
              indicatorClassName={cn(
                "rounded-full",
                dossier.status === "COMPLETED" && "bg-state-success",
              )}
            />
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
              <span className="font-medium">
                {dossier.done} sur {dossier.total} étapes
              </span>
              <span>Ouvert le {formatAdminDate(dossier.createdAt)}</span>
              <span>Mis à jour le {formatAdminDate(dossier.updatedAt)}</span>
              {dossier.targetDate && (
                <span>Échéance : {formatDossierDate(dossier.targetDate)}</span>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AdminUserList({ users }: { users: AdminUserSummary[] }) {
  if (users.length === 0) {
    return <AdminEmptyState>Aucun utilisateur pour le moment.</AdminEmptyState>;
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li key={user.id}>
          <Link
            href={`/admin/utilisateurs/${user.id}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border-default bg-bg-base p-4 transition-all hover:border-accent-primary/40 hover:bg-bg-surface hover:shadow-md"
          >
            <span className="min-w-0 space-y-1">
              <span className="block truncate font-semibold">
                {user.name ?? "Sans nom"}
              </span>
              <span className="block truncate text-sm text-text-muted">
                {user.email}
              </span>
              <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
                <span>Inscrit le {formatAdminDate(user.createdAt)}</span>
                <span className="font-medium">
                  {user.dossierCount} dossier{user.dossierCount > 1 ? "s" : ""}
                  {user.completedCount > 0 &&
                    ` · ${user.completedCount} terminé${user.completedCount > 1 ? "s" : ""}`}
                </span>
                {!user.termsAcceptedAt && (
                  <span className="font-semibold text-state-warning">
                    Conditions non acceptées
                  </span>
                )}
              </span>
            </span>
            <ArrowRight
              aria-hidden
              className="h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-primary"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
