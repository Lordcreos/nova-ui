import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "../../lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

function PopoverContent({
  className,
  align = "center",
  sideOffset = 6,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-xl p-4",
          "bg-[var(--neutral-object)] border border-[var(--border-neutral)]",
          "shadow-[var(--shadow-neutral-md)]",
          "outline-none",
          "data-[state=open]:animate-[zoom-in_0.15s_ease-out]",
          "data-[state=closed]:animate-[zoom-out_0.1s_ease-in]",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverClose({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={cn(
        "absolute right-3 top-3 rounded-md p-0.5 text-[var(--text-body-quiet)]",
        "hover:text-[var(--text-body)] hover:bg-[var(--neutral-object-accent-quiet)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
        className
      )}
      {...props}
    />
  )
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose }
