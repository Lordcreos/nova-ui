import * as React from "react"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"
import { HelperText } from "../ui/helper-text"
import type { InputProps } from "../ui/input"

type TextFieldProps = InputProps & {
  label: string
  required?: boolean
  error?: string
  helperText?: string
  limit?: number
  count?: number
  leadingIcon?: React.ReactNode
  id?: string
}

function TextField({
  label,
  required,
  error,
  helperText,
  limit,
  count,
  leadingIcon,
  variant = "md",
  id,
  className,
  style,
  ...props
}: TextFieldProps) {
  const inputId = id ?? React.useId()
  const hasError = Boolean(error)

  const labelSizeClass =
    variant === "xs" || variant === "sm" ? "text-xs" : "text-sm"

  return (
    <div data-slot="text-field" className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <label
        htmlFor={inputId}
        className={cn(
          "font-semibold text-[var(--text-body)]",
          labelSizeClass,
          hasError && "text-[var(--text-danger)]"
        )}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--text-danger)]" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Input wrapper (for leadingIcon) */}
      <div className="relative flex items-center">
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-[var(--text-body-quiet)]">
            {leadingIcon}
          </span>
        )}
        <Input
          id={inputId}
          variant={variant}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          aria-required={required}
          className={cn(leadingIcon && "pl-9", className)}
          style={style}
          {...props}
        />
      </div>

      {/* Footer: error/helper + counter */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          {hasError && (
            <HelperText
              id={`${inputId}-error`}
              color="danger"
              size="sm"
              className="flex items-center gap-1"
            >
              <i className="far fa-circle-xmark" aria-hidden="true" />
              {error}
            </HelperText>
          )}
          {!hasError && helperText && (
            <HelperText id={`${inputId}-helper`} color="default" size="sm">
              {helperText}
            </HelperText>
          )}
        </div>
        {limit !== undefined && (
          <span
            className={cn(
              "ml-auto shrink-0 text-xs text-[var(--text-body-quiet)]",
              count !== undefined && count > limit && "text-[var(--text-danger)]"
            )}
          >
            {count ?? 0}/{limit}
          </span>
        )}
      </div>
    </div>
  )
}

export { TextField }
export type { TextFieldProps }
