import { icons } from "lucide-react"
import { cn } from "../../lib/utils"

type IconSize = "xs" | "sm" | "lg" | "xl" | "2xl"

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
}

interface IconProps {
  name: string
  size?: IconSize
  className?: string
  "aria-hidden"?: boolean
}

function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

function Icon({ name, size = "sm", className, "aria-hidden": ariaHidden = true }: IconProps) {
  const LucideIcon = icons[toPascalCase(name) as keyof typeof icons]

  if (!LucideIcon) return null

  return (
    <LucideIcon
      data-slot="icon"
      size={sizeMap[size]}
      className={cn(className)}
      aria-hidden={ariaHidden}
    />
  )
}

export { Icon }
export type { IconProps, IconSize }
