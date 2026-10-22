"use client";

import React, { useActionState } from "react";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { acceptTerms } from "@/actions/terms";

interface AcceptTermsFormProps {
  next: string;
}

export function AcceptTermsForm({ next }: AcceptTermsFormProps) {
  const [state, formAction, isPending] = useActionState(acceptTerms, null);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          name="accept"
          required
          className="mt-0.5 h-5 w-5 shrink-0 accent-accent-primary"
        />
        <span>
          J&apos;ai lu et j&apos;approuve les conditions générales
          d&apos;utilisation.
        </span>
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-xl px-5 text-base font-semibold shadow-sm transition-[transform,background-color,border-color,color,box-shadow] hover:bg-accent-hover hover:shadow-md sm:w-auto"
        >
          {isPending ? "Enregistrement…" : "Accepter et continuer"}
        </Button>
        <SignOutButton redirectUrl="/">
          <button
            type="button"
            className="flex h-11 cursor-pointer items-center justify-center text-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
          >
            Refuser et me déconnecter
          </button>
        </SignOutButton>
      </div>

      {state && (
        <p role="alert" className="text-sm text-state-error">
          {state.error}
        </p>
      )}
    </form>
  );
}
