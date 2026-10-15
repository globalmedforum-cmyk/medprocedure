"use client";

import React, { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { applyThemeColor, THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

// Le thème est porté par la classe `dark` de <html>, posée avant l'affichage
// par le script de app/layout.tsx : on observe simplement cette classe.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const isDark = useSyncExternalStore(subscribe, isDarkTheme, () => false);

  const toggleTheme = () => {
    const nextIsDark = !isDarkTheme();
    document.documentElement.classList.toggle("dark", nextIsDark);
    applyThemeColor(nextIsDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light");
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour la page
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={cn(
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary",
        className
      )}
    >
      {isDark ? (
        <Sun aria-hidden className="h-5 w-5" />
      ) : (
        <Moon aria-hidden className="h-5 w-5" />
      )}
    </button>
  );
}
