import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const labelVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "font-semibold leading-none text-[var(--text-heading)]",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
      required: {
        true: "after:content-['*'] after:text-[var(--text-danger)]",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      required: false,
    },
  }
)

type LabelProps = React.ComponentProps<"label"> & VariantProps<typeof labelVariants>

function Label({ size, required, className, ...props }: LabelProps) {
  return (
    <label
      data-slot="label"
      className={cn(labelVariants({ size, required, className }))}
      {...props}
    />
  )
}

export { Label, labelVariants }
export type { LabelProps }
