import type { Meta, StoryObj } from "@storybook/react"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
  argTypes: {
    resize: { control: "select", options: ["none", "y", "x", "both"] },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: { placeholder: "Write an internal note..." },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Textarea placeholder="Default textarea" />
      <Textarea placeholder="Invalid textarea" aria-invalid />
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  ),
}
