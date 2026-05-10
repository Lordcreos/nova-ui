import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { cn } from "../../lib/utils"

const Accordion = AccordionPrimitive.Root

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-[var(--border-neutral-quiet)] last:border-b-0", className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = React.ComponentProps<typeof AccordionPrimitive.Trigger> & {
  icon?: React.ReactNode
}

function AccordionTrigger({ className, children, icon, ...props }: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex" asChild={false}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-2",
          "py-4 px-0 text-sm font-semibold text-[var(--text-body)] text-left",
          "transition-all duration-200",
          "hover:text-[var(--text-heading)]",
          "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30 rounded-lg",
          "group",
          className
        )}
        {...props}
      >
        {children}
        <span className="shrink-0 text-[var(--text-body-quiet)] transition-transform duration-200 group-data-[state=open]:rotate-180">
          {icon ?? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-[var(--text-body)]",
        "data-[state=open]:animate-[accordion-down_0.2s_ease-out]",
        "data-[state=closed]:animate-[accordion-up_0.2s_ease-out]"
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
