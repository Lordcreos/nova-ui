import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    variant: { control: "select", options: ["xs", "sm", "md", "lg"] },
    group: { control: "select" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: "Enter workspace name" },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "md", "lg"] as const).map((variant) => (
        <Input key={variant} variant={variant} placeholder={`${variant} input`} />
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input placeholder="Default" />
      <Input placeholder="Invalid" aria-invalid />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
}
