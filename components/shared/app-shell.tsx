import React from "react";
import Link from "next/link";
import { SiteHeader } from "./site-header";

interface AppShellProps {
  children: React.ReactNode;
  showAdmin?: boolean;
  // Pages de l'administration : en-tête et navigation dédiés
  isAdminMode?: boolean;
}

const adminNavigation = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/utilisateurs", label: "Utilisateurs" },
  { href: "/admin/dossiers", label: "Dossiers" },
  { href: "/admin#procedures", label: "Procédures" },
  { href: "/admin#opportunites", label: "Opportunités" },
  { href: "/editor", label: "Voir le site" },
];

// Cadre de l'espace connecté : en-tête, et navigation en pastilles dans
// l'administration
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

      {isAdminMode && (
        <nav
          aria-label="Administration"
          className="border-b border-border-default bg-bg-surface"
        >
          <div className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-3 sm:px-8">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 rounded-full border border-border-default px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:border-accent-primary hover:text-accent-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
