import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const emptyStateVariants = cva(
  "flex w-full flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "gap-2 px-4 py-8",
        default: "gap-3 px-6 py-12",
        lg: "gap-4 px-8 py-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type EmptyStateProps = React.ComponentProps<"div"> &
  VariantProps<typeof emptyStateVariants> & {
    icon?: React.ReactNode
    title?: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
  }

function EmptyState({
  size,
  icon,
  title,
  description,
  action,
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(emptyStateVariants({ size, className }))}
      {...props}
    >
      {icon && (
        <div
          data-slot="empty-state-icon"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body-quiet)]"
        >
          {icon}
        </div>
      )}
      {(title || description) && (
        <div className="max-w-sm space-y-1">
          {title && (
            <p data-slot="empty-state-title" className="font-semibold text-[var(--text-heading)]">
              {title}
            </p>
          )}
          {description && (
            <p data-slot="empty-state-description" className="text-sm text-[var(--text-body-quiet)]">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
      {action && <div data-slot="empty-state-action">{action}</div>}
    </div>
  )
}

export { EmptyState, emptyStateVariants }
export type { EmptyStateProps }
