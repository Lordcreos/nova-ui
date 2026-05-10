"use client"

import { toast } from "sonner"
import type { ReactNode } from "react"
import { CustomToast } from "@/ds/components/ui/toast"

export interface UseToastOptions {
  duration?: number
  type?: "success" | "error" | "info" | "warning"
  customIcon?: ReactNode
  customAction?: ReactNode
}

export function useToast() {
  const showToast = ({
    title,
    description,
    options = {},
  }: {
    title: string
    description?: string
    options?: UseToastOptions
  }) => {
    const { duration = 5000, type = "success", customIcon, customAction } = options
    return toast.custom(
      (id) => (
        <CustomToast
          type={type}
          title={title}
          description={description}
          customIcon={customIcon}
          customAction={customAction}
          dismiss={() => toast.dismiss(id)}
        />
      ),
      { duration },
    )
  }

  const dismissToast = (id?: string | number) => {
    toast.dismiss(id)
  }

  return { showToast, dismissToast }
}
