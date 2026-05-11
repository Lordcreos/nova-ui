import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const skeletonVariants = cva(
  "animate-pulse bg-[var(--neutral-object-accent-quiet)]",
  {
    variants: {
      shape: {
        text: "h-4 rounded",
        block: "rounded-lg",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      shape: "block",
    },
  }
)

type SkeletonProps = React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>

function Skeleton({ shape, className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ shape, className }))}
      {...props}
    />
  )
}

export { Skeleton, skeletonVariants }
export type { SkeletonProps }
