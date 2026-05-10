import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { inputVariants } from "./input"

const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

/* Spinner for isLoading state */
const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin text-[var(--text-body-quiet)]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
)

/* Chevron icon */
const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const selectTriggerVariants = cva(
  "flex w-full cursor-pointer items-center justify-between gap-2 text-left",
  {
    variants: {
      variant: {
        xs: "",
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: { variant: "md" },
  }
)

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants> &
  VariantProps<typeof inputVariants> & {
    isLoading?: boolean
  }

type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> &
  Pick<SelectTriggerProps, "group" | "variant">

function Select({ group, variant, children, ...props }: SelectProps) {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== SelectTrigger) return child
    const trigger = child as React.ReactElement<SelectTriggerProps>

    return React.cloneElement(trigger, {
      group: trigger.props.group ?? group,
      variant: trigger.props.variant ?? variant,
    })
  })

  return <SelectPrimitive.Root {...props}>{enhancedChildren}</SelectPrimitive.Root>
}

function SelectTrigger({
  variant,
  group,
  isLoading,
  className,
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        inputVariants({ variant, group }),
        "group cursor-pointer",
        className
      )}
      {...props}
    >
      <span className="flex-1 truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        {isLoading ? (
          <Spinner />
        ) : (
          <ChevronDown className="shrink-0 text-[var(--text-body-quiet)] transition-transform duration-200 group-data-[state=open]:rotate-180" />
        )}
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "relative z-50 min-w-[8rem] overflow-hidden",
          "rounded-xl border border-[var(--border-neutral)] bg-[var(--neutral-object)]",
          "shadow-[var(--shadow-neutral-md)]",
          "data-[state=open]:animate-[zoom-in_0.15s_ease-out]",
          "data-[state=closed]:animate-[zoom-out_0.1s_ease-in]",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2",
        "rounded-lg px-3 py-2 text-sm text-[var(--text-body)] outline-none",
        "transition-colors duration-100",
        "hover:bg-[var(--neutral-object-accent-quiet)]",
        "focus:bg-[var(--neutral-object-accent-quiet)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[state=checked]:text-[var(--text-action)] data-[state=checked]:font-medium",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="ml-auto">
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
          <path
            d="M1 4.5L4.5 8L11 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--border-neutral-quiet)]", className)}
      {...props}
    />
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-3 py-1.5 text-xs font-semibold text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectLabel,
}
