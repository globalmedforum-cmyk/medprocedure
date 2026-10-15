import { ProcedureStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getDossierLabel } from "@/lib/dossiers";

// Requêtes de lecture de l'administration. Chaque page appelle requireAdmin()
// avant de les utiliser.

export type DossierStatusFilter = "tous" | "en-cours" | "termines";

export function parseDossierStatusFilter(value: unknown): DossierStatusFilter {
  return value === "en-cours" || value === "termines" ? value : "tous";
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

  return {
    id: row.id,
    label: getDossierLabel(row.label, row.procedure.title),
    procedureTitle: row.procedure.title,
    procedureCountry: row.procedure.country,
    user: row.user,
    status: row.status,
    done: row.procedure.steps.filter((step) => completed.has(step.id)).length,
    total,
    targetDate: row.targetDate,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

function dossierWhere(
  filter: DossierStatusFilter,
): Prisma.UserProcedureProgressWhereInput {
  if (filter === "termines") return { status: ProcedureStatus.COMPLETED };
  if (filter === "en-cours")
    return { status: { not: ProcedureStatus.COMPLETED } };
  return {};
}

export async function getAdminDossiers(filter: DossierStatusFilter) {
  const [rows, counts] = await Promise.all([
    prisma.userProcedureProgress.findMany({
      where: dossierWhere(filter),
      include: dossierInclude,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.userProcedureProgress.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const completedCount =
    counts.find((c) => c.status === ProcedureStatus.COMPLETED)?._count._all ??
    0;
  const totalCount = counts.reduce((sum, c) => sum + c._count._all, 0);

  return {
    dossiers: rows.map(toAdminDossier),
    counts: {
      tous: totalCount,
      "en-cours": totalCount - completedCount,
      termines: completedCount,
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
    include: { progress: { select: { status: true } } },
  });

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    termsAcceptedAt: user.termsAcceptedAt,
    dossierCount: user.progress.length,
    completedCount: user.progress.filter(
      (p) => p.status === ProcedureStatus.COMPLETED,
    ).length,
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
