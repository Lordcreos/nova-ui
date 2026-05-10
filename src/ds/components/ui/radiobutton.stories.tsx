import type { Meta, StoryObj } from "@storybook/react"
import { Radiobutton } from "./radiobutton"

const meta: Meta<typeof Radiobutton> = {
  title: "UI/Radiobutton",
  component: Radiobutton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Radiobutton>

export const Default: Story = {
  args: { label: "Default option", name: "single-option" },
}

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radiobutton label="Compact" name="density" defaultChecked />
      <Radiobutton label="Comfortable" name="density" />
      <Radiobutton label="Spacious" name="density" />
      <Radiobutton label="Disabled" name="density" disabled />
    </div>
  ),
}
