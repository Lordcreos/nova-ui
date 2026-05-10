import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const bodyVariants = cva("leading-normal", {
  variants: {
    variant: {
      default: "font-normal",
      bold: "font-semibold",
    },
    color: {
      default: "text-[var(--text-body)]",
      loud: "text-[var(--text-body-loud)]",
      quiet: "text-[var(--text-body-quiet)]",
    },
    size: {
      xs: "text-[10px]",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    size: "default",
  },
})

type BodyProps = React.ComponentProps<"p"> &
  VariantProps<typeof bodyVariants> & {
    as?: React.ElementType
  }

function Body({ variant, color, size, as: Tag = "p", className, ...props }: BodyProps) {
  return (
    <Tag
      data-slot="body"
      className={cn(bodyVariants({ variant, color, size, className }))}
      {...props}
    />
  )
}

export { Body, bodyVariants }
export type { BodyProps }
