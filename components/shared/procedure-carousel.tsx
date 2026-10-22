"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureCarouselProps {
  count: number;
  children: React.ReactNode;
}

const AUTOPLAY_DELAY = 4500;
// Après un glissement manuel ou un clic sur un point, le défilement
// automatique reprend après ce délai
const RESUME_DELAY = 8000;

// Sur téléphone, la liste des procédures est un carrousel horizontal : ce
// composant le fait défiler tout seul, avec des points de navigation et un
// bouton pause. Sur ordinateur, la liste n'est pas défilante et rien ne bouge.
export function ProcedureCarousel({ count, children }: ProcedureCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  // Défilement lancé par le carrousel lui-même (à ne pas prendre pour un geste)
  const programmaticUntilRef = useRef(0);
  const pausedUntilRef = useRef(0);
  const snapTimerRef = useRef<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToCard = useCallback((index: number) => {
    const list = wrapperRef.current?.querySelector("ol");
    const card = list?.children[index] as HTMLElement | undefined;
    if (!list || !card) return;
    // Garde jusqu'à la fin du défilement doux (prolongée par chaque événement)
    programmaticUntilRef.current = Date.now() + 1500;
    // Safari sur iPhone annule un défilement doux lancé par script quand
    // l'aimantation (scroll-snap) est active : on la coupe le temps du
    // déplacement, puis on la rétablit une fois la carte atteinte
    list.style.scrollSnapType = "none";
    list.scrollTo({
      left: card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
    window.clearTimeout(snapTimerRef.current);
    snapTimerRef.current = window.setTimeout(() => {
      list.style.scrollSnapType = "";
    }, 900);
  }, []);

  // Carte active d'après la position de défilement
  useEffect(() => {
    const list = wrapperRef.current?.querySelector("ol");
    if (!list) return;

    const onScroll = () => {
      const center = list.scrollLeft + list.clientWidth / 2;
      let nearest = 0;
      let best = Infinity;
      Array.from(list.children).forEach((child, index) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });
      activeRef.current = nearest;
      setActive(nearest);

      // Un glissement horizontal de l'utilisateur suspend le défilement
      // automatique quelques secondes. Un simple appui pour faire défiler la
      // page vers le bas ne déplace pas la liste et ne compte donc pas.
      if (Date.now() > programmaticUntilRef.current) {
        pausedUntilRef.current = Date.now() + RESUME_DELAY;
      } else {
        // Défilement automatique encore en cours (long retour au début)
        programmaticUntilRef.current = Date.now() + 300;
      }
    };

    list.addEventListener("scroll", onScroll, { passive: true });
    return () => list.removeEventListener("scroll", onScroll);
  }, []);

  // Ne défile que lorsque le carrousel est à l'écran
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || !isVisible) return;
    // Pas de défilement automatique si l'appareil demande moins de mouvement
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const list = wrapperRef.current?.querySelector("ol");
      // Sur ordinateur, la liste ne défile pas horizontalement
      if (!list || list.scrollWidth <= list.clientWidth + 1) return;
      if (Date.now() < pausedUntilRef.current) return;
      scrollToCard((activeRef.current + 1) % count);
    }, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isPlaying, isVisible, count, scrollToCard]);

  return (
    <div ref={wrapperRef}>
      {children}

      <div className="mt-2 flex items-center justify-center gap-3 md:hidden">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: count }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                scrollToCard(index);
                pausedUntilRef.current = Date.now() + RESUME_DELAY;
              }}
              aria-label={`Afficher la procédure ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className="flex h-6 cursor-pointer items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-300",
                  index === active
                    ? "w-6 bg-accent-primary"
                    : "w-1.5 bg-text-muted/30",
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={
            isPlaying
              ? "Mettre en pause le défilement automatique"
              : "Lancer le défilement automatique"
          }
          title={isPlaying ? "Pause" : "Lecture"}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border-default bg-bg-surface text-text-muted shadow-sm transition-colors hover:text-text-primary"
        >
          {isPlaying ? (
            <Pause aria-hidden className="h-4 w-4" />
          ) : (
            <Play aria-hidden className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
