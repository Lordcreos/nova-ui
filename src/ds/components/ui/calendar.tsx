import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "../../lib/utils"

type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  navLayout = "around",
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      data-slot="calendar"
      navLayout={navLayout}
      showOutsideDays={showOutsideDays}
      className={cn("w-fit p-3 text-[var(--text-body)]", className)}
      classNames={{
        root: "w-fit",
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-4",
        month_caption: "relative flex h-8 items-center justify-center px-9",
        caption_label: "text-sm font-semibold text-[var(--text-heading)]",
        nav: "hidden",
        button_previous: cn(
          "absolute left-1 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg",
          "border border-[var(--border-neutral)] bg-[var(--neutral-object)]",
          "text-[var(--text-body-quiet)] transition-colors duration-150",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-body)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
          "aria-disabled:pointer-events-none aria-disabled:opacity-40"
        ),
        button_next: cn(
          "absolute right-1 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg",
          "border border-[var(--border-neutral)] bg-[var(--neutral-object)]",
          "text-[var(--text-body-quiet)] transition-colors duration-150",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-body)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
          "aria-disabled:pointer-events-none aria-disabled:opacity-40"
        ),
        chevron: "h-4 w-4 fill-current",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 rounded-md text-center text-[0.8rem] font-semibold text-[var(--text-body-quiet)]",
        weeks: "block",
        week: "mt-2 flex w-full",
        day: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day_button: cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-lg p-0",
          "text-sm font-normal text-[var(--text-body)] transition-colors duration-100",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-heading)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30"
        ),
        selected: cn(
          "[&>button]:bg-[var(--surface-action-solid)]",
          "[&>button]:font-semibold [&>button]:text-[var(--text-on-solid)]",
          "[&>button]:hover:bg-[var(--surface-action-solid-hover)]",
          "[&>button]:hover:text-[var(--text-on-solid)]"
        ),
        today:
          "[&>button]:bg-[var(--neutral-object-accent-quiet)] [&>button]:font-semibold [&>button]:text-[var(--text-heading)]",
        outside: "[&>button]:text-[var(--text-body-quiet)] [&>button]:opacity-50",
        disabled: "[&>button]:text-[var(--text-on-disabled)] [&>button]:opacity-50",
        range_start:
          "rounded-l-lg bg-[var(--surface-action-accent-quiet)] [&>button]:bg-[var(--surface-action-solid)] [&>button]:text-[var(--text-on-solid)]",
        range_middle:
          "bg-[var(--surface-action-accent-quiet)] [&>button]:text-[var(--text-action)] [&>button]:hover:bg-transparent",
        range_end:
          "rounded-r-lg bg-[var(--surface-action-accent-quiet)] [&>button]:bg-[var(--surface-action-solid)] [&>button]:text-[var(--text-on-solid)]",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}

export { Calendar }
export type { CalendarProps }
