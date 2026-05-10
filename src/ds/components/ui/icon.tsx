import { cn } from "../../lib/utils"

type IconType = "far" | "fas" | "fab" | "fal" | "fad" | "fat"
type IconSize = "xs" | "sm" | "lg" | "xl" | "2xl"

const sizeMap: Record<IconSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
}

interface IconProps {
  type?: IconType
  name: string
  size?: IconSize
  className?: string
  "aria-hidden"?: boolean
}

function Icon({ type = "far", name, size = "sm", className, "aria-hidden": ariaHidden = true }: IconProps) {
  return (
    <i
      data-slot="icon"
      className={cn(type, `fa-${name}`, sizeMap[size], className)}
      aria-hidden={ariaHidden}
    />
  )
}

export { Icon }
export type { IconProps, IconType, IconSize }
