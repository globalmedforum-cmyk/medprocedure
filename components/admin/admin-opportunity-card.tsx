import React from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import type { OpportunityCategory } from "@prisma/client";
import { deleteOpportunity } from "@/actions/admin";
import {
  getOpportunityReference,
  opportunityCategoryLabels,
} from "@/lib/opportunity-categories";
import { DeleteForm } from "./delete-form";

interface AdminOpportunityCardProps {
  id: string;
  category: OpportunityCategory;
  title: string;
  hospital: string;
  location: string;
  country: string;
  deadlineLabel: string;
  isExpired: boolean;
}

// Opportunité dans la liste de l'administration, avec ses actions
export function AdminOpportunityCard({
  id,
  category,
  title,
  hospital,
  location,
  country,
  deadlineLabel,
  isExpired,
}: AdminOpportunityCardProps) {
  return (
    <div className="relative rounded-xl border border-border-default bg-bg-base p-4 transition-[transform,background-color,border-color,color,box-shadow] hover:bg-bg-surface hover:shadow-md">
      <div className="grid gap-x-6 gap-y-1 sm:grid-cols-[8rem_minmax(0,1fr)_11rem_auto] sm:items-center">
        <span className="text-sm font-semibold text-accent-primary">
          {opportunityCategoryLabels[category]}
          <span className="block font-mono text-xs font-normal text-text-muted">
            Réf. {getOpportunityReference(id)}
          </span>
        </span>
        <span>
          <span className="block font-semibold">{title}</span>
          <span className="block text-sm text-text-muted">
            {hospital} · {location}, {country}
          </span>
        </span>
        <span className="min-h-10 pr-24 text-xs text-text-muted sm:min-h-0 sm:pr-0">
          {deadlineLabel}
          {isExpired && (
            <span className="mt-1 block w-fit rounded-full bg-state-error/10 px-2 py-0.5 font-semibold text-state-error">
              Expirée, masquée du site
            </span>
          )}
        </span>
        {/* Sur téléphone, les actions se placent en bas à droite, à côté de la date */}
        <div className="absolute right-3 bottom-3 flex items-center gap-1 sm:static">
          <Link
            href={`/admin/opportunities/${id}`}
            aria-label="Modifier"
            title="Modifier"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-bg-surface text-text-primary transition-colors hover:bg-bg-subtle"
          >
            <Pencil aria-hidden className="h-4 w-4" />
          </Link>
          <DeleteForm
            action={deleteOpportunity}
            name="opportunityId"
            value={id}
            label="Supprimer"
            variant="icon"
          />
        </div>
      </div>
    </div>
  );
}
