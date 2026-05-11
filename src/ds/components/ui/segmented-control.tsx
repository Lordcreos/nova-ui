import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import type { ToggleGroupSingleProps } from "@radix-ui/react-toggle-group"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const segmentedControlVariants = cva(
  "inline-flex items-center rounded-lg border border-[var(--border-neutral)] bg-[var(--neutral-foreground)] p-0.5",
  {
    variants: {
      size: {
        sm: "gap-0.5 text-xs",
        md: "gap-0.5 text-sm",
        lg: "gap-0.5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
)

const segmentedItemVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 font-semibold cursor-pointer select-none",
    "rounded-md transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-3 text-sm",
        lg: "h-8 px-4 text-sm",
      },
      color: {
        primary: [
          "text-[var(--text-body-quiet)]",
          "data-[state=on]:bg-[var(--surface-action-solid)] data-[state=on]:text-[var(--text-on-solid)]",
          "data-[state=on]:shadow-[var(--shadow-action-xs)]",
          "hover:text-[var(--text-body)]",
        ],
        neutral: [
          "text-[var(--text-body-quiet)]",
          "data-[state=on]:bg-[var(--neutral-object)] data-[state=on]:text-[var(--text-heading)]",
          "data-[state=on]:border data-[state=on]:border-[var(--border-neutral)]",
          "data-[state=on]:shadow-[var(--shadow-neutral-xs)]",
          "hover:text-[var(--text-body)]",
        ],
      },
    },
    defaultVariants: { size: "md", color: "neutral" },
  }
)

type SegmentedControlProps = Omit<ToggleGroupSingleProps, "type"> &
  VariantProps<typeof segmentedControlVariants> & {
    ref?: React.Ref<HTMLDivElement>
  }

function SegmentedControl({ size, className, ...props }: SegmentedControlProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="segmented-control"
      type="single"
      className={cn(segmentedControlVariants({ size, className }))}
      {...props}
    />
  )
}

type SegmentedControlItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof segmentedItemVariants>

function SegmentedControlItem({ size, color, className, ...props }: SegmentedControlItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="segmented-control-item"
      className={cn(segmentedItemVariants({ size, color, className }))}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlItem }
export type { SegmentedControlProps, SegmentedControlItemProps }
