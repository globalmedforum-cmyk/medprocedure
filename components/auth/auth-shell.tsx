import React from "react";
import { ShieldCheck, Zap, Building2 } from "lucide-react";
import { FlightMap } from "./flight-map";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-sans bg-black">
      {/* Left panel - 50% width with differentiated dark tone */}
      <aside className="flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16 bg-[#0c0e12] border-b lg:border-b-0 lg:border-r border-zinc-800/60 min-h-screen">
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-cyan-400 flex items-center justify-center text-black font-bold text-xs shadow-sm shadow-cyan-500/20 select-none">
            M
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            MedProcedure
          </span>
        </div>

        {/* Center Content */}
        <div className="my-8 lg:my-auto space-y-7 max-w-lg">
          {/* Flight Map Illustration: Africa to Europe */}
          <FlightMap />

          {/* Headline & Subtext */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-[1.2]">
              Votre parcours m&eacute;dical{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                en Europe
              </span>{" "}
              commence ici.
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              MedProcedure accompagne les m&eacute;decins, internes et professionnels
              de sant&eacute; dans toutes leurs d&eacute;marches d&apos;exercice et de
              mobilit&eacute; en Europe :{" "}
              <span className="text-zinc-200 font-medium">
                PhD, &Eacute;quivalence de dipl&ocirc;me, FFI, Stage d&apos;Observation,
                Poste Associ&eacute; et Congr&egrave;s M&eacute;dicaux
              </span>
              .
            </p>
          </div>

          {/* Feature List with Icon Badges */}
          <div className="space-y-4 pt-1">
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="h-7 w-7 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Proc&eacute;dures Officielles &amp; R&eacute;glement&eacute;es
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-normal">
                  PhD, &eacute;quivalences de dipl&ocirc;me et conformit&eacute; administrative.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="h-7 w-7 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Zap className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Accompagnement &Eacute;tape par &Eacute;tape
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-normal">
                  Checklists interactives, guide des d&eacute;marches et validation structur&eacute;e.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="h-7 w-7 rounded-lg bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Building2 className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white">
                  Mobilit&eacute; &amp; Opportunit&eacute;s M&eacute;dicales
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-normal">
                  FFI, stages d&apos;observation, postes associ&eacute;s et congr&egrave;s m&eacute;dicaux.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-xs text-zinc-600 font-normal pt-4">
          &copy; {new Date().getFullYear()} MedProcedure. Tous droits r&eacute;serv&eacute;s.
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
