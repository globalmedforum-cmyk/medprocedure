"use client";

import React from "react";
import { LifeBuoy, Mail, MessageCircle } from "lucide-react";
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
  buildAssistanceMessage,
  buildEmailLink,
  buildWhatsAppLink,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

interface AssistanceDialogProps {
  procedureTitle: string;
  stepLabel?: string;
  className?: string;
}

export function AssistanceDialog({
  procedureTitle,
  stepLabel,
  className,
}: AssistanceDialogProps) {
  const message = buildAssistanceMessage(procedureTitle, stepLabel);
  const emailLink = buildEmailLink(
    `Demande d'accompagnement : ${procedureTitle}`,
    message
  );
  const whatsAppLink = buildWhatsAppLink(message);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className={cn("h-10 gap-2 bg-transparent px-4 text-sm", className)}
          />
        }
      >
        <LifeBuoy aria-hidden />
        Obtenir une assistance
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-md border border-border-default p-6 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Obtenir une assistance
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Notre équipe peut vous accompagner dans cette procédure. Choisissez
            comment nous écrire : votre message est déjà préparé, vous pouvez le
            compléter avant de l&apos;envoyer.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          {whatsAppLink && (
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                "h-11 justify-start gap-3 px-4 text-sm"
              )}
            >
              <MessageCircle aria-hidden />
              Écrire sur WhatsApp
            </a>
          )}
          <a
            href={emailLink}
            className={cn(
              buttonVariants({ variant: whatsAppLink ? "outline" : "default" }),
              "h-11 justify-start gap-3 px-4 text-sm",
              whatsAppLink && "bg-transparent"
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
              className="cursor-pointer justify-self-start text-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
            />
          }
        >
          Fermer
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
