import * as React from "react"
import { cn } from "../../lib/utils"

type TextareaProps = React.ComponentProps<"textarea"> & {
  resize?: "none" | "y" | "x" | "both"
}

function Textarea({ className, resize = "y", ...props }: TextareaProps) {
  const resizeClass = {
    none: "resize-none",
    y: "resize-y",
    x: "resize-x",
    both: "resize",
  }[resize]

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full px-3.5 py-2.5",
        "bg-[var(--neutral-object-accent-silent)] text-[var(--text-body)]",
        "border border-[var(--border-neutral)] rounded-lg",
        "text-sm font-normal leading-relaxed",
        "placeholder:text-[var(--text-body-quiet)]",
        "transition-colors duration-150",
        "hover:border-[var(--border-neutral-loud)] hover:bg-[var(--neutral-object-accent-quiet)]",
        "focus:outline-none focus:border-[var(--border-contextual-action)] focus:bg-[var(--neutral-object)]",
        "focus:[caret-color:var(--surface-action-solid)]",
        "focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/20",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "aria-invalid:border-[var(--border-contextual-danger)] aria-invalid:shadow-[var(--shadow-danger-xs)]",
        resizeClass,
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
