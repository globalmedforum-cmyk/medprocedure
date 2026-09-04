"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  className?: string
  "aria-label"?: string
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked = false,
      onCheckedChange,
      disabled = false,
      id,
      className,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-md border border-border-default transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer",
          checked
            ? "bg-state-success border-state-success text-white shadow-xs"
            : "bg-bg-surface hover:border-accent-primary",
          className
        )}
      >
        {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }

