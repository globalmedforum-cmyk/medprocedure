import React from "react";
import { Sparkles, CheckSquare, Building2 } from "lucide-react";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-black">
      {/* Left panel - 50% width with differentiated dark tone */}
      <aside className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 xl:p-20 bg-[#0c0e12] border-b lg:border-b-0 lg:border-r border-zinc-800/60 min-h-screen">
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-cyan-400 flex items-center justify-center text-black font-bold text-xs shadow-sm shadow-cyan-500/20 select-none">
            M
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            medprocedure
          </span>
        </div>

        {/* Center Content */}
        <div className="my-12 lg:my-auto space-y-10 max-w-lg">
          {/* Headline & Subtext */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-white leading-tight">
              Qualification et conformité médicale simplifiées.
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Accompagnement étape par étape des praticiens dans leurs démarches administratives, MEBEKO et opportunités hospitalières.
            </p>
          </div>

          {/* Feature List with Icon Badges */}
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  Validation et conformité MEBEKO
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Suivi structuré des dossiers, équivalences et critères réglementaires.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <CheckSquare className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  Checklists interactives
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Progression claire, documents requis et validation en temps réel.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">
                  Accès direct aux opportunités
                </h3>
                <p className="text-xs text-zinc-400 leading-normal">
                  Postes hospitaliers, cliniques partenaires et stages qualifiants.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-xs text-zinc-600 font-normal">
          &copy; {new Date().getFullYear()} medprocedure. Tous droits r&eacute;serv&eacute;s.
        </div>
      </aside>

      {/* Right panel - 50% width on pure black background */}
      <main className="flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-black min-h-screen">
        <div className="w-full max-w-[420px] flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
