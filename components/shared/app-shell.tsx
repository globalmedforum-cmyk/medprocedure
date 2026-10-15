import React from "react";
import { SiteHeader } from "./site-header";

interface AppShellProps {
  children: React.ReactNode;
  showAdmin?: boolean;
  // Pages de l'administration : en-tête dédié
  isAdminMode?: boolean;
}

// Cadre de l'espace connecté : l'en-tête, puis le contenu de la page
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
    </div>
  );
}
