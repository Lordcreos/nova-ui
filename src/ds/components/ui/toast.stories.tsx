import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Toast>

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <ToastProvider>
        <Button onClick={() => setOpen(true)}>Show toast</Button>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Changes saved</ToastTitle>
            <ToastDescription>Your workspace settings were updated.</ToastDescription>
          </div>
          <ToastAction altText="Undo">Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid w-[420px] gap-3">
      {(["default", "success", "danger", "warning", "info"] as const).map((variant) => (
        <Toast key={variant} variant={variant} open>
          <div className="grid gap-1">
            <ToastTitle>{variant} toast</ToastTitle>
            <ToastDescription>Short contextual message for this state.</ToastDescription>
          </div>
        </Toast>
      ))}
    </div>
  ),
}
