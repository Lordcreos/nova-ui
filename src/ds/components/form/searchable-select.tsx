import * as React from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useDebounceCallback } from "usehooks-ts"
import { cn } from "../../lib/utils"
import { inputVariants } from "../ui/input"
import type { VariantProps } from "class-variance-authority"

export interface SearchableSelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
  avatar?: React.ReactNode
  indicator?: React.ReactNode
}

interface SearchableSelectProps extends VariantProps<typeof inputVariants> {
  options: SearchableSelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  isLoading?: boolean
  disabled?: boolean
  hasMore?: boolean
  loadMore?: () => void
  onSearch?: (query: string) => void
  emptyStateMessage?: string
  srOnlyLabel?: string
  id?: string
  className?: string
  "aria-invalid"?: boolean
}

const Spinner = () => (
  <svg className="h-4 w-4 animate-spin text-[var(--text-body-quiet)]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
)

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    className={cn("transition-transform duration-200 text-[var(--text-body-quiet)]", open && "rotate-180")}
  >
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  isLoading,
  disabled,
  hasMore,
  loadMore,
  onSearch,
  emptyStateMessage = "No options found",
  srOnlyLabel,
  id,
  className,
  variant = "md",
  group,
  "aria-invalid": ariaInvalid,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const selectId = id ?? React.useId()
  const listRef = React.useRef<HTMLDivElement>(null)
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredOptions = React.useMemo(() => {
    if (onSearch) return options
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query, onSearch])

  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 40,
    overscan: 5,
  })

  const debouncedSearch = useDebounceCallback((q: string) => {
    onSearch?.(q)
  }, 500)

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  const selectedOption = options.find((o) => o.value === value)

  React.useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore || !loadMore) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !isLoading) loadMore()
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [open])

  return (
    <div data-slot="searchable-select" className="relative w-full">
      {srOnlyLabel && (
        <label htmlFor={selectId} className="sr-only">
          {srOnlyLabel}
        </label>
      )}

      {/* Trigger */}
      <button
        id={selectId}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          inputVariants({ variant, group }),
          "cursor-pointer justify-between text-left",
          !selectedOption && "text-[var(--text-body-quiet)]",
          className
        )}
      >
        <span className="flex-1 truncate">
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon}
              {selectedOption.avatar}
              {selectedOption.label}
            </span>
          ) : placeholder}
        </span>
        {isLoading ? <Spinner /> : <ChevronDown open={open} />}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          data-slot="searchable-select-content"
          className={cn(
            "absolute z-50 mt-1 w-full overflow-hidden",
            "rounded-xl border border-[var(--border-neutral)] bg-[var(--neutral-object)]",
            "shadow-[var(--shadow-neutral-md)]",
            "animate-[zoom-in_0.15s_ease-out]"
          )}
        >
          {/* Search */}
          <div className="border-b border-[var(--border-neutral-quiet)] px-2 py-2">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full rounded-lg px-3 py-1.5 text-sm",
                "bg-[var(--neutral-foreground)] text-[var(--text-body)]",
                "placeholder:text-[var(--text-body-quiet)]",
                "border border-[var(--border-neutral)]",
                "focus:outline-none focus:border-[var(--border-contextual-action)]",
                "focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/20"
              )}
            />
          </div>

          {/* Virtual list */}
          <div
            ref={listRef}
            role="listbox"
            aria-label={srOnlyLabel}
            className="overflow-y-auto p-1"
            style={{ maxHeight: "240px" }}
          >
            {isLoading && filteredOptions.length === 0 ? (
              <div className="flex items-center justify-center py-6">
                <Spinner />
              </div>
            ) : filteredOptions.length === 0 ? (
              <p className="py-6 text-center text-sm text-[var(--text-body-quiet)]">
                {emptyStateMessage}
              </p>
            ) : (
              <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
                {virtualizer.getVirtualItems().map((virtualItem) => {
                  const option = filteredOptions[virtualItem.index]
                  if (!option) return null
                  const isSelected = option.value === value
                  return (
                    <div
                      key={virtualItem.key}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${virtualItem.start}px)`,
                        height: `${virtualItem.size}px`,
                      }}
                      onClick={() => {
                        if (!option.disabled) {
                          onValueChange?.(option.value)
                          setOpen(false)
                        }
                      }}
                      className={cn(
                        "flex cursor-pointer items-center gap-2 rounded-lg px-3 text-sm text-[var(--text-body)]",
                        "transition-colors duration-100",
                        isSelected
                          ? "bg-[var(--surface-action-accent-quiet)] text-[var(--text-action)] font-medium"
                          : "hover:bg-[var(--neutral-object-accent-quiet)]",
                        option.disabled && "pointer-events-none opacity-50"
                      )}
                    >
                      {option.indicator}
                      {option.icon}
                      {option.avatar}
                      <span className="flex-1 truncate">{option.label}</span>
                      {isSelected && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                          <path d="M1 4.5L4.5 8L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
            {/* Infinite load sentinel */}
            <div ref={sentinelRef} className="h-1" />
            {isLoading && filteredOptions.length > 0 && (
              <div className="flex justify-center py-2">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop to close */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export { SearchableSelect }
export type { SearchableSelectProps }
