import React from "react";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col md:grid md:grid-cols-[380px_1fr] lg:grid-cols-[480px_1fr]">
      {/* Left panel - SaaS Description */}
      <aside className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-zinc-800/80 bg-black min-h-[260px] md:min-h-screen">
        <div className="my-auto space-y-8 max-w-sm">
          {/* Logo & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-3xl font-serif tracking-tight text-white font-normal">
              medprocedure
            </h1>
            <p className="text-zinc-400 font-serif text-sm">
              Plateforme de qualification et de conformité médicale.
            </p>
          </div>

          {/* Feature Bullets with Cyan Dashes */}
          <div className="space-y-4 text-xs sm:text-sm tracking-wide text-zinc-300 font-sans">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold select-none text-base">—</span>
              <span>Suivi pas à pas des démarches administratives et MEBEKO</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold select-none text-base">—</span>
              <span>Checklist interactive et validation des critères d&apos;exercice</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold select-none text-base">—</span>
              <span>Accès direct aux opportunités et postes hospitaliers en Europe</span>
            </div>
          </div>
        </div>

        {/* Bottom-left discreet brand badge */}
        <div className="pt-6 hidden md:block">
          <div className="h-8 w-8 rounded-full border border-zinc-800 bg-zinc-900/80 flex items-center justify-center text-xs font-serif text-zinc-300 font-bold select-none">
            M
          </div>
        </div>
      </aside>

      {/* Right panel - Centered Auth Form */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-black min-h-[500px] md:min-h-screen">
        <div className="w-full max-w-md flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
