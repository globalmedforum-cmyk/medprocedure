import Link from "next/link";
import { Logo } from "./logo";
import { ProfileMenu } from "./profile-menu";
import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  // Compte administrateur : le menu du profil propose de changer de mode
  showAdmin?: boolean;
  // Page de l'administration en cours d'affichage
  isAdminMode?: boolean;
}

export function SiteHeader({
  showAdmin = false,
  isAdminMode = false,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border-default/70 bg-bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={isAdminMode ? "/admin" : "/editor"}
          aria-label={
            isAdminMode
              ? "MedProcedure, administration"
              : "MedProcedure, tableau de bord"
          }
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          {isAdminMode && (
            <span className="hidden rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-primary sm:inline">
              Mode administrateur
            </span>
          )}
          <ThemeToggle />
          <ProfileMenu showAdmin={showAdmin} isAdminMode={isAdminMode} />
        </div>
      </div>
    </header>
  );
}
