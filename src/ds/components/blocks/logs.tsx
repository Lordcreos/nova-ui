import { format } from "date-fns"
import { cn } from "../../lib/utils"
import { Avatar, AvatarFallback } from "../ui/avatar"

export interface LogItemType {
  id: string
  description: string
  author: string
  date: Date
  comment?: string
}

type CircleLinePosition = "init" | "middle" | "end" | "single"

interface CircleLineProps {
  position: CircleLinePosition
}

function CircleLine({ position }: CircleLineProps) {
  return (
    <div data-slot="circle-line" className="relative flex flex-col items-center">
      {/* Top line */}
      {(position === "middle" || position === "end") && (
        <div className="w-px flex-1 bg-[var(--border-neutral-quiet)]" style={{ minHeight: "16px" }} />
      )}
      {(position === "init" || position === "single") && (
        <div className="w-px flex-1 invisible" style={{ minHeight: "16px" }} />
      )}

      {/* Dot */}
      <div
        className={cn(
          "relative z-10 h-2.5 w-2.5 shrink-0 rounded-full",
          "border-2 border-[var(--border-contextual-action)] bg-[var(--neutral-object)]"
        )}
      />

      {/* Bottom line */}
      {(position === "middle" || position === "init") && (
        <div className="w-px flex-1 bg-[var(--border-neutral-quiet)]" style={{ minHeight: "16px" }} />
      )}
      {(position === "end" || position === "single") && (
        <div className="w-px flex-1 invisible" style={{ minHeight: "16px" }} />
      )}
    </div>
  )
}

interface LogItemProps {
  item: LogItemType
  position: CircleLinePosition
}

function LogItem({ item, position }: LogItemProps) {
  const initials = item.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div data-slot="log-item" className="flex gap-3">
      <CircleLine position={position} />

      <div className="flex flex-1 flex-col gap-1 pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar size="xs" shape="circle">
              <AvatarFallback color="action" type="solid">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold text-[var(--text-heading)]">{item.author}</span>
          </div>
          <time
            dateTime={item.date.toISOString()}
            className="shrink-0 text-xs text-[var(--text-body-quiet)]"
          >
            {format(item.date, "MMM d, yyyy 'at' h:mm a")}
          </time>
        </div>

        <p className="text-sm text-[var(--text-body)]">{item.description}</p>

        {item.comment && (
          <div className="mt-1 rounded-lg border border-[var(--border-neutral-quiet)] bg-[var(--neutral-foreground)] px-3 py-2">
            <p className="text-sm italic text-[var(--text-body-quiet)]">{item.comment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface LogsProps {
  items: LogItemType[]
  title?: string
  emptyText?: string
  className?: string
}

function Logs({ items, title, emptyText = "No activity yet", className }: LogsProps) {
  return (
    <div data-slot="logs" className={cn("flex flex-col", className)}>
      {title && (
        <h3 className="mb-4 text-sm font-semibold text-[var(--text-heading)]">{title}</h3>
      )}

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--text-body-quiet)]">{emptyText}</p>
      ) : (
        items.map((item, idx) => {
          let position: CircleLinePosition
          if (items.length === 1) position = "single"
          else if (idx === 0) position = "init"
          else if (idx === items.length - 1) position = "end"
          else position = "middle"

          return <LogItem key={item.id} item={item} position={position} />
        })
      )}
    </div>
  )
}

export { Logs }
export type { LogsProps }
