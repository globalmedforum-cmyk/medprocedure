import React from "react";
import type { Opportunity, OpportunityCategory } from "@prisma/client";
import { saveOpportunity } from "@/actions/admin";
import {
  opportunityCategoryGroups,
  opportunityCategoryLabels,
} from "@/lib/opportunity-categories";
import { AdminForm } from "./admin-form";
import { Field, TextAreaField } from "./fields";

interface OpportunityFormProps {
  opportunity?: Opportunity;
  defaultCategory?: OpportunityCategory;
}

export function OpportunityForm({
  opportunity,
  defaultCategory,
}: OpportunityFormProps) {
  return (
    <AdminForm
      action={saveOpportunity}
      submitLabel={opportunity ? "Enregistrer" : "Ajouter l'opportunité"}
      className="max-w-2xl"
    >
      {opportunity && (
        <input type="hidden" name="opportunityId" value={opportunity.id} />
      )}
      <label className="block space-y-1.5">
        <span className="block text-sm font-medium">Catégorie</span>
        <select
          name="category"
          required
          defaultValue={opportunity?.category ?? defaultCategory ?? ""}
          className="h-10 w-full rounded-lg border border-input bg-input/30 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="" disabled>
            Choisir une catégorie
          </option>
          {opportunityCategoryGroups.map((group) => (
            <optgroup key={group.title} label={group.title}>
              {group.categories.map((category) => (
                <option key={category} value={category}>
                  {opportunityCategoryLabels[category]}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <Field label="Titre" name="title" required defaultValue={opportunity?.title} />
      <Field
        label="Établissement"
        name="hospital"
        required
        defaultValue={opportunity?.hospital}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Ville"
          name="location"
          required
          defaultValue={opportunity?.location}
        />
        <Field
          label="Pays"
          name="country"
          required
          defaultValue={opportunity?.country}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Spécialité"
          name="specialty"
          required
          defaultValue={opportunity?.specialty}
        />
        <Field
          label="Date limite"
          name="deadline"
          type="date"
          defaultValue={opportunity?.deadline?.toISOString().slice(0, 10)}
        />
      </div>
      <TextAreaField
        label="Conditions"
        name="requirements"
        defaultValue={opportunity?.requirements.join("\n")}
        hint="Une condition par ligne."
      />
      <Field
        label="E-mail de contact"
        name="contactEmail"
        type="email"
        defaultValue={opportunity?.contactEmail}
      />
    </AdminForm>
  );
}
