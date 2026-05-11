import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const alertVariants = cva(
  [
    "relative flex w-full items-start gap-3 rounded-lg border p-4",
    "text-sm leading-relaxed",
  ],
  {
    variants: {
      variant: {
        neutral: "bg-[var(--neutral-object)] border-[var(--border-neutral)] text-[var(--text-body)]",
        info: "bg-[var(--surface-info-accent-quiet)] border-[var(--border-contextual-info-quiet)] text-[var(--text-info)]",
        success: "bg-[var(--surface-success-accent-quiet)] border-[var(--border-contextual-success-quiet)] text-[var(--text-success)]",
        warning: "bg-[var(--surface-warning-accent-quiet)] border-[var(--border-contextual-warning-quiet)] text-[var(--text-warning)]",
        danger: "bg-[var(--surface-danger-accent-quiet)] border-[var(--border-contextual-danger-quiet)] text-[var(--text-danger)]",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

type AlertProps = React.ComponentProps<"div"> & VariantProps<typeof alertVariants>

function Alert({ variant, className, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="status"
      className={cn(alertVariants({ variant, className }))}
      {...props}
    />
  )
}

function AlertIcon({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-icon"
      className={cn("mt-0.5 inline-flex shrink-0 items-center justify-center", className)}
      {...props}
    />
  )
}

function AlertContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-content"
      className={cn("min-w-0 flex-1 space-y-1", className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn("font-semibold text-[var(--text-heading)]", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn("text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

export { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, alertVariants }
export type { AlertProps }
