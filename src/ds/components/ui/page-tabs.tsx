import * as React from "react"
import { cn } from "../../lib/utils"
import { Badge } from "./badge"

interface PageTabItem {
  key: string
  label: string
  disabled?: boolean
  badge?: string | number
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

interface PageTabsProps {
  items: PageTabItem[]
  activeKey?: string
  onTabChange?: (key: string) => void
  shape?: "round" | "square"
  showBorder?: boolean
  className?: string
}

function PageTabs({
  items,
  activeKey,
  onTabChange,
  shape = "round",
  showBorder = true,
  className,
}: PageTabsProps) {
  return (
    <div
      data-slot="page-tabs"
      className={cn(
        "flex items-end",
        showBorder && "border-b border-[var(--border-neutral-quiet)]",
        className
      )}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={isActive}
            aria-disabled={item.disabled}
            disabled={item.disabled}
            data-slot="page-tab"
            onClick={() => !item.disabled && onTabChange?.(item.key)}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-4 py-2.5",
              "text-sm font-semibold transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
              "disabled:pointer-events-none disabled:opacity-40",
              shape === "round" && "rounded-t-lg",
              isActive
                ? "text-[var(--text-action)] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--surface-action-solid)] after:rounded-full"
                : "text-[var(--text-body-quiet)] hover:text-[var(--text-body)] hover:bg-[var(--neutral-object-accent-silent)]"
            )}
          >
            {item.leading}
            {item.label}
            {item.badge !== undefined && (
              <Badge variant="action" size="xs" shape="pill" fill="solid">
                {item.badge}
              </Badge>
            )}
            {item.trailing}
          </button>
        )
      })}
    </div>
  )
}

export { PageTabs }
export type { PageTabsProps, PageTabItem }
