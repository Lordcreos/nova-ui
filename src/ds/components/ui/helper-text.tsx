import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cnCustom } from "../../lib/utils"

const helperTextVariants = cva("flex items-start gap-1 leading-snug", {
  variants: {
    color: {
      default: "text-[var(--text-body-quiet)]",
      success: "text-[var(--text-success)]",
      danger: "text-[var(--text-danger)]",
      warning: "text-[var(--text-warning)]",
      info: "text-[var(--text-info)]",
    },
    size: {
      xs: "text-[10px]",
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
})

type HelperTextProps = React.ComponentProps<"p"> &
  VariantProps<typeof helperTextVariants> & {
    asChild?: boolean
  }

function HelperText({ color, size, asChild, className, ...props }: HelperTextProps) {
  const Comp = asChild ? Slot : "p"
  return (
    <Comp
      data-slot="helper-text"
      className={cnCustom(helperTextVariants({ color, size, className }))}
      {...props}
    />
  )
}

export { HelperText, helperTextVariants }
export type { HelperTextProps }
