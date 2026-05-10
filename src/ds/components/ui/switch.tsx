import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const switchVariants = cva(
  [
    "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-[var(--border-neutral)]",
  ],
  {
    variants: {
      variant: {
        default: [
          "data-[state=checked]:bg-[var(--surface-action-solid)]",
          "focus-visible:ring-[var(--ring-action)]/40",
        ],
        danger: [
          "data-[state=checked]:bg-[var(--surface-danger-solid)]",
          "focus-visible:ring-[var(--ring-danger)]/40",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>

function Switch({ variant, className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ variant, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full shadow-sm",
          "bg-white border border-[var(--border-neutral-quiet)]",
          "transition-transform duration-200",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants }
export type { SwitchProps }
