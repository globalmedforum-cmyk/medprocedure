import React from "react";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen w-full bg-black text-foreground flex flex-col lg:grid lg:grid-cols-[480px_1fr] relative">
      {/* Left panel - Desktop */}
      <aside className="hidden lg:flex flex-col justify-between p-12 lg:p-16 border-r border-zinc-800/80 bg-black min-h-screen relative">
        <div className="my-auto space-y-10 max-w-sm">
          {/* Logo & Subtitle */}
          <div className="space-y-2">
            <h1 className="text-3xl font-serif tracking-tight text-white font-normal">
              medprocedure
            </h1>
            <p className="text-zinc-400 font-serif text-sm">
              Qualification et conformité médicale.
            </p>
          </div>

          {/* Feature Bullets */}
          <div className="space-y-4 text-xs tracking-wide text-zinc-300 font-sans">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold select-none">—</span>
              <span>Suivi pas à pas des démarches administratives et MEBEKO</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold select-none">—</span>
              <span>Checklist interactive et validation des critères</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold select-none">—</span>
              <span>Accès direct aux opportunités et postes hospitaliers</span>
            </div>
          </div>
        </div>

        {/* Bottom-left discreet brand avatar */}
        <div className="pt-8">
          <div className="h-8 w-8 rounded-full border border-zinc-800 bg-zinc-900/80 flex items-center justify-center text-xs font-serif text-zinc-300 font-medium select-none shadow-sm">
            M
          </div>
        </div>
      </aside>

      {/* Right panel - Centered Form */}
      <main className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-black min-h-screen">
        <div className="w-full max-w-md flex justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
