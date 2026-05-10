import * as React from "react"
import { cn } from "../../lib/utils"
import { Textarea } from "../ui/textarea"
import { HelperText } from "../ui/helper-text"
import type { TextareaProps } from "../ui/textarea"

type TextareaFieldProps = TextareaProps & {
  label: string
  required?: boolean
  error?: string
  helperText?: string
  limit?: number
  count?: number
  id?: string
}

function TextareaField({
  label,
  required,
  error,
  helperText,
  limit,
  count,
  id,
  className,
  ...props
}: TextareaFieldProps) {
  const textareaId = id ?? React.useId()
  const hasError = Boolean(error)

  return (
    <div data-slot="textarea-field" className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={textareaId}
        className={cn(
          "text-sm font-semibold text-[var(--text-body)]",
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

      <Textarea
        id={textareaId}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        aria-required={required}
        className={className}
        {...props}
      />

      <div className="flex items-start justify-between gap-2">
        <div>
          {hasError && (
            <HelperText
              id={`${textareaId}-error`}
              color="danger"
              size="sm"
              className="flex items-center gap-1"
            >
              <i className="far fa-circle-xmark" aria-hidden="true" />
              {error}
            </HelperText>
          )}
          {!hasError && helperText && (
            <HelperText id={`${textareaId}-helper`} color="default" size="sm">
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

export { TextareaField }
export type { TextareaFieldProps }
