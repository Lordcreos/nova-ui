import type { Meta, StoryObj } from "@storybook/react"
import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: { label: "Receive product updates" },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" checked="unchecked" />
      <Checkbox label="Checked" checked="checked" />
      <Checkbox label="Partially selected" checked="partial" />
      <Checkbox label="Disabled" disabled />
    </div>
  ),
}
