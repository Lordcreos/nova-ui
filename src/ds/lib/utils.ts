import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge, twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const twMergeCustom = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["2xs", "h4xl", "h3xl", "h2xl", "hxl", "h0", "h1", "h2", "h3", "h4", "h5", "h6"] },
      ],
      shadow: [
        {
          shadow: [
            "neutral-xs", "neutral-sm", "neutral-md", "neutral-lg", "neutral-xl", "neutral-2xl", "neutral-3xl",
            "action-xs",  "action-sm",  "action-md",  "action-lg",  "action-xl",  "action-2xl",  "action-3xl",
            "danger-xs",  "danger-sm",  "danger-md",  "danger-lg",  "danger-xl",  "danger-2xl",  "danger-3xl",
          ],
        },
      ],
    },
  },
})

export function cnCustom(...inputs: ClassValue[]) {
  return twMergeCustom(clsx(inputs))
}
