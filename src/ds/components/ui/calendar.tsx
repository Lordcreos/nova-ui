import * as React from "react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
import { cn } from "../../lib/utils"

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  months?: readonly string[]
  navigationVariant?: "buttons" | "select"
}

const navBtn = cn(
  "inline-flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg p-0",
  "border border-[var(--border-neutral)] bg-[var(--neutral-object)]",
  "text-[var(--text-body-quiet)] transition-colors duration-150",
  "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-body)]",
  "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
  "aria-disabled:pointer-events-none aria-disabled:opacity-40"
)

const defaultMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const weekdayNames: Record<string, string> = {
  sunday: "Sun",
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
}

function normalizeLabel(value: React.ReactNode) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function getMonthName(months: readonly string[], monthIndex: number) {
  return months[monthIndex] ?? defaultMonths[monthIndex] ?? ""
}

function Calendar({
  className,
  classNames,
  captionLayout,
  components,
  formatters,
  months = defaultMonths,
  navigationVariant = "buttons",
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  const resolvedCaptionLayout = captionLayout ?? (navigationVariant === "select" ? "dropdown" : "label")

  return (
    <DayPicker
      data-slot="calendar"
      captionLayout={resolvedCaptionLayout}
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar w-full max-w-[20rem] rounded-lg bg-[var(--neutral-object)] p-2 text-[var(--text-body)] sm:w-[279px] sm:max-w-none sm:p-3",
        className
      )}
      formatters={{
        formatMonthDropdown: (date) => getMonthName(months, date.getMonth()).slice(0, 3),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full sm:w-fit", defaultClassNames.root),
        months: cn("relative flex w-full flex-col gap-4 sm:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-0 pb-0.5", defaultClassNames.month),
        month_caption: cn(
          "flex h-10 w-full items-center px-2 py-1",
          resolvedCaptionLayout === "label" ? "justify-start" : "justify-center pr-[4.75rem]",
          defaultClassNames.month_caption
        ),
        caption_label: cn(
          "select-none text-sm font-semibold text-[var(--text-heading)]",
          resolvedCaptionLayout === "label"
            ? "leading-7"
            : "inline-flex h-full w-full items-center justify-center gap-1.5 whitespace-nowrap px-2.5 leading-none [&>svg]:h-3.5 [&>svg]:w-3.5",
          defaultClassNames.caption_label
        ),
        dropdowns: cn("flex h-8 w-full items-center justify-center gap-2 text-sm font-semibold", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "relative inline-flex h-8 min-w-[4.75rem] items-center justify-center overflow-hidden rounded-lg border border-[var(--border-neutral)]",
          "bg-[var(--neutral-object)] text-sm font-semibold text-[var(--text-heading)]",
          "transition-colors duration-150 hover:bg-[var(--neutral-object-accent-quiet)]",
          "has-focus:ring-[3px] has-focus:ring-[var(--ring-action)]/30",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed", defaultClassNames.dropdown),
        months_dropdown: cn("min-w-[5.5rem]", defaultClassNames.months_dropdown),
        years_dropdown: cn("min-w-[4.5rem]", defaultClassNames.years_dropdown),
        nav: cn("absolute inset-x-0 top-1 flex w-full items-center justify-end gap-1 pr-1", defaultClassNames.nav),
        button_previous: cn(navBtn, defaultClassNames.button_previous),
        button_next: cn(navBtn, defaultClassNames.button_next),
        chevron: cn("h-4 w-4 shrink-0 fill-current", defaultClassNames.chevron),
        month_grid: cn("w-full table-fixed border-collapse", defaultClassNames.month_grid),
        weekdays: cn("flex w-full items-center justify-between border-b border-[var(--border-neutral)] p-1 text-center", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 select-none text-center text-xs font-semibold uppercase leading-5 text-[var(--text-body-quiet)]",
          defaultClassNames.weekday
        ),
        weeks: cn("block p-0.5", defaultClassNames.weeks),
        week: cn("flex h-9 w-full p-0.5", defaultClassNames.week),
        day: cn(
          "relative aspect-square h-8 w-full select-none p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:first-child[data-selected=true]]:rounded-l-lg [&:last-child[data-selected=true]]:rounded-r-lg",
          defaultClassNames.day
        ),
        day_button: cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full p-0",
          "text-sm font-normal text-[var(--text-body)] transition-colors duration-100",
          "hover:bg-[var(--neutral-object-accent-quiet)] hover:text-[var(--text-heading)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
          defaultClassNames.day_button
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
          "rounded-l-full bg-[linear-gradient(90deg,transparent_50%,var(--surface-action-accent-quiet)_50%)] [&>button]:bg-[var(--surface-action-solid)] [&>button]:text-[var(--text-on-solid)]",
        range_middle:
          "rounded-none bg-[var(--surface-action-accent-quiet)] [&>button]:text-[var(--text-on-solid)] [&>button]:hover:text-[var(--text-on-solid)]",
        range_end:
          "rounded-r-full bg-[linear-gradient(90deg,var(--surface-action-accent-quiet)_50%,transparent_50%)] [&>button]:bg-[var(--surface-action-solid)] [&>button]:text-[var(--text-on-solid)]",
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Weekday: ({ className, children, ...weekdayProps }) => {
          const label = normalizeLabel(weekdayProps["aria-label"] ?? children)
          const day = weekdayNames[label] ?? children

          return (
            <div className={cn(className)} {...weekdayProps}>
              {day}
            </div>
          )
        },
        MonthCaption: ({ className, calendarMonth, children, ...captionProps }) => (
          <div className={cn(className)} {...captionProps}>
            {resolvedCaptionLayout === "label" ? (
              <span className="block w-full text-lg font-semibold leading-7 text-[var(--text-heading)]">
                {getMonthName(months, calendarMonth.date.getMonth())} {calendarMonth.date.getFullYear()}
              </span>
            ) : (
              children
            )}
          </div>
        ),
        Root: ({ className, rootRef, ...rootProps }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(className, "bg-[var(--neutral-object)]")} {...rootProps} />
        ),
        Chevron: ({ className, orientation }) => {
          if (orientation === "left") {
            return <CalendarChevron className={className} orientation="left" />
          }

          if (orientation === "right") {
            return <CalendarChevron className={className} orientation="right" />
          }

          return <CalendarChevron className={className} orientation="down" />
        },
        DayButton: CalendarDayButton,
        Day: ({ className, modifiers, day: _day, ...dayProps }) => (
          <td
            {...dayProps}
            className={cn(className, modifiers?.range_end && modifiers?.range_start && "bg-transparent")}
          />
        ),
        WeekNumber: ({ children, ...weekNumberProps }) => (
          <td {...weekNumberProps}>
            <div className="flex items-center justify-center text-center">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-today={modifiers.today}
      className={cn(
        "h-8 w-8 rounded-full text-sm font-normal leading-5 transition-colors duration-100",
        "hover:bg-[var(--neutral-object-accent-quiet)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
        "data-[selected-single=true]:bg-[var(--surface-action-solid)] data-[selected-single=true]:font-semibold data-[selected-single=true]:text-[var(--text-on-solid)]",
        "data-[range-start=true]:bg-[var(--surface-action-solid)] data-[range-start=true]:text-[var(--text-on-solid)]",
        "data-[range-end=true]:bg-[var(--surface-action-solid)] data-[range-end=true]:text-[var(--text-on-solid)]",
        "data-[range-middle=true]:bg-[var(--surface-action-solid)] data-[range-middle=true]:text-[var(--text-on-solid)]",
        "data-[today=true]:font-semibold data-[today=true]:text-[var(--text-heading)]",
        "data-[today=true]:data-[range-start=true]:text-[var(--text-on-solid)]",
        "data-[today=true]:data-[range-end=true]:text-[var(--text-on-solid)]",
        "data-[today=true]:data-[range-middle=true]:text-[var(--text-on-solid)]",
        "disabled:text-[var(--text-on-disabled)] disabled:opacity-50",
        defaultClassNames.day_button,
        className
      )}
      {...props}
    />
  )
}

function CalendarChevron({
  className,
  orientation,
}: {
  className?: string
  orientation: "left" | "right" | "down"
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={cn(
        "h-4 w-4 fill-none stroke-current stroke-2",
        orientation === "left" && "rotate-180",
        orientation === "down" && "rotate-90",
        className
      )}
    >
      <path d="M6 3.5 10.5 8 6 12.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export { Calendar, CalendarDayButton }
export type { CalendarProps }
