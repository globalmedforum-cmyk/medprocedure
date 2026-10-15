import React from "react";
import Link from "next/link";
import {
  FolderOpen,
  LayoutDashboard,
  ListChecks,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "./site-header";

interface AppShellProps {
  children: React.ReactNode;
  showAdmin?: boolean;
}

const navigation = [
  { href: "/editor", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/editor#mes-dossiers", label: "Mes dossiers", icon: FolderOpen },
  { href: "/editor#procedures", label: "Procédures", icon: ListChecks },
  { href: "/conditions", label: "Conditions générales", icon: ScrollText },
];

// Cadre de l'espace connecté : en-tête, et barre latérale d'icônes sur ordinateur
export function AppShell({ children, showAdmin = false }: AppShellProps) {
  const items = showAdmin
    ? [
        ...navigation,
        { href: "/admin", label: "Administration", icon: ShieldCheck },
      ]
    : navigation;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader showAdmin={showAdmin} />

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

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
