import Image from "next/image";
import logo from "@/public/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  // Masque le nom sur téléphone quand l'en-tête manque de place
  hideNameOnPhone?: boolean;
}

export function Logo({ className, hideNameOnPhone = false }: LogoProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 font-heading text-lg font-bold tracking-tight text-text-primary",
        className,
      )}
    >
      <Image
        src={logo}
        alt={hideNameOnPhone ? "MedProcedure" : ""}
        priority
        // Logo blanc sur fond noir : inversé puis multiplié, il s'affiche en
        // noir sur le fond clair, sans carré autour
        className="h-11 w-auto invert mix-blend-multiply dark:invert-0 dark:mix-blend-screen"
      />
      <span className={cn(hideNameOnPhone && "hidden sm:inline")}>
        MedProcedure
      </span>
    </span>
  );
}
