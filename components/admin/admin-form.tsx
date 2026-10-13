"use client";

import React, { useActionState, useEffect, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminActionState } from "@/actions/admin";

type AdminAction = (
  prev: AdminActionState,
  formData: FormData
) => Promise<AdminActionState>;

interface AdminFormProps {
  action: AdminAction;
  submitLabel: string;
  resetOnSuccess?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function AdminForm({
  action,
  submitLabel,
  resetOnSuccess = false,
  className,
  children,
}: AdminFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);
  const [, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resetOnSuccess && state?.success) {
      formRef.current?.reset();
    }
  }, [resetOnSuccess, state]);

  // Soumission manuelle : React viderait sinon les champs après chaque action,
  // y compris quand la validation échoue.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("space-y-5", className)}
    >
      {children}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={isPending} className="h-10 px-4 text-sm">
          {isPending ? "Enregistrement…" : submitLabel}
        </Button>
        {state?.success && (
          <p role="status" className="text-sm text-state-success">
            {state.message}
          </p>
        )}
        {state && !state.success && (
          <p role="alert" className="text-sm text-state-error">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
