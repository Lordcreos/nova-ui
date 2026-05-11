import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const spinnerVariants = cva(
  "inline-block shrink-0 animate-spin rounded-full border-current border-r-transparent",
  {
    variants: {
      size: {
        xs: "h-3 w-3 border",
        sm: "h-4 w-4 border-2",
        default: "h-5 w-5 border-2",
        lg: "h-6 w-6 border-[3px]",
        xl: "h-8 w-8 border-[3px]",
      },
      tone: {
        current: "text-current",
        action: "text-[var(--text-action)]",
        neutral: "text-[var(--text-body-quiet)]",
        inverse: "text-[var(--text-on-solid)]",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "current",
    },
  }
)

type SpinnerProps = React.ComponentProps<"span"> &
  VariantProps<typeof spinnerVariants> & {
    label?: string
  }

function Spinner({ size, tone, label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, tone, className }))}
      {...props}
    />
  )
}

export { Spinner, spinnerVariants }
export type { SpinnerProps }
