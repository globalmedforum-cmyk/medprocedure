"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcedureCarouselProps {
  count: number;
  children: React.ReactNode;
}

const AUTOPLAY_DELAY = 4500;

// Sur téléphone, la liste des procédures est un carrousel horizontal : ce
// composant le fait défiler tout seul, avec des points de navigation et un
// bouton pause. Sur ordinateur, la liste n'est pas défilante et rien ne bouge.
export function ProcedureCarousel({ count, children }: ProcedureCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToCard = useCallback((index: number) => {
    const list = wrapperRef.current?.querySelector("ol");
    const card = list?.children[index] as HTMLElement | undefined;
    if (!list || !card) return;
    list.scrollTo({
      left: card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
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
    };

    // Un geste de l'utilisateur met le défilement automatique en pause
    const onUserInteraction = () => setIsPlaying(false);

    list.addEventListener("scroll", onScroll, { passive: true });
    list.addEventListener("touchstart", onUserInteraction, { passive: true });
    list.addEventListener("wheel", onUserInteraction, { passive: true });
    return () => {
      list.removeEventListener("scroll", onScroll);
      list.removeEventListener("touchstart", onUserInteraction);
      list.removeEventListener("wheel", onUserInteraction);
    };
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
                setIsPlaying(false);
                scrollToCard(index);
              }}
              aria-label={`Afficher la procédure ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className="flex h-6 cursor-pointer items-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
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
