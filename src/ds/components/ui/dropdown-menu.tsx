import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "../../lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

function DropdownMenuContent({
  className,
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[10rem] overflow-hidden rounded-xl p-1",
          "bg-[var(--neutral-object)] border border-[var(--border-neutral)]",
          "shadow-[var(--shadow-neutral-md)]",
          "data-[state=open]:animate-[zoom-in_0.15s_ease-out]",
          "data-[state=closed]:animate-[zoom-out_0.1s_ease-in]",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

const dropdownItemBase = [
  "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2",
  "text-sm text-[var(--text-body)] outline-none transition-colors duration-100",
  "hover:bg-[var(--neutral-object-accent-quiet)] focus:bg-[var(--neutral-object-accent-quiet)]",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
]

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-item"
      className={cn(dropdownItemBase, inset && "pl-8", className)}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-checkbox-item"
      className={cn(dropdownItemBase, "pl-8", className)}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2.5 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path d="M1 3.5L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-radio-item"
      className={cn(dropdownItemBase, "pl-8", className)}
      {...props}
    >
      <span className="absolute left-2.5 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="h-2 w-2 rounded-full bg-[var(--surface-action-solid)]" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-label"
      className={cn("px-3 py-1.5 text-xs font-semibold text-[var(--text-body-quiet)]", inset && "pl-8", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--border-neutral-quiet)]", className)}
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-sub-trigger"
      className={cn(dropdownItemBase, "data-[state=open]:bg-[var(--neutral-object-accent-quiet)]", inset && "pl-8", className)}
      {...props}
    >
      {children}
      <svg className="ml-auto h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-sub-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-xl p-1",
        "bg-[var(--neutral-object)] border border-[var(--border-neutral)]",
        "shadow-[var(--shadow-neutral-md)]",
        "data-[state=open]:animate-[zoom-in_0.15s_ease-out]",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
}
