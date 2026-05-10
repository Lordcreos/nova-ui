import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Icon } from "./icon"
import type { IconType } from "./icon"

const rowCardVariants = cva(
  [
    "flex w-full items-center gap-3 rounded-xl p-3",
    "bg-[var(--neutral-object)] border border-[var(--border-neutral-quiet)]",
    "shadow-[var(--shadow-neutral-xs)] transition-shadow duration-200",
    "hover:shadow-[var(--shadow-neutral-md)] cursor-pointer",
  ],
  {
    variants: {
      color: {
        neutral: "",
        action: "border-l-4 border-l-[var(--border-contextual-action)]",
        success: "border-l-4 border-l-[var(--border-contextual-success)]",
        info: "border-l-4 border-l-[var(--border-contextual-info)]",
        warning: "border-l-4 border-l-[var(--border-contextual-warning)]",
        danger: "border-l-4 border-l-[var(--border-contextual-danger)]",
      },
    },
    defaultVariants: { color: "neutral" },
  }
)

type RowCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof rowCardVariants> & {
    title?: string
    subtitle?: string
    icon?: { name: string; type?: IconType }
  }

function RowCard({ color, title, subtitle, icon, className, children, ...props }: RowCardProps) {
  return (
    <div
      data-slot="row-card"
      className={cn(rowCardVariants({ color, className }))}
      {...props}
    >
      {icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--neutral-foreground)] text-[var(--text-body-quiet)]">
          <Icon name={icon.name} type={icon.type ?? "far"} size="sm" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        {title && (
          <span className="text-sm font-semibold text-[var(--text-heading)] truncate">{title}</span>
        )}
        {subtitle && (
          <span className="text-xs text-[var(--text-body-quiet)] truncate">{subtitle}</span>
        )}
        {children}
      </div>
    </div>
  )
}

function RowCardLeft({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="row-card-left" className={cn("flex shrink-0 items-center", className)} {...props} />
  )
}

function RowCardRight({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="row-card-right" className={cn("flex shrink-0 items-center gap-2 ml-auto", className)} {...props} />
  )
}

export { RowCard, RowCardLeft, RowCardRight, rowCardVariants }
export type { RowCardProps }
