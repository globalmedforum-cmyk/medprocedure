"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingHeaderProps {
  children: React.ReactNode;
  className?: string;
}

// Barre de navigation détachée des bords. Opaque en haut de page, elle devient
// translucide (flou d'arrière-plan) et se resserre dès que la page défile.
export function FloatingHeader({ children, className }: FloatingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const offset =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      setScrolled(offset > 8);
    };
    update();
    // Capture : suit aussi un conteneur qui défile à la place de la fenêtre
    document.addEventListener("scroll", update, { capture: true, passive: true });
    return () =>
      document.removeEventListener("scroll", update, { capture: true });
  }, []);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-4">
      <div
        data-scrolled={scrolled}
        className={cn(
          "mx-auto w-full rounded-2xl border transition-all duration-300 ease-out motion-reduce:transition-none",
          scrolled
            ? "max-w-5xl border-border-default/40 bg-bg-surface/25 shadow-lg backdrop-blur-md backdrop-saturate-150"
            : "max-w-6xl border-border-default bg-bg-surface",
          className,
        )}
      >
        {children}
      </div>
    </header>
  );
}
