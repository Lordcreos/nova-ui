import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 rounded-lg text-sm font-semibold",
    "border border-transparent transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-[var(--text-body-quiet)]",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-body)]",
          "data-[state=on]:bg-[var(--neutral-object-accent)] data-[state=on]:text-[var(--text-heading)]",
          "data-[state=on]:border-[var(--border-neutral)]",
        ],
        outline: [
          "border border-[var(--border-neutral)] bg-[var(--neutral-object)] text-[var(--text-body-quiet)]",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-body)]",
          "data-[state=on]:bg-[var(--neutral-object-accent-quiet)] data-[state=on]:text-[var(--text-heading)]",
        ],
      },
      size: {
        sm: "h-8 px-2.5 text-xs",
        default: "h-9 px-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>

function Toggle({ variant, size, className, ...props }: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
export type { ToggleProps }
