import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditorPage() {
  const procedures = await prisma.procedure.findMany({
    include: {
      steps: {
        select: { id: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary">
      {/* Editor Navbar */}
      <header className="h-14 border-b border-border-default px-6 flex items-center justify-between bg-bg-surface">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-accent-primary flex items-center justify-center text-white font-bold text-xs shadow-xs">
            M
          </div>
          <span className="font-heading font-semibold text-base tracking-tight text-text-primary">
            MedProcedure
          </span>
          <Badge variant="muted" className="text-xs font-mono ml-1">
            tableau de bord
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </header>

      {/* Editor Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Procédures Médicales Actives
          </h1>
          <p className="text-sm text-text-muted">
            Sélectionnez une procédure pour consulter les étapes chronologiques, valider votre progression et découvrir les opportunités hospitalières associées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {procedures.map((proc) => (
            <Link
              key={proc.id}
              href={`/procedures/${proc.slug}`}
              className="group block transition-transform duration-150 hover:-translate-y-1"
            >
              <Card className="h-full rounded-2xl border border-border-default bg-bg-surface hover:border-accent-primary/50 hover:shadow-md transition-all flex flex-col justify-between">
                <CardHeader className="p-5 pb-3 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="accent" className="text-xs">
                      {proc.country}
                    </Badge>
                    <span className="text-xs text-text-muted font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{proc.steps.length} étapes</span>
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-text-primary group-hover:text-accent-primary transition-colors leading-snug">
                    {proc.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-4">
                  <p className="text-xs text-text-muted line-clamp-3 leading-relaxed">
                    {proc.description}
                  </p>

                  <div className="pt-3 border-t border-border-default flex items-center justify-between text-xs font-semibold text-accent-primary">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Suivre la procédure</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
