import * as React from "react"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Icon } from "../ui/icon"

type FileItemColor = "neutral" | "success" | "warning" | "danger" | "action"

const colorIconMap: Record<FileItemColor, string> = {
  neutral: "file",
  success: "file-check",
  warning: "file-exclamation",
  danger: "file-xmark",
  action: "file-arrow-up",
}

const colorAvatarMap: Record<FileItemColor, React.ComponentProps<typeof AvatarFallback>["color"]> = {
  neutral: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
  action: "action",
}

interface FileItemProps {
  fileName: string
  tag?: string
  color?: FileItemColor
  showProgress?: boolean
  progressValue?: number
  message?: string
  error?: string
  action?: React.ReactNode
  onAction?: () => void
  onClick?: () => void
  className?: string
}

function FileItem({
  fileName,
  tag,
  color = "neutral",
  showProgress,
  progressValue = 0,
  message,
  error,
  action,
  onAction,
  onClick,
  className,
}: FileItemProps) {
  const hasError = Boolean(error)
  const displayColor: FileItemColor = hasError ? "danger" : color

  return (
    <div
      data-slot="file-item"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl p-3",
        "bg-[var(--neutral-object)] border border-[var(--border-neutral-quiet)]",
        "shadow-[var(--shadow-neutral-xs)]",
        onClick && "cursor-pointer hover:shadow-[var(--shadow-neutral-sm)] transition-shadow duration-200",
        className
      )}
    >
      {/* File icon avatar */}
      <Avatar size="lg" shape="square">
        <AvatarFallback color={colorAvatarMap[displayColor]} type="ghost">
          <Icon name={colorIconMap[displayColor] ?? "file"} size="sm" />
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--text-heading)] truncate flex-1">
            {fileName}
          </span>
          {tag && (
            <Badge
              variant={displayColor === "neutral" ? "neutral" : displayColor}
              size="xs"
              shape="pill"
              fill="ghost"
            >
              {tag}
            </Badge>
          )}
        </div>

        {showProgress && (
          <Progress value={progressValue} className="h-1.5" />
        )}

        {(error || message) && (
          <p className={cn(
            "text-xs truncate",
            hasError ? "text-[var(--text-danger)]" : "text-[var(--text-body-quiet)]"
          )}>
            {error ?? message}
          </p>
        )}
      </div>

      {/* Action */}
      {(action || onAction) && (
        <div className="shrink-0">
          {action ?? (
            <Button variant="ghost" size="icon" onClick={onAction} aria-label="File action">
              <Icon name="ellipsis" size="sm" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { FileItem }
export type { FileItemProps, FileItemColor }
