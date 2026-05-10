import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    variant: {
      h4xl: "text-h4xl",
      h3xl: "text-h3xl",
      h2xl: "text-h2xl",
      hxl: "text-hxl",
      h0: "text-h0",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
    },
    color: {
      default: "text-[var(--text-heading)]",
      loud: "text-[var(--text-heading-loud)]",
      quiet: "text-[var(--text-heading-quiet)]",
    },
  },
  defaultVariants: {
    variant: "h1",
    color: "default",
  },
})

type HeadingVariant = NonNullable<VariantProps<typeof headingVariants>["variant"]>

const tagMap: Record<HeadingVariant, React.ElementType> = {
  h4xl: "h1",
  h3xl: "h1",
  h2xl: "h1",
  hxl: "h1",
  h0: "h1",
  h1: "h2",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
}

type HeadingProps = React.ComponentProps<"h1"> &
  VariantProps<typeof headingVariants> & {
    as?: React.ElementType
  }

function Heading({ variant = "h1", color, as, className, ...props }: HeadingProps) {
  const Tag = as ?? tagMap[variant ?? "h1"] ?? "h2"
  return (
    <Tag
      data-slot="heading"
      className={cn(headingVariants({ variant, color, className }))}
      {...props}
    />
  )
}

export { Heading, headingVariants }
export type { HeadingProps, HeadingVariant }
