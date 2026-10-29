"use client";

import { useEffect, useState } from "react";
import { HeartHandshake } from "lucide-react";
import type { AccompanimentAccess } from "@/lib/accompaniment";

interface AccessInfo {
  access: AccompanimentAccess;
  url: string | null;
}

// Une seule demande par visite : la réponse est partagée entre les pages
let accessRequest: Promise<AccessInfo> | null = null;

function loadAccess() {
  accessRequest ??= fetch("/api/accompagnement", { cache: "no-store" })
    .then((response) =>
      response.ok ? (response.json() as Promise<AccessInfo>) : null,
    )
    .catch(() => null)
    .then((info) => info ?? { access: null, url: null });
  return accessRequest;
}

// Lien vers la plateforme de suivi, affiché seulement aux médecins qui ont
// payé un accompagnement (et à l'équipe). Chargé après l'affichage de la
// page : la vérification ne la ralentit pas.
export function AccompanimentLink() {
  const [info, setInfo] = useState<AccessInfo | null>(null);

  useEffect(() => {
    let active = true;
    loadAccess().then((result) => {
      if (active) setInfo(result);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!info?.access || !info.url) return null;

  const label =
    info.access === "team" ? "Suivi des clients" : "Mon accompagnement";

  return (
    <a
      href={info.url}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-soft px-3 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary hover:text-white"
    >
      <HeartHandshake className="size-4" aria-hidden />
      <span className="hidden sm:inline">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </a>
  );
}
