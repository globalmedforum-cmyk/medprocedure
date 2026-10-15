import React from "react";
import Link from "next/link";
import { SiteHeader } from "./site-header";

interface AppShellProps {
  children: React.ReactNode;
  showAdmin?: boolean;
  // Pages de l'administration : en-tête dédié
  isAdminMode?: boolean;
}

// Cadre de l'espace connecté : l'en-tête, le contenu de la page, puis un
// pied de page discret avec le lien vers les conditions générales
export function AppShell({
  children,
  showAdmin = false,
  isAdminMode = false,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        showAdmin={showAdmin || isAdminMode}
        isAdminMode={isAdminMode}
      />

      <div className="min-w-0 flex-1">{children}</div>

      <footer className="border-t border-border-default">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-text-muted sm:px-8">
          <span>&copy; {new Date().getFullYear()} MedProcedure</span>
          <Link
            href="/conditions"
            className="hover:text-text-primary hover:underline"
          >
            Conditions générales d&apos;utilisation
          </Link>
        </div>
      </footer>
    </div>
  );
}
