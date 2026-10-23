import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProcedureCarousel } from "@/components/shared/procedure-carousel";
import type { LandingProcedure } from "@/lib/landing";

interface ProcedureCardsProps {
  procedures: LandingProcedure[];
}

// Nombre d'étapes montrées en aperçu sur chaque carte
const PREVIEW_STEPS = 3;

// Cartes des procédures : carrousel sur téléphone, grille sur ordinateur.
// Chaque carte donne le pays, le titre, l'objet de la procédure et un aperçu
// de ses premières étapes.
export function ProcedureCards({ procedures }: ProcedureCardsProps) {
  return (
    <ProcedureCarousel count={procedures.length}>
      <ol
        aria-label="Procédures"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pt-1 pb-4 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:p-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
      >
        {procedures.map((procedure, index) => {
          const preview = procedure.steps.slice(0, PREVIEW_STEPS);
          const remaining = procedure.steps.length - preview.length;

          return (
            <li
              key={procedure.id}
              className="w-[85%] shrink-0 snap-center sm:w-[60%] md:w-auto"
            >
              <Link
                href={`/procedures/${procedure.slug}`}
                className="group relative flex h-full flex-col rounded-2xl border border-border-default bg-bg-surface p-6 shadow-[0_1px_2px_rgb(18_23_42/0.04)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-[0_18px_40px_-18px_rgb(18_23_42/0.25)] active:scale-[0.99]"
              >
                {/* Filet supérieur qui s'allume au survol */}
                <span
                  aria-hidden
                  className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-gradient-to-r from-accent-primary to-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />

                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-primary">
                    {procedure.country}
                  </span>
                  <span className="font-mono text-xs text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-xl leading-snug font-bold tracking-tight">
                  {procedure.title}
                </h3>
                <p className="mt-1 text-sm text-text-muted">
                  {procedure.category}
                </p>

                <ol className="mt-5 space-y-2.5 border-t border-border-default pt-5">
                  {preview.map((step) => (
                    <li
                      key={step.order}
                      className="flex items-start gap-3 text-sm leading-snug"
                    >
                      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bg-subtle font-mono text-[0.65rem] text-text-muted">
                        {step.order}
                      </span>
                      <span className="min-w-0">{step.title}</span>
                    </li>
                  ))}
                </ol>
                {remaining > 0 && (
                  <p className="mt-2.5 pl-8 text-sm text-text-muted">
                    + {remaining} étape{remaining > 1 ? "s" : ""}
                  </p>
                )}

                <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold text-accent-primary">
                  Ouvrir le guide
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </ProcedureCarousel>
  );
}
