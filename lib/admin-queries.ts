import type { Prisma, ProcedureStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getDossierLabel, getDossierState } from "@/lib/dossiers";

// Requêtes de lecture de l'administration. Chaque page appelle requireAdmin()
// avant de les utiliser.

export type DossierStatusFilter =
  | "tous"
  | "non-commences"
  | "en-cours"
  | "termines";

const filterStates: Record<
  Exclude<DossierStatusFilter, "tous">,
  ProcedureStatus
> = {
  "non-commences": "NOT_STARTED",
  "en-cours": "IN_PROGRESS",
  termines: "COMPLETED",
};

export function parseDossierStatusFilter(value: unknown): DossierStatusFilter {
  return typeof value === "string" && Object.hasOwn(filterStates, value)
    ? (value as DossierStatusFilter)
    : "tous";
}

const dossierInclude = {
  user: { select: { id: true, name: true, email: true } },
  procedure: {
    select: {
      title: true,
      slug: true,
      country: true,
      steps: { select: { id: true } },
    },
  },
} satisfies Prisma.UserProcedureProgressInclude;

type DossierRow = Prisma.UserProcedureProgressGetPayload<{
  include: typeof dossierInclude;
}>;

export interface AdminDossier {
  id: string;
  label: string;
  procedureTitle: string;
  procedureCountry: string;
  user: { id: string; name: string | null; email: string };
  // État calculé à partir des étapes cochées, comme sur le tableau de bord
  status: ProcedureStatus;
  done: number;
  total: number;
  targetDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

function toAdminDossier(row: DossierRow): AdminDossier {
  const completed = new Set(row.completedStepIds);
  const total = row.procedure.steps.length;
  const done = row.procedure.steps.filter((step) =>
    completed.has(step.id),
  ).length;

  return {
    id: row.id,
    label: getDossierLabel(row.label, row.procedure.title),
    procedureTitle: row.procedure.title,
    procedureCountry: row.procedure.country,
    user: row.user,
    status: getDossierState({ done, total, status: row.status }),
    done,
    total,
    targetDate: row.targetDate,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function getAdminDossiers(filter: DossierStatusFilter) {
  // L'état dépend des étapes cochées : on charge tout et on filtre ici
  const rows = await prisma.userProcedureProgress.findMany({
    include: dossierInclude,
    orderBy: { updatedAt: "desc" },
  });
  const all = rows.map(toAdminDossier);
  const countOf = (state: ProcedureStatus) =>
    all.filter((dossier) => dossier.status === state).length;

  return {
    dossiers:
      filter === "tous"
        ? all
        : all.filter((dossier) => dossier.status === filterStates[filter]),
    counts: {
      tous: all.length,
      "non-commences": countOf("NOT_STARTED"),
      "en-cours": countOf("IN_PROGRESS"),
      termines: countOf("COMPLETED"),
    } satisfies Record<DossierStatusFilter, number>,
  };
}

export interface AdminUserSummary {
  id: string;
  name: string | null;
  email: string;
  createdAt: Date;
  termsAcceptedAt: Date | null;
  dossierCount: number;
  completedCount: number;
}

export async function getAdminUsers(): Promise<AdminUserSummary[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { progress: { include: dossierInclude } },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    termsAcceptedAt: user.termsAcceptedAt,
    dossierCount: user.progress.length,
    completedCount: user.progress
      .map(toAdminDossier)
      .filter((dossier) => dossier.status === "COMPLETED").length,
  }));
}

export async function getAdminUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      progress: { include: dossierInclude, orderBy: { updatedAt: "desc" } },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    termsAcceptedAt: user.termsAcceptedAt,
    termsVersion: user.termsVersion,
    dossiers: user.progress.map(toAdminDossier),
  };
}
