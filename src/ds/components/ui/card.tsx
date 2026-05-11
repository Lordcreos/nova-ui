import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const cardVariants = cva(
  [
    "rounded-lg border bg-[var(--neutral-object)] text-[var(--text-body)]",
    "border-[var(--border-neutral-quiet)] shadow-[var(--shadow-neutral-xs)]",
  ],
  {
    variants: {
      interactive: {
        true: "transition-shadow duration-200 hover:shadow-[var(--shadow-neutral-md)]",
        false: "",
      },
    },
    defaultVariants: {
      interactive: false,
    },
  }
)

type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>

function Card({ interactive, className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ interactive, className }))}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex items-start justify-between gap-3 border-b border-[var(--border-neutral-quiet)] p-4", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-base font-semibold text-[var(--text-heading)]", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("mt-1 text-sm text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("p-4", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center justify-end gap-2 border-t border-[var(--border-neutral-quiet)] p-4", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
export type { CardProps }
