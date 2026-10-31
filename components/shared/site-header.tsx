import Link from "next/link";
import { AccompanimentLink } from "./accompaniment-link";
import { FloatingHeader } from "./floating-header";
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
    <FloatingHeader>
      <div className="flex h-14 w-full items-center justify-between gap-4 px-3 sm:px-5">
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
          <Link
            href="/offres"
            className="hidden h-10 items-center rounded-lg px-3 text-sm font-semibold text-accent-primary hover:bg-accent-soft sm:inline-flex"
          >
            Nos offres
          </Link>
          <AccompanimentLink />
          <ThemeToggle />
          <ProfileMenu showAdmin={showAdmin} isAdminMode={isAdminMode} />
        </div>
      </div>
    </FloatingHeader>
  );
}
