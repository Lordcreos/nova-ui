import type { Meta, StoryObj } from "@storybook/react"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <p className="text-sm font-semibold text-[var(--text-heading)]">Account</p>
      <Separator />
      <p className="text-sm text-[var(--text-body-quiet)]">Profile, billing, and team settings.</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-3 text-sm text-[var(--text-body)]">
      <span>Overview</span>
      <Separator orientation="vertical" />
      <span>Usage</span>
      <Separator orientation="vertical" tone="quiet" />
      <span>Billing</span>
    </div>
  ),
}
