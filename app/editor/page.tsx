import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import {
  GraduationCap,
  Award,
  Eye,
  Stethoscope,
  Briefcase,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";

// Mapping des icônes et styles selon la maquette fournie (Image 1)
const procedureMeta: Record<
  string,
  {
    icon: React.ElementType;
    badgeText: string;
    badgeClass: string;
    iconBgClass: string;
    iconColorClass: string;
  }
> = {
  "doctorat-phd": {
    icon: GraduationCap,
    badgeText: "Recherche & Santé",
    badgeClass: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60",
    iconBgClass: "bg-indigo-900/90 text-white dark:bg-indigo-950/80",
    iconColorClass: "text-indigo-100",
  },
  "mebeko-suisse": {
    icon: Award,
    badgeText: "Suisse / OFSP",
    badgeClass: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800/60",
    iconBgClass: "bg-indigo-900/90 text-white dark:bg-indigo-950/80",
    iconColorClass: "text-indigo-100",
  },
  "stage-observation": {
    icon: Eye,
    badgeText: "Immersion Hospitalière",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60",
    iconBgClass: "bg-indigo-900/90 text-white dark:bg-indigo-950/80",
    iconColorClass: "text-indigo-100",
  },
  "ffi-france": {
    icon: Stethoscope,
    badgeText: "Pratique Rémunérée",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60",
    iconBgClass: "bg-indigo-900/90 text-white dark:bg-indigo-950/80",
    iconColorClass: "text-indigo-100",
  },
  "stage-associe": {
    icon: Briefcase,
    badgeText: "Pratique Hospitalière",
    badgeClass: "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800/60",
    iconBgClass: "bg-indigo-900/90 text-white dark:bg-indigo-950/80",
    iconColorClass: "text-indigo-100",
  },
  "participation-congres": {
    icon: Calendar,
    badgeText: "Événements & Visas",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800/60",
    iconBgClass: "bg-indigo-900/90 text-white dark:bg-indigo-950/80",
    iconColorClass: "text-indigo-100",
  },
};

export default async function EditorPage() {
  const procedures = await prisma.procedure.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary">
      {/* Top Navbar */}
      <header className="h-16 border-b border-border-default px-6 sm:px-10 flex items-center justify-between bg-bg-surface shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-accent-primary flex items-center justify-center text-white font-bold text-sm shadow-xs">
            M
          </div>
          <div>
            <span className="font-heading font-semibold text-base tracking-tight text-text-primary">
              MedProcedure
            </span>
            <span className="text-xs text-text-muted hidden sm:inline ml-2">
              &bull; Catalogue des 6 procédures
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-10 space-y-8">
        <div className="space-y-2 text-center sm:text-left">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Choisissez votre parcours médical en Europe
          </h1>
          <p className="text-sm text-text-muted max-w-2xl">
            Accompagnement complet, étapes officielles, constitution du dossier et validation de vos démarches d&apos;exercice et de mobilité.
          </p>
        </div>

        {/* 6 Cards Grid (Faithfully matching Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedures.map((proc) => {
            const meta = procedureMeta[proc.slug] || {
              icon: Award,
              badgeText: proc.category,
              badgeClass: "bg-muted text-text-primary border-border-default",
              iconBgClass: "bg-indigo-900 text-white",
              iconColorClass: "text-white",
            };
            const Icon = meta.icon;

            return (
              <Card
                key={proc.id}
                className="rounded-3xl border border-border-default/80 bg-bg-surface shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 space-y-6"
              >
                <div className="space-y-4">
                  {/* Top row: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-xs ${meta.iconBgClass}`}
                    >
                      <Icon className={`h-6 w-6 ${meta.iconColorClass}`} />
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${meta.badgeClass}`}
                    >
                      {meta.badgeText}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-1">
                    <CardTitle className="text-lg font-bold text-text-primary tracking-tight">
                      {proc.title}
                    </CardTitle>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                      {proc.description}
                    </p>
                  </div>
                </div>

                {/* Action button */}
                <div>
                  <Link href={`/procedures/${proc.slug}`} className="block w-full">
                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-[#1e1b4b] hover:bg-[#2e2a72] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer shadow-xs"
                    >
                      <span>Consulter la procédure</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
