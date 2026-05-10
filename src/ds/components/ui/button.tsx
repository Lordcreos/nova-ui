import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-semibold text-sm whitespace-nowrap select-none",
    "rounded-lg border transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/50 focus-visible:ring-offset-0",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:ring-[3px] aria-invalid:ring-[var(--ring-danger)]/30",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--surface-action-solid)] text-[var(--text-on-solid)] border-[var(--surface-action-solid)]",
          "shadow-[var(--shadow-action-xs)]",
          "hover:bg-[var(--surface-action-solid-hover)] hover:border-[var(--surface-action-solid-hover)] hover:shadow-[var(--shadow-action-md)]",
          "active:bg-[var(--surface-action-solid-active)]",
        ],
        secondary: [
          "bg-[var(--surface-action-accent-quiet)] text-[var(--text-action)] border-[var(--border-contextual-action-quiet)]",
          "hover:bg-[var(--surface-action-accent)] hover:border-[var(--border-contextual-action)]",
          "active:bg-[var(--surface-action-accent-loud)]",
        ],
        tertiary: [
          "bg-[var(--neutral-object)] text-[var(--text-body)] border-[var(--border-neutral)]",
          "shadow-[var(--shadow-neutral-xs)]",
          "hover:bg-[var(--neutral-object-accent-silent)] hover:shadow-[var(--shadow-neutral-sm)]",
          "active:bg-[var(--neutral-object-accent-quiet)]",
        ],
        quiet: [
          "bg-transparent text-[var(--text-body)] border-[var(--border-neutral)]",
          "hover:bg-[var(--neutral-object-accent-silent)]",
          "active:bg-[var(--neutral-object-accent-quiet)]",
        ],
        ghost: [
          "bg-transparent text-[var(--text-body)] border-transparent",
          "hover:bg-[var(--neutral-object-accent-quiet)]",
          "active:bg-[var(--neutral-object-accent)]",
        ],
        "ghost-action": [
          "bg-transparent text-[var(--text-action)] border-transparent",
          "hover:bg-[var(--surface-action-accent-quiet)]",
          "active:bg-[var(--surface-action-accent)]",
        ],
        "danger-primary": [
          "bg-[var(--surface-danger-solid)] text-[var(--text-on-solid)] border-[var(--surface-danger-solid)]",
          "hover:bg-[var(--surface-danger-solid-hover)] hover:border-[var(--surface-danger-solid-hover)]",
          "active:brightness-90",
        ],
        "danger-secondary": [
          "bg-[var(--surface-danger-accent-quiet)] text-[var(--text-danger)] border-[var(--border-contextual-danger-quiet)]",
          "hover:bg-[var(--surface-danger-accent)] hover:border-[var(--border-contextual-danger)]",
          "active:bg-[var(--surface-danger-accent-loud)]",
        ],
        "danger-tertiary": [
          "bg-transparent text-[var(--text-danger)] border-[var(--border-neutral)]",
          "hover:bg-[var(--surface-danger-accent-quiet)]",
          "active:bg-[var(--surface-danger-accent)]",
        ],
        "warning-primary": [
          "bg-[var(--surface-warning-solid)] text-[var(--text-on-solid)] border-[var(--surface-warning-solid)]",
          "hover:bg-[var(--surface-warning-solid-hover)]",
          "active:brightness-90",
        ],
        "warning-secondary": [
          "bg-[var(--surface-warning-accent-quiet)] text-[var(--text-warning)] border-[var(--border-contextual-warning-quiet)]",
          "hover:bg-[var(--surface-warning-accent)] hover:border-[var(--border-contextual-warning)]",
          "active:bg-[var(--surface-warning-accent-loud)]",
        ],
        "warning-tertiary": [
          "bg-transparent text-[var(--text-warning)] border-[var(--border-neutral)]",
          "hover:bg-[var(--surface-warning-accent-quiet)]",
          "active:bg-[var(--surface-warning-accent)]",
        ],
        "alpha-neutral": [
          "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body)] border-[var(--border-neutral-quiet)]",
          "hover:bg-[var(--neutral-object-accent)] hover:border-[var(--border-neutral)]",
          "active:bg-[var(--neutral-object-accent-loud)]",
        ],
        "input-helper": [
          "bg-[var(--neutral-object-accent-silent)] text-[var(--text-body-quiet)] border-[var(--border-neutral)]",
          "rounded-none border-l-0",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-body)]",
        ],
      },
      size: {
        xs: "h-8 px-3 text-xs gap-1",
        sm: "h-9 px-3.5 text-sm",
        default: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "h-8 w-8 p-0 shrink-0",
      },
      group: {
        single: "rounded-lg",
        left: "rounded-r-none border-r-0",
        right: "rounded-l-none",
        middle: "rounded-none border-r-0",
        up: "rounded-b-none border-b-0",
        down: "rounded-t-none",
        "up-left": "rounded-tr-none rounded-bl-none rounded-br-none border-r-0 border-b-0",
        "up-right": "rounded-tl-none rounded-bl-none rounded-br-none border-b-0",
        "down-left": "rounded-tr-none rounded-tl-none rounded-br-none border-r-0 border-t-0",
        "down-right": "rounded-tl-none rounded-tr-none rounded-bl-none border-t-0",
        "middle-up": "rounded-none border-b-0 border-r-0",
        "middle-left": "rounded-none border-r-0",
        "middle-right": "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      group: "single",
    },
  }
)

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    icon?: React.ReactNode
    iconPosition?: "left" | "right" | "top" | "bottom"
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, group, asChild, className, icon, iconPosition = "left", children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isVertical = iconPosition === "top" || iconPosition === "bottom"
    const iconNode = icon ? (
      <span data-slot="button-icon" className="inline-flex shrink-0 items-center justify-center">
        {icon}
      </span>
    ) : null

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size, group }),
          isVertical && "h-auto min-h-10 flex-col gap-1.5 py-2",
          className
        )}
        {...props}
      >
        {iconPosition === "left" || iconPosition === "top" ? iconNode : null}
        {children}
        {iconPosition === "right" || iconPosition === "bottom" ? iconNode : null}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
