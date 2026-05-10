import * as React from "react"
import { cn } from "../../lib/utils"

interface RadiobuttonProps extends Omit<React.ComponentProps<"input">, "type"> {
  label?: string
}

function Radiobutton({ label, disabled, className, id, ...props }: RadiobuttonProps) {
  return (
    <label
      data-slot="radio-wrapper"
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      htmlFor={id}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0">
        <input
          id={id}
          type="radio"
          disabled={disabled}
          data-slot="radiobutton"
          className={cn(
            "peer h-4 w-4 cursor-pointer appearance-none rounded-full",
            "border border-[var(--border-neutral)] bg-[var(--neutral-object)]",
            "transition-colors duration-150",
            "hover:border-[var(--border-contextual-action)]",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
            "checked:border-[var(--surface-action-solid)] checked:bg-[var(--surface-action-solid)]",
            "disabled:cursor-not-allowed"
          )}
          {...props}
        />
        {/* Inner dot */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center",
            "opacity-0 peer-checked:opacity-100 transition-opacity"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      </span>
      {label && (
        <span className="text-sm text-[var(--text-body)] leading-none select-none">{label}</span>
      )}
    </label>
  )
}

export { Radiobutton }
export type { RadiobuttonProps }
