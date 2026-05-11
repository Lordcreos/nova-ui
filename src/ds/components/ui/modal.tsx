import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Icon } from "./icon"

/* ============================================================
   SIZES
   ============================================================ */

const modalContentVariants = cva(
  [
    "relative flex flex-col",
    "bg-[var(--neutral-object)] rounded-2xl border border-[var(--border-neutral-quiet)]",
    "shadow-[var(--shadow-neutral-2xl)]",
    "outline-none",
    // entrance animation
    "data-[state=open]:animate-[fade-in_0.15s_ease-out,scale-in_0.15s_ease-out]",
    "data-[state=closed]:animate-[fade-out_0.1s_ease-in]",
  ],
  {
    variants: {
      size: {
        xs:  "w-full max-w-xs",
        sm:  "w-full max-w-sm",
        md:  "w-full max-w-md",
        lg:  "w-full max-w-lg",
        xl:  "w-full max-w-xl",
        "2xl": "w-full max-w-2xl",
        full: "w-full max-w-none h-full rounded-none",
      },
    },
    defaultVariants: { size: "md" },
  }
)

/* ============================================================
   PRIMITIVES — re-export root pieces unchanged
   ============================================================ */

const Modal       = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger
const ModalClose   = DialogPrimitive.Close
const ModalPortal  = DialogPrimitive.Portal

/* ============================================================
   OVERLAY
   ============================================================ */

function ModalOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
        "data-[state=open]:animate-[fade-in_0.15s_ease-out]",
        "data-[state=closed]:animate-[fade-out_0.1s_ease-in]",
        className
      )}
      {...props}
    />
  )
}

/* ============================================================
   CONTENT
   ============================================================ */

type ModalContentProps = React.ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof modalContentVariants>

function ModalContent({ size, className, children, ...props }: ModalContentProps) {
  return (
    <ModalPortal>
      <ModalOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPrimitive.Content
          data-slot="modal-content"
          className={cn(modalContentVariants({ size }), className)}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </div>
    </ModalPortal>
  )
}

/* ============================================================
   HEADER
   ============================================================ */

function ModalHeader({
  className,
  showClose = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { showClose?: boolean }) {
  return (
    <div
      data-slot="modal-header"
      className={cn(
        "flex items-start justify-between gap-4 px-6 pt-6 pb-4",
        "border-b border-[var(--border-neutral-quiet)]",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {showClose && (
        <ModalClose asChild>
          <Button
            variant="ghost"
            size="xs"
            aria-label="Close"
            className="-mt-1 -mr-2 flex-shrink-0"
          >
            <Icon name="x" size="sm" />
          </Button>
        </ModalClose>
      )}
    </div>
  )
}

/* ============================================================
   TITLE & DESCRIPTION
   ============================================================ */

function ModalTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="modal-title"
      className={cn("text-h4 font-semibold text-[var(--text-heading)]", className)}
      {...props}
    />
  )
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="modal-description"
      className={cn("mt-1 text-sm text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

/* ============================================================
   BODY
   ============================================================ */

function ModalBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="modal-body"
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...props}
    />
  )
}

/* ============================================================
   FOOTER
   ============================================================ */

function ModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="modal-footer"
      className={cn(
        "flex items-center justify-end gap-2 px-6 py-4",
        "border-t border-[var(--border-neutral-quiet)]",
        className
      )}
      {...props}
    />
  )
}

/* ============================================================
   ALERT MODAL  (destructive confirmation pattern)
   Wraps Radix AlertDialog — cannot be closed by clicking outside.
   ============================================================ */

const AlertModal         = AlertDialogPrimitive.Root
const AlertModalTrigger  = AlertDialogPrimitive.Trigger
const AlertModalPortal   = AlertDialogPrimitive.Portal
const AlertModalCancel   = AlertDialogPrimitive.Cancel
const AlertModalAction   = AlertDialogPrimitive.Action

function AlertModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-modal-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
        "data-[state=open]:animate-[fade-in_0.15s_ease-out]",
        "data-[state=closed]:animate-[fade-out_0.1s_ease-in]",
        className
      )}
      {...props}
    />
  )
}

function AlertModalContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertModalPortal>
      <AlertModalOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <AlertDialogPrimitive.Content
          data-slot="alert-modal-content"
          className={cn(
            "relative w-full max-w-md flex flex-col",
            "bg-[var(--neutral-object)] rounded-2xl border border-[var(--border-neutral-quiet)]",
            "shadow-[var(--shadow-neutral-2xl)]",
            "outline-none",
            "data-[state=open]:animate-[fade-in_0.15s_ease-out,scale-in_0.15s_ease-out]",
            "data-[state=closed]:animate-[fade-out_0.1s_ease-in]",
            className
          )}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </div>
    </AlertModalPortal>
  )
}

function AlertModalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-modal-header"
      className={cn("px-6 pt-6 pb-4 border-b border-[var(--border-neutral-quiet)]", className)}
      {...props}
    />
  )
}

function AlertModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-modal-title"
      className={cn("text-h4 font-semibold text-[var(--text-heading)]", className)}
      {...props}
    />
  )
}

function AlertModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-modal-description"
      className={cn("mt-1 text-sm text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

function AlertModalBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-modal-body"
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...props}
    />
  )
}

function AlertModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-modal-footer"
      className={cn(
        "flex items-center justify-end gap-2 px-6 py-4",
        "border-t border-[var(--border-neutral-quiet)]",
        className
      )}
      {...props}
    />
  )
}

/* ============================================================
   EXPORTS
   ============================================================ */

export {
  // Standard Modal
  Modal,
  ModalTrigger,
  ModalClose,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,

  // Alert Modal (destructive confirmation)
  AlertModal,
  AlertModalTrigger,
  AlertModalPortal,
  AlertModalOverlay,
  AlertModalContent,
  AlertModalHeader,
  AlertModalTitle,
  AlertModalDescription,
  AlertModalBody,
  AlertModalFooter,
  AlertModalCancel,
  AlertModalAction,
}
