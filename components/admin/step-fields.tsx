import React from "react";
import type { Step } from "@prisma/client";
import { Field, TextAreaField } from "./fields";

interface StepFieldsProps {
  step?: Step;
  defaultOrder?: number;
}

export function StepFields({ step, defaultOrder }: StepFieldsProps) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-[6rem_minmax(0,1fr)]">
        <Field
          label="Ordre"
          name="order"
          type="number"
          required
          defaultValue={step?.order ?? defaultOrder}
        />
        <Field label="Titre" name="title" required defaultValue={step?.title} />
      </div>
      <TextAreaField
        label="Description"
        name="description"
        required
        defaultValue={step?.description}
      />
      <TextAreaField
        label="En pratique"
        name="content"
        defaultValue={step?.content}
        hint="Affiché sous la description. Une ligne qui commence par « - » devient un élément de liste."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Durée estimée"
          name="estimatedDuration"
          defaultValue={step?.estimatedDuration}
          hint="Exemple : 3 à 4 semaines"
        />
        <Field
          label="Lien vidéo"
          name="videoUrl"
          type="url"
          defaultValue={step?.videoUrl}
          hint="Lien d'intégration en https (YouTube ou Vimeo, format « embed »)."
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isRequired"
          defaultChecked={step?.isRequired ?? true}
          className="h-4 w-4 accent-accent-primary"
        />
        Étape obligatoire
      </label>
    </>
  );
}
