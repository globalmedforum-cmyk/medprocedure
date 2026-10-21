"use client";

import React, { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { participateInCongress } from "@/actions/dossiers";

// Ouvre (ou retrouve) le dossier de l'utilisateur pour ce congrès
export function ParticipateButton({ opportunityId }: { opportunityId: string }) {
  const [state, formAction, isPending] = useActionState(
    participateInCongress,
    null
  );

  return (
    <form action={formAction} className="flex flex-col items-end gap-1">
      <input type="hidden" name="opportunityId" value={opportunityId} />
      <Button
        type="submit"
        disabled={isPending}
        className="h-11 shrink-0 gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition-all hover:bg-accent-hover hover:shadow-md"
      >
        {isPending ? "Ouverture…" : "Participer à cet événement"}
        <ArrowRight aria-hidden />
      </Button>
      {state && !state.success && (
        <p role="alert" className="max-w-xs text-right text-sm text-state-error">
          {state.error}
        </p>
      )}
    </form>
  );
}
