import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const avatarVariants = cva("relative inline-flex shrink-0 overflow-hidden", {
  variants: {
    size: {
      "2xs": "h-6 w-6",
      xs: "h-7 w-7",
      sm: "h-8 w-8",
      md: "h-9 w-9",
      lg: "h-10 w-10",
      xl: "h-11 w-11",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-lg",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
})

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center font-semibold text-[var(--text-on-solid)] text-xs select-none",
  {
    variants: {
      color: {
        action: "",
        success: "",
        info: "",
        warning: "",
        danger: "",
        neutral: "",
      },
      type: {
        ghost: "text-current border-2",
        icon: "",
        solid: "",
      },
    },
    compoundVariants: [
      /* SOLID */
      { color: "action", type: "solid", className: "bg-[var(--surface-action-solid)]" },
      { color: "success", type: "solid", className: "bg-[var(--surface-success-solid)]" },
      { color: "info", type: "solid", className: "bg-[var(--surface-info-solid)]" },
      { color: "warning", type: "solid", className: "bg-[var(--surface-warning-solid)]" },
      { color: "danger", type: "solid", className: "bg-[var(--surface-danger-solid)]" },
      { color: "neutral", type: "solid", className: "bg-[var(--color-gray-600)]" },
      /* GHOST */
      {
        color: "action",
        type: "ghost",
        className:
          "bg-[var(--surface-action-accent-quiet)] text-[var(--text-action)] border-[var(--border-contextual-action)]",
      },
      {
        color: "success",
        type: "ghost",
        className:
          "bg-[var(--surface-success-accent-quiet)] text-[var(--text-success)] border-[var(--border-contextual-success)]",
      },
      {
        color: "info",
        type: "ghost",
        className:
          "bg-[var(--surface-info-accent-quiet)] text-[var(--text-info)] border-[var(--border-contextual-info)]",
      },
      {
        color: "warning",
        type: "ghost",
        className:
          "bg-[var(--surface-warning-accent-quiet)] text-[var(--text-warning)] border-[var(--border-contextual-warning)]",
      },
      {
        color: "danger",
        type: "ghost",
        className:
          "bg-[var(--surface-danger-accent-quiet)] text-[var(--text-danger)] border-[var(--border-contextual-danger)]",
      },
      {
        color: "neutral",
        type: "ghost",
        className:
          "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body)] border-[var(--border-neutral)]",
      },
      /* ICON (same bg as solid, just for icon avatars) */
      { color: "action", type: "icon", className: "bg-[var(--surface-action-accent-quiet)] text-[var(--text-action)]" },
      { color: "success", type: "icon", className: "bg-[var(--surface-success-accent-quiet)] text-[var(--text-success)]" },
      { color: "info", type: "icon", className: "bg-[var(--surface-info-accent-quiet)] text-[var(--text-info)]" },
      { color: "warning", type: "icon", className: "bg-[var(--surface-warning-accent-quiet)] text-[var(--text-warning)]" },
      { color: "danger", type: "icon", className: "bg-[var(--surface-danger-accent-quiet)] text-[var(--text-danger)]" },
      {
        color: "neutral",
        type: "icon",
        className: "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body-quiet)]",
      },
    ],
    defaultVariants: {
      color: "neutral",
      type: "solid",
    },
  }
)

type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>

function Avatar({ size, shape, className, ...props }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape, className }))}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
}

type AvatarFallbackProps = React.ComponentProps<typeof AvatarPrimitive.Fallback> &
  VariantProps<typeof avatarFallbackVariants>

function AvatarFallback({ color, type, className, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(avatarFallbackVariants({ color, type, className }))}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants, avatarFallbackVariants }
export type { AvatarProps, AvatarFallbackProps }
