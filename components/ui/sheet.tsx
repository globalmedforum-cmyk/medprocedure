"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Sheet({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

interface SheetContentProps extends DialogPrimitive.Popup.Props {
  side?: "left" | "right" | "top" | "bottom"
  showCloseButton?: boolean
}

function SheetContent({
  className,
  children,
  side = "left",
  showCloseButton = true,
  ...props
}: SheetContentProps) {
  const sideClasses = {
    left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r border-border-default data-open:slide-in-from-left data-closed:slide-out-to-left",
    right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l border-border-default data-open:slide-in-from-right data-closed:slide-out-to-right",
    top: "inset-x-0 top-0 border-b border-border-default data-open:slide-in-from-top data-closed:slide-out-to-top",
    bottom: "inset-x-0 bottom-0 border-t border-border-default data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
  }[side]

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-bg-surface p-6 shadow-2xl transition ease-in-out duration-200 outline-none data-open:animate-in data-closed:animate-out",
          sideClasses,
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4 text-text-muted hover:text-text-primary"
                size="icon-sm"
              />
            }
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 text-left", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 pt-4 border-t border-border-default", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-lg font-semibold text-text-primary", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-text-muted", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

