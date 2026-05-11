import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="workspace-name">Workspace name</Label>
      <Input id="workspace-name" placeholder="Nova Labs" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="email" required>Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}
