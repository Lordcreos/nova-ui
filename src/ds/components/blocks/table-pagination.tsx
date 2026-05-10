import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
  className?: string
}

function getPageRange(current: number, total: number, maxVisible = 5): (number | "ellipsis")[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

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

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < total) {
    if (end < total - 1) pages.push("ellipsis")
    pages.push(total)
  }

  return pages
}

function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  className,
}: TablePaginationProps) {
  const pages = getPageRange(currentPage, totalPages)

  const from = totalItems === 0 ? 0 : Math.min((currentPage - 1) * pageSize + 1, totalItems)
  const to = Math.min(currentPage * pageSize, totalItems)

  const canPrev = hasPrevious !== undefined ? hasPrevious : currentPage > 1
  const canNext = hasNext !== undefined ? hasNext : currentPage < totalPages

  return (
    <nav
      data-slot="table-pagination"
      aria-label="Pagination"
      className={cn("flex w-full items-center justify-between gap-3", className)}
    >
      <p className="min-w-0 shrink text-sm text-[var(--text-body-quiet)]">
        Showing{" "}
        <span className="font-semibold text-[var(--text-body)]">
          {from}-{to}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[var(--text-body)]">{totalItems}</span>
      </p>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="tertiary"
          size="xs"
          onClick={() => {
            onPrevious?.()
            if (!onPrevious) onPageChange(currentPage - 1)
          }}
          disabled={!canPrev}
          aria-label="Previous page"
          className="h-8 min-w-16 px-2.5"
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Prev
        </Button>

        <div className="flex items-center gap-1" role="list">
          {pages.map((page, idx) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${idx}`}
                role="presentation"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-sm leading-none text-[var(--text-body-quiet)]"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "ghost"}
                size="icon"
                onClick={() => onPageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                className="h-8 w-8 shrink-0"
              >
                {page}
              </Button>
            )
          )}
        </div>

        <Button
          variant="tertiary"
          size="xs"
          onClick={() => {
            onNext?.()
            if (!onNext) onPageChange(currentPage + 1)
          }}
          disabled={!canNext}
          aria-label="Next page"
          className="h-8 min-w-16 px-2.5"
        >
          Next
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>
    </nav>
  )
}

export { TablePagination }
export type { TablePaginationProps }
