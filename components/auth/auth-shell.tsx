import React from "react";

interface AuthShellProps {
  children: React.ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2 bg-background text-foreground">
      {/* Left panel - Large screens only */}
      <aside className="hidden lg:flex flex-col justify-between p-12 bg-card border-r border-border">
        <div>
          <span className="text-xl font-bold tracking-tight">medprocedure</span>
        </div>

        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Plateforme de qualification et de conformité médicale
            </h1>
            <p className="text-sm text-muted-foreground">
              Accompagnement étape par étape des praticiens dans leurs démarches administratives et professionnelles.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-muted-foreground list-disc list-inside">
            <li>Suivi clair et structuré des procédures réglementaires</li>
            <li>Validation progressive des étapes requises</li>
            <li>Accès aux opportunités médicales et hospitalières</li>
          </ul>
        </div>

        <div className="text-xs text-muted-foreground">
          medprocedure &copy; {new Date().getFullYear()}
        </div>
      </aside>

      {/* Right panel - Centered Clerk Form */}
      <main className="flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
