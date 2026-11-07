"use client";

import React from "react";
import { Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SUPPORT_EMAIL,
  buildEmailLink,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ContactDialogProps {
  trigger: React.ReactNode;
  // Nom accessible du bouton, obligatoire quand il ne contient qu'une icône
  triggerAriaLabel?: string;
  triggerVariant?: "default" | "outline" | "ghost";
  triggerClassName?: string;
  title: string;
  description: string;
  emailSubject: string;
  message: string;
}

export function ContactDialog({
  trigger,
  triggerAriaLabel,
  triggerVariant = "outline",
  triggerClassName,
  title,
  description,
  emailSubject,
  message,
}: ContactDialogProps) {
  const emailLink = buildEmailLink(emailSubject, message);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant={triggerVariant}
            className={triggerClassName}
            aria-label={triggerAriaLabel}
            title={triggerAriaLabel}
          />
        }
      >
        {trigger}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-2xl border border-border-default p-6 shadow-lg sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">{title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <a
            href={emailLink}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-12 justify-start gap-3 rounded-xl px-4 text-sm font-semibold transition-[transform,background-color,border-color,color,box-shadow] hover:bg-accent-hover",
            )}
          >
            <Mail aria-hidden />
            Écrire par e-mail
          </a>
          <p className="text-xs text-text-muted">
            Adresse : <span className="select-all">{SUPPORT_EMAIL}</span>
          </p>
        </div>

        <DialogClose
          render={
            <button
              type="button"
              className="flex h-11 cursor-pointer items-center justify-self-start text-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
            />
          }
        >
          Fermer
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
