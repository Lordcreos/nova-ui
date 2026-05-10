import type { Meta, StoryObj } from "@storybook/react"
import { Body } from "./body"

const meta: Meta<typeof Body> = {
  title: "Typography/Body",
  component: Body,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Body>

export const Default: Story = {
  args: {
    children: "Use body text for supporting copy, descriptions, and dense interface content.",
  },
}

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Body key={size} size={size}>
          {size} body text for the design system.
        </Body>
      ))}
    </div>
  ),
}

export const ColorsAndWeight: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Body color="loud" variant="bold">Loud bold body text</Body>
      <Body color="default">Default body text</Body>
      <Body color="quiet">Quiet supporting body text</Body>
    </div>
  ),
}
