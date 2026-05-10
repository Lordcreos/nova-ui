import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const inputVariants = cva(
  [
    "flex w-full items-center",
    "bg-[var(--neutral-object-accent-silent)] text-[var(--text-body)]",
    "border border-[var(--border-neutral)]",
    "rounded-lg",
    "text-sm font-normal",
    "placeholder:text-[var(--text-body-quiet)]",
    "transition-colors duration-150",
    "hover:border-[var(--border-neutral-loud)] hover:bg-[var(--neutral-object-accent-quiet)]",
    "focus:outline-none focus:border-[var(--border-contextual-action)] focus:bg-[var(--neutral-object)]",
    "focus:[caret-color:var(--surface-action-solid)]",
    "focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/20",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "aria-invalid:border-[var(--border-contextual-danger)] aria-invalid:shadow-[var(--shadow-danger-xs)]",
    "aria-invalid:focus-visible:ring-[var(--ring-danger)]/20",
  ],
  {
    variants: {
      variant: {
        xs: "h-8 px-2.5 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-3.5 text-sm",
        lg: "h-11 px-4 text-base",
      },
      group: {
        single: "rounded-lg",
        left: "rounded-r-none border-r-0",
        right: "rounded-l-none",
        middle: "rounded-none border-r-0",
        up: "rounded-b-none border-b-0",
        down: "rounded-t-none",
        "up-left": "rounded-tr-none rounded-bl-none rounded-br-none border-r-0 border-b-0",
        "up-right": "rounded-tl-none rounded-bl-none rounded-br-none border-b-0",
        "down-left": "rounded-tr-none rounded-tl-none rounded-br-none border-r-0 border-t-0",
        "down-right": "rounded-tl-none rounded-tr-none rounded-bl-none border-t-0",
        "middle-up": "rounded-none border-b-0 border-r-0",
        "middle-left": "rounded-none border-r-0",
        "middle-right": "rounded-none",
        "single-up": "rounded-b-none border-b-0",
        "single-down": "rounded-t-none",
      },
    },
    defaultVariants: {
      variant: "md",
      group: "single",
    },
  }
)

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

function Input({ variant, group, className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      className={cn(inputVariants({ variant, group, className }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
export type { InputProps }
