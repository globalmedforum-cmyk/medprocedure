"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, ShieldCheck } from "lucide-react";

interface ProfileMenuProps {
  // Compte administrateur : le menu propose de changer de mode
  showAdmin: boolean;
  // Page de l'administration en cours d'affichage
  isAdminMode: boolean;
}

// Bulle de profil Clerk. Les éléments de menu personnalisés de Clerk doivent
// être rendus dans un composant client, sans enfant vide quand ils sont absents.
export function ProfileMenu({ showAdmin, isAdminMode }: ProfileMenuProps) {
  if (!showAdmin) {
    return <UserButton />;
  }

  return (
    <UserButton>
      <UserButton.MenuItems>
        {isAdminMode ? (
          <UserButton.Link
            label="Passer en mode utilisateur"
            labelIcon={<LayoutDashboard className="h-4 w-4" />}
            href="/editor"
          />
        ) : (
          <UserButton.Link
            label="Passer en mode administrateur"
            labelIcon={<ShieldCheck className="h-4 w-4" />}
            href="/admin"
          />
        )}
      </UserButton.MenuItems>
    </UserButton>
  );
}
