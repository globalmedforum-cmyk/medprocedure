import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

function FieldShell({
  label,
  required,
  hint,
  className,
  children,
}: Pick<FieldProps, "label" | "required" | "hint" | "className"> & {
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="block text-sm font-medium">
        {label}
        {!required && (
          <span className="font-normal text-text-muted"> (facultatif)</span>
        )}
      </span>
      {children}
      {hint && <span className="block text-xs text-text-muted">{hint}</span>}
    </label>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  hint,
  className,
}: FieldProps) {
  return (
    <FieldShell
      label={label}
      required={required}
      hint={hint}
      className={className}
    >
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="h-11 rounded-xl md:text-sm"
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  required = false,
  hint,
  className,
}: Omit<FieldProps, "type">) {
  return (
    <FieldShell
      label={label}
      required={required}
      hint={hint}
      className={className}
    >
      <Textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="min-h-24 rounded-xl leading-relaxed md:text-sm"
      />
    </FieldShell>
  );
}
