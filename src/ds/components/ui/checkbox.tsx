import * as React from "react"
import { cn } from "../../lib/utils"

const CheckMark = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 3.5L3.5 6.5L9 1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PartialMark = () => (
  <svg
    width="10"
    height="2"
    viewBox="0 0 10 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1 1H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

type CheckboxState = "unchecked" | "checked" | "partial"

interface CheckboxProps extends Omit<React.ComponentProps<"input">, "type" | "checked"> {
  checked?: CheckboxState | boolean
  label?: string
}

function Checkbox({ checked = "unchecked", disabled, className, label, id, ...props }: CheckboxProps) {
  const state: CheckboxState =
    checked === true ? "checked" : checked === false ? "unchecked" : checked

  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = state === "partial"
    }
  }, [state])

  return (
    <label
      data-slot="checkbox-wrapper"
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      htmlFor={id}
    >
      <span className="relative inline-flex h-4 w-4 shrink-0">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={state === "checked"}
          disabled={disabled}
          data-slot="checkbox"
          className={cn(
            "peer h-4 w-4 appearance-none rounded border border-[var(--border-neutral)] cursor-pointer",
            "bg-[var(--neutral-object)] transition-colors duration-150",
            "hover:border-[var(--border-contextual-action)]",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
            "checked:bg-[var(--surface-action-solid)] checked:border-[var(--surface-action-solid)]",
            "indeterminate:bg-[var(--surface-action-solid)] indeterminate:border-[var(--surface-action-solid)]",
            "disabled:cursor-not-allowed"
          )}
          {...props}
        />
        {/* Checked icon */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center text-white",
            "opacity-0 peer-checked:opacity-100 transition-opacity"
          )}
        >
          <CheckMark />
        </span>
        {/* Partial icon */}
        {state === "partial" && (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
            <PartialMark />
          </span>
        )}
      </span>
      {label && (
        <span className="text-sm text-[var(--text-body)] leading-none select-none">{label}</span>
      )}
    </label>
  )
}

export { Checkbox }
export type { CheckboxProps, CheckboxState }
