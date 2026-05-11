import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { Toaster as SonnerProvider } from "sonner"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback } from "./avatar"
import { Icon } from "./icon"
import { Button } from "./button"

const ToastProvider = ToastPrimitive.Provider

function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
}

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden",
    "rounded-xl border p-4 pr-6",
    "shadow-[var(--shadow-neutral-lg)]",
    "transition-all duration-300",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
    "data-[state=open]:animate-[slide-in-from-bottom_0.2s_ease-out]",
    "data-[state=closed]:animate-[fade-out_0.15s_ease-in]",
  ],
  {
    variants: {
      variant: {
        default: "bg-[var(--neutral-object)] border-[var(--border-neutral)] text-[var(--text-body)]",
        success: "bg-[var(--surface-success-accent-quiet)] border-[var(--border-contextual-success-quiet)] text-[var(--text-success)]",
        danger: "bg-[var(--surface-danger-accent-quiet)] border-[var(--border-contextual-danger-quiet)] text-[var(--text-danger)]",
        warning: "bg-[var(--surface-warning-accent-quiet)] border-[var(--border-contextual-warning-quiet)] text-[var(--text-warning)]",
        info: "bg-[var(--surface-info-accent-quiet)] border-[var(--border-contextual-info-quiet)] text-[var(--text-info)]",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

type ToastProps = React.ComponentProps<typeof ToastPrimitive.Root> &
  VariantProps<typeof toastVariants>

function Toast({ variant, className, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(toastVariants({ variant, className }))}
      {...props}
    />
  )
}

function ToastAction({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Action>) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg border border-[var(--border-neutral)] px-3 py-1.5",
        "text-xs font-semibold text-[var(--text-body)]",
        "transition-colors hover:bg-[var(--neutral-object-accent-quiet)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
        className
      )}
      {...props}
    />
  )
}

function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      toast-close=""
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-[var(--text-body-quiet)] opacity-0",
        "transition-opacity group-hover:opacity-100",
        "hover:text-[var(--text-body)] hover:bg-[var(--neutral-object-accent-quiet)]",
        "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
        className
      )}
      {...props}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </ToastPrimitive.Close>
  )
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-semibold text-[var(--text-heading)]", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}

// ─── Sonner-based Toast system ────────────────────────────────────────────────

interface CustomToastProps {
  type: "success" | "error" | "info" | "warning"
  title: string
  description?: string
  customIcon?: React.ReactNode
  customAction?: React.ReactNode
  dismiss: () => void
}

function CustomToast({
  type,
  title,
  description,
  customIcon,
  customAction,
  dismiss,
}: CustomToastProps) {
  const getIcon = () => {
    if (customIcon) return customIcon
    switch (type) {
      case "success":
        return (
          <Avatar shape="square" size="xs">
            <AvatarFallback color="success" type="icon">
              <Icon name="circle-check" size="sm" />
            </AvatarFallback>
          </Avatar>
        )
      case "error":
        return (
          <Avatar shape="square" size="xs">
            <AvatarFallback color="danger" type="icon">
              <Icon name="circle-x" size="sm" />
            </AvatarFallback>
          </Avatar>
        )
      case "info":
        return (
          <Avatar shape="square" size="xs">
            <AvatarFallback color="action" type="icon">
              <Icon name="info" size="sm" />
            </AvatarFallback>
          </Avatar>
        )
      case "warning":
        return (
          <Avatar shape="square" size="xs">
            <AvatarFallback color="warning" type="icon">
              <Icon name="triangle-alert" size="sm" />
            </AvatarFallback>
          </Avatar>
        )
    }
  }

  return (
    <div
      className={cn(
        "w-screen max-w-[416px] p-3 bg-[var(--neutral-object)] shadow-[var(--shadow-neutral-lg)]",
        "flex justify-between gap-2.5 rounded-xl border border-[var(--border-neutral-quiet)]",
        customAction && "items-center",
      )}
    >
      <div className="flex items-start gap-2.5">
        <div>{getIcon()}</div>
        <div>
          <p className="text-sm font-semibold text-[var(--text-heading)] leading-snug">{title}</p>
          {description && (
            <p className="text-xs text-[var(--text-body-quiet)] mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <div className={cn(customAction && "flex items-center")}>
        {customAction ?? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Cerrar notificación"
            onClick={dismiss}
          >
            <Icon name="x" size="sm" />
          </Button>
        )}
      </div>
    </div>
  )
}

/**
 * Drop this once anywhere near the root of your app (e.g. in App.tsx).
 * It renders the Sonner portal that displays CustomToast notifications.
 */
function SonnerToaster(props: React.ComponentProps<typeof SonnerProvider>) {
  return (
    <SonnerProvider
      position="bottom-right"
      toastOptions={{ unstyled: true }}
      {...props}
    />
  )
}

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  Toaster,
  CustomToast,
  SonnerToaster,
}
export type { ToastProps, CustomToastProps }
