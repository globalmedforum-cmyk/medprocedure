import React from "react";
import Link from "next/link";
import {
  BriefcaseMedical,
  FolderOpen,
  LayoutDashboard,
  ListChecks,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "./site-header";

interface AppShellProps {
  children: React.ReactNode;
  showAdmin?: boolean;
  // Pages de l'administration : barre latérale et en-tête dédiés
  isAdminMode?: boolean;
}

interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const adminNavigation: NavigationItem[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin#procedures", label: "Procédures", icon: ListChecks },
  {
    href: "/admin#opportunites",
    label: "Opportunités",
    icon: BriefcaseMedical,
  },
  { href: "/editor", label: "Voir le site", icon: FolderOpen },
];

const navigation: NavigationItem[] = [
  { href: "/editor", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/editor#mes-dossiers", label: "Mes dossiers", icon: FolderOpen },
  { href: "/editor#procedures", label: "Procédures", icon: ListChecks },
  { href: "/conditions", label: "Conditions générales", icon: ScrollText },
];

// Cadre de l'espace connecté : en-tête, et barre latérale d'icônes sur ordinateur
export function AppShell({
  children,
  showAdmin = false,
  isAdminMode = false,
}: AppShellProps) {
  const items = isAdminMode
    ? adminNavigation
    : showAdmin
      ? [
          ...navigation,
          { href: "/admin", label: "Administration", icon: ShieldCheck },
        ]
      : navigation;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        showAdmin={showAdmin || isAdminMode}
        isAdminMode={isAdminMode}
      />

      <div className="flex flex-1">
        <nav
          aria-label="Espace personnel"
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[4.5rem] shrink-0 flex-col items-center gap-2 border-r border-border-default bg-bg-surface py-5 lg:flex"
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className="flex h-11 w-11 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-accent-soft hover:text-accent-primary"
              >
                <Icon aria-hidden className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="min-w-0 flex-1">
          {isAdminMode && (
            // Sur téléphone et tablette, la navigation passe en pastilles
            <nav
              aria-label="Administration"
              className="flex gap-2 overflow-x-auto border-b border-border-default bg-bg-surface px-4 py-3 lg:hidden"
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-full border border-border-default px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:border-accent-primary hover:text-accent-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
