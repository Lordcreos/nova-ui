import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const separatorVariants = cva("shrink-0 bg-[var(--border-neutral)]", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    tone: {
      default: "bg-[var(--border-neutral)]",
      quiet: "bg-[var(--border-neutral-quiet)]",
      loud: "bg-[var(--border-neutral-loud)]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    tone: "default",
  },
})

type SeparatorProps = React.ComponentProps<"div"> &
  VariantProps<typeof separatorVariants> & {
    decorative?: boolean
  }

function Separator({
  orientation = "horizontal",
  tone,
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation ?? "horizontal"}
      className={cn(separatorVariants({ orientation, tone, className }))}
      {...props}
    />
  )
}

export { Separator, separatorVariants }
export type { SeparatorProps }
