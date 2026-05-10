import type { Meta, StoryObj } from "@storybook/react"
import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { children: "Bold", "aria-label": "Toggle bold" },
}

export const States: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle defaultPressed>Pressed</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle disabled>Disabled</Toggle>
    </div>
  ),
}
