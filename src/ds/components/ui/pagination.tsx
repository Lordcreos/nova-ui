import * as React from "react"
import { cn } from "../../lib/utils"
import { Icon } from "./icon"

interface PaginationProps extends React.ComponentProps<"nav"> {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  maxVisible?: number
}

function getPageRange(current: number, total: number, maxVisible = 5): (number | "ellipsis")[] {
  if (total <= maxVisible) return Array.from({ length: total }, (_, index) => index + 1)

  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, current - half)
  let end = Math.min(total, start + maxVisible - 1)

  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }

  const pages: (number | "ellipsis")[] = []

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push("ellipsis")
  }

  for (let page = start; page <= end; page++) pages.push(page)

  if (end < total) {
    if (end < total - 1) pages.push("ellipsis")
    pages.push(total)
  }

  return pages
}

const itemClassName = [
  "inline-flex h-9 min-w-9 items-center justify-center px-3",
  "bg-[var(--neutral-object)] text-sm font-semibold text-[var(--text-body)]",
  "transition-colors duration-150",
  "focus-visible:outline-none focus-visible:z-10",
  "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--ring-action)]",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ")

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className,
  ...props
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages, maxVisible)
  const canPrevious = currentPage > 1
  const canNext = currentPage < totalPages

  return (
    <nav
      data-slot="pagination"
      aria-label="Pagination"
      className={cn("inline-flex items-stretch overflow-hidden rounded-lg border border-[var(--border-neutral)] shadow-[var(--shadow-neutral-xs)] divide-x divide-[var(--border-neutral)]", className)}
      {...props}
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={!canPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(itemClassName, "gap-1.5 hover:bg-[var(--neutral-object-accent-quiet)]")}
      >
        <Icon name="chevron-left" size="sm" />
        Prev
      </button>
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex h-9 min-w-9 items-center justify-center bg-[var(--neutral-object)] px-3 text-sm text-[var(--text-body-quiet)]"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={cn(
              itemClassName,
              page === currentPage
                ? "bg-[var(--surface-action-solid)] text-[var(--text-on-solid)] hover:bg-[var(--surface-action-solid-hover)]"
                : "hover:bg-[var(--neutral-object-accent-quiet)]"
            )}
          >
            {page}
          </button>
        )
      )}
      <button
        type="button"
        aria-label="Next page"
        disabled={!canNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(itemClassName, "gap-1.5 hover:bg-[var(--neutral-object-accent-quiet)]")}
      >
        Next
        <Icon name="chevron-right" size="sm" />
      </button>
    </nav>
  )
}

export { Pagination, getPageRange }
export type { PaginationProps }
