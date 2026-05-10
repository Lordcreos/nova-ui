import * as React from "react"
import { cn } from "../../lib/utils"
import { HelperText } from "../ui/helper-text"

type GroupPosition =
  | "single"
  | "left"
  | "right"
  | "middle"
  | "up"
  | "down"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right"
  | "middle-left"
  | "middle-right"

interface GroupTextFieldRowProps {
  children: React.ReactNode
  className?: string
  isFirst?: boolean
  isLast?: boolean
  isSingle?: boolean
}

function GroupTextFieldRow({
  children,
  className,
  isFirst,
  isLast,
  isSingle,
}: GroupTextFieldRowProps) {
  const rawChildren = React.Children.toArray(children).filter(React.isValidElement)
  const count = rawChildren.length

  const cloned = rawChildren.map((child, idx) => {
    let group: GroupPosition

    if (isSingle) {
      group = "single"
    } else if (count === 1) {
      group = isFirst && isLast ? "single" : isFirst ? "up" : isLast ? "down" : "middle"
    } else {
      const isLeftEdge = idx === 0
      const isRightEdge = idx === count - 1
      const isMid = !isLeftEdge && !isRightEdge

      if (isFirst && isLast) {
        group = isLeftEdge ? "left" : isRightEdge ? "right" : "middle"
      } else if (isFirst) {
        group = isLeftEdge ? "up-left" : isRightEdge ? "up-right" : "middle-left"
      } else if (isLast) {
        group = isLeftEdge ? "down-left" : isRightEdge ? "down-right" : "middle-left"
      } else {
        group = isMid ? "middle" : isLeftEdge ? "middle-left" : "middle-right"
      }
    }

    return React.cloneElement(child as React.ReactElement<{ group?: GroupPosition }>, { group })
  })

  return (
    <div data-slot="group-text-field-row" className={cn("flex", className)}>
      {cloned}
    </div>
  )
}

interface GroupTextFieldProps {
  label?: string
  required?: boolean
  error?: string
  helperText?: string
  limit?: number
  count?: number
  children: React.ReactNode
  className?: string
  id?: string
}

function GroupTextField({
  label,
  required,
  error,
  helperText,
  limit,
  count,
  children,
  className,
  id,
}: GroupTextFieldProps) {
  const groupId = id ?? React.useId()
  const hasError = Boolean(error)

  const rawChildren = React.Children.toArray(children).filter(React.isValidElement)
  const hasRows = rawChildren.some((c) => (c as React.ReactElement).type === GroupTextFieldRow)

  let processedChildren: React.ReactNode

  if (hasRows) {
    const rowCount = rawChildren.length
    processedChildren = rawChildren.map((child, idx) =>
      React.cloneElement(child as React.ReactElement<GroupTextFieldRowProps>, {
        isFirst: idx === 0,
        isLast: idx === rowCount - 1,
        isSingle: rowCount === 1,
      })
    )
  } else {
    const count2 = rawChildren.length

    processedChildren = rawChildren.map((child, idx) => {
      let group: GroupPosition = "single"
      if (count2 === 1) {
        group = "single"
      } else if (idx === 0) {
        group = "left"
      } else if (idx === count2 - 1) {
        group = "right"
      } else {
        group = "middle"
      }
      return React.cloneElement(child as React.ReactElement<{ group?: GroupPosition }>, { group })
    })
  }

  return (
    <div data-slot="group-text-field" className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label
          htmlFor={groupId}
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
      )}

      <div
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? `${groupId}-error` : helperText ? `${groupId}-helper` : undefined}
      >
        {processedChildren}
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          {hasError && (
            <HelperText
              id={`${groupId}-error`}
              color="danger"
              size="sm"
              className="flex items-center gap-1"
            >
              <i className="far fa-circle-xmark" aria-hidden="true" />
              {error}
            </HelperText>
          )}
          {!hasError && helperText && (
            <HelperText id={`${groupId}-helper`} color="default" size="sm">
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

export { GroupTextField, GroupTextFieldRow }
export type { GroupTextFieldProps, GroupTextFieldRowProps, GroupPosition }
