"use client";

import React, { useActionState, useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminActionState } from "@/actions/admin";

interface DeleteFormProps {
  action: (
    prev: AdminActionState,
    formData: FormData,
  ) => Promise<AdminActionState>;
  name: string;
  value: string;
  label: string;
  // « button » : bouton compact à bordure rouge, pour les listes
  variant?: "link" | "button";
}

export function DeleteForm({
  action,
  name,
  value,
  label,
  variant = "link",
}: DeleteFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [, startTransition] = useTransition();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleDelete = () => {
    const formData = new FormData();
    formData.set(name, value);
    startTransition(() => formAction(formData));
  };

  if (!isConfirming && variant === "button") {
    return (
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-xl border border-state-error/30 bg-bg-surface px-3 text-sm font-semibold text-state-error transition-colors hover:bg-state-error/10"
      >
        <Trash2 aria-hidden className="h-4 w-4" />
        {label}
      </button>
    );
  }

  if (!isConfirming) {
    return (
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="flex h-11 cursor-pointer items-center text-sm font-medium text-state-error underline underline-offset-4 hover:opacity-80"
      >
        {label}
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="destructive"
        disabled={isPending}
        onClick={handleDelete}
        className={
          variant === "button"
            ? "h-10 rounded-xl px-3 text-sm font-semibold"
            : "h-11 rounded-xl px-4 text-sm font-semibold"
        }
      >
        {isPending ? "Suppression…" : "Confirmer la suppression"}
      </Button>
      <button
        type="button"
        disabled={isPending}
        onClick={() => setIsConfirming(false)}
        className="cursor-pointer text-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
      >
        Annuler
      </button>
      {state && !state.success && (
        <p role="alert" className="text-sm text-state-error">
          {state.error}
        </p>
      )}
    </div>
  );
}
