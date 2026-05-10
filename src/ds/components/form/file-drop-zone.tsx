import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const fileDropZoneVariants = cva(
  [
    "flex flex-col items-center justify-center text-center",
    "border-2 border-dashed bg-[var(--neutral-foreground)]",
    "cursor-pointer transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
  ],
  {
    variants: {
      variant: {
        neutral: "border-[var(--border-neutral)]",
        action: "border-[var(--border-contextual-action-quiet)] bg-[var(--surface-action-accent-quiet)]",
        success: "border-[var(--border-contextual-success-quiet)] bg-[var(--surface-success-accent-quiet)]",
        info: "border-[var(--border-contextual-info-quiet)] bg-[var(--surface-info-accent-quiet)]",
        warning: "border-[var(--border-contextual-warning-quiet)] bg-[var(--surface-warning-accent-quiet)]",
        danger: "border-[var(--border-contextual-danger-quiet)] bg-[var(--surface-danger-accent-quiet)]",
      },
      size: {
        sm: "gap-2 rounded-lg p-4",
        default: "gap-3 rounded-xl p-6",
        lg: "gap-4 rounded-xl p-8",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "default",
    },
  }
)

const iconToneByVariant = {
  neutral: "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body-quiet)]",
  action: "bg-[var(--surface-action-accent)] text-[var(--text-action)]",
  success: "bg-[var(--surface-success-accent)] text-[var(--text-success)]",
  info: "bg-[var(--surface-info-accent)] text-[var(--text-info)]",
  warning: "bg-[var(--surface-warning-accent)] text-[var(--text-warning)]",
  danger: "bg-[var(--surface-danger-accent)] text-[var(--text-danger)]",
} as const

interface FileDropZoneProps extends VariantProps<typeof fileDropZoneVariants> {
  acceptedFilesExtensions?: string[]
  acceptedFilesMimeTypes?: string
  isDragging?: boolean
  setIsDragging?: (isDragging: boolean) => void
  onFileDrop?: (files: FileList) => void
  onZoneClick?: () => void
  disabled?: boolean
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

function FileDropZone({
  acceptedFilesExtensions,
  acceptedFilesMimeTypes,
  isDragging,
  setIsDragging,
  onFileDrop,
  onZoneClick,
  disabled,
  variant = "neutral",
  size = "default",
  title,
  description,
  icon,
  className,
}: FileDropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const tone = variant ?? "neutral"

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging?.(true)
  }

  const handleDragLeave = () => {
    setIsDragging?.(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging?.(false)
    if (e.dataTransfer.files.length > 0) {
      onFileDrop?.(e.dataTransfer.files)
    }
  }

  const handleClick = () => {
    if (disabled) return
    onZoneClick ? onZoneClick() : inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileDrop?.(e.target.files)
      e.target.value = ""
    }
  }

  return (
    <div
      data-slot="file-drop-zone"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        fileDropZoneVariants({ variant: tone, size }),
        isDragging && [
          "border-[var(--border-contextual-action)] bg-[var(--surface-action-accent-quiet)]",
        ],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFilesMimeTypes}
        className="sr-only"
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          size === "sm" ? "h-10 w-10" : size === "lg" ? "h-14 w-14" : "h-12 w-12",
          iconToneByVariant[tone],
          isDragging && "bg-[var(--surface-action-accent)] text-[var(--text-action)]",
          "transition-colors duration-200"
        )}
      >
        {icon ?? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className={cn("transition-transform duration-200", isDragging && "-translate-y-1")}
          >
            {isDragging ? (
              <path d="M12 4V16M12 4L8 8M12 4L16 8M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M12 16V4M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[var(--text-body)]">
          {isDragging ? "Drop files here" : title ?? "Drop files or click to upload"}
        </p>
        {description && <p className="text-xs text-[var(--text-body-quiet)]">{description}</p>}
        {!description && acceptedFilesExtensions && acceptedFilesExtensions.length > 0 && (
          <p className="text-xs text-[var(--text-body-quiet)]">
            Accepted: {acceptedFilesExtensions.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}

export { FileDropZone, fileDropZoneVariants }
export type { FileDropZoneProps }
