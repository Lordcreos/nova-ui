import * as React from "react"
import { cn } from "../../lib/utils"

interface FileDropZoneProps {
  acceptedFilesExtensions?: string[]
  acceptedFilesMimeTypes?: string
  isDragging?: boolean
  setIsDragging?: (isDragging: boolean) => void
  onFileDrop?: (files: FileList) => void
  onZoneClick?: () => void
  disabled?: boolean
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
  className,
}: FileDropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

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
        "flex flex-col items-center justify-center gap-3 rounded-xl p-6 text-center",
        "border-2 border-dashed border-[var(--border-neutral)] bg-[var(--neutral-foreground)]",
        "cursor-pointer transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30",
        isDragging && [
          "border-[var(--border-contextual-action)] bg-[var(--surface-action-accent-quiet)]",
        ],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFilesMimeTypes}
        className="sr-only"
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full",
          "bg-[var(--neutral-object-accent-quiet)] text-[var(--text-body-quiet)]",
          isDragging && "bg-[var(--surface-action-accent)] text-[var(--text-action)]",
          "transition-colors duration-200"
        )}
      >
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
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[var(--text-body)]">
          {isDragging ? "Drop files here" : "Drop files or click to upload"}
        </p>
        {acceptedFilesExtensions && acceptedFilesExtensions.length > 0 && (
          <p className="text-xs text-[var(--text-body-quiet)]">
            Accepted: {acceptedFilesExtensions.join(", ")}
          </p>
        )}
      </div>
    </div>
  )
}

export { FileDropZone }
export type { FileDropZoneProps }
