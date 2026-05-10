import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1",
    "font-semibold leading-none whitespace-nowrap shrink-0",
    "border transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        neutral: "",
        action: "",
        success: "",
        info: "",
        warning: "",
        danger: "",
        disabled: "opacity-60 pointer-events-none",
      },
      size: {
        xs: "h-[22px] px-1.5 text-[10px] rounded-md",
        sm: "h-6 px-2 text-xs rounded-md",
        default: "h-7 px-2.5 text-xs rounded-md",
      },
      shape: {
        square: "rounded-md",
        pill: "rounded-full",
      },
      fill: {
        ghost: "",
        solid: "text-[var(--text-on-solid)] border-transparent",
      },
      shouldHover: {
        true: "cursor-pointer",
        false: "",
      },
    },
    compoundVariants: [
      /* GHOST fills */
      {
        variant: "neutral",
        fill: "ghost",
        className:
          "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body)] border-[var(--border-neutral)]",
      },
      {
        variant: "action",
        fill: "ghost",
        className:
          "bg-[var(--surface-action-accent-quiet)] text-[var(--text-action)] border-[var(--border-contextual-action-quiet)]",
      },
      {
        variant: "success",
        fill: "ghost",
        className:
          "bg-[var(--surface-success-accent-quiet)] text-[var(--text-success)] border-[var(--border-contextual-success-quiet)]",
      },
      {
        variant: "info",
        fill: "ghost",
        className:
          "bg-[var(--surface-info-accent-quiet)] text-[var(--text-info)] border-[var(--border-contextual-info-quiet)]",
      },
      {
        variant: "warning",
        fill: "ghost",
        className:
          "bg-[var(--surface-warning-accent-quiet)] text-[var(--text-warning)] border-[var(--border-contextual-warning-quiet)]",
      },
      {
        variant: "danger",
        fill: "ghost",
        className:
          "bg-[var(--surface-danger-accent-quiet)] text-[var(--text-danger)] border-[var(--border-contextual-danger-quiet)]",
      },
      {
        variant: "disabled",
        fill: "ghost",
        className:
          "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-on-disabled)] border-[var(--border-neutral)]",
      },
      /* SOLID fills */
      {
        variant: "neutral",
        fill: "solid",
        className: "bg-[var(--color-gray-600)]",
      },
      {
        variant: "action",
        fill: "solid",
        className: "bg-[var(--surface-action-solid)]",
      },
      {
        variant: "success",
        fill: "solid",
        className: "bg-[var(--surface-success-solid)]",
      },
      {
        variant: "info",
        fill: "solid",
        className: "bg-[var(--surface-info-solid)]",
      },
      {
        variant: "warning",
        fill: "solid",
        className: "bg-[var(--surface-warning-solid)]",
      },
      {
        variant: "danger",
        fill: "solid",
        className: "bg-[var(--surface-danger-solid)]",
      },
      {
        variant: "disabled",
        fill: "solid",
        className: "bg-[var(--color-gray-400)]",
      },
      /* HOVER states (ghost) */
      {
        variant: "action",
        fill: "ghost",
        shouldHover: true,
        className: "hover:bg-[var(--surface-action-accent)] hover:border-[var(--border-contextual-action)]",
      },
      {
        variant: "success",
        fill: "ghost",
        shouldHover: true,
        className: "hover:bg-[var(--surface-success-accent)] hover:border-[var(--border-contextual-success)]",
      },
      {
        variant: "danger",
        fill: "ghost",
        shouldHover: true,
        className: "hover:bg-[var(--surface-danger-accent)] hover:border-[var(--border-contextual-danger)]",
      },
      {
        variant: "warning",
        fill: "ghost",
        shouldHover: true,
        className: "hover:bg-[var(--surface-warning-accent)] hover:border-[var(--border-contextual-warning)]",
      },
      {
        variant: "neutral",
        fill: "ghost",
        shouldHover: true,
        className: "hover:bg-[var(--neutral-object-accent)] hover:border-[var(--border-neutral-loud)]",
      },
    ],
    defaultVariants: {
      variant: "neutral",
      size: "default",
      shape: "square",
      fill: "ghost",
      shouldHover: false,
    },
  }
)

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>

function Badge({ variant, size, shape, fill, shouldHover, className, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, shape, fill, shouldHover, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
export type { BadgeProps }
