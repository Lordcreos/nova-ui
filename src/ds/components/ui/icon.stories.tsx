import type { Meta, StoryObj } from "@storybook/react"
import { Icon } from "./icon"

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "lg", "xl", "2xl"] },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: { name: "star", size: "xl" },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "lg", "xl", "2xl"] as const).map((size) => (
        <Icon key={size} name="star" size={size} />
      ))}
    </div>
  ),
}

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {[
        "circle-info",
        "star",
        "heart",
        "search",
        "settings",
        "user",
        "bell",
        "check",
        "x",
        "chevron-down",
        "arrow-right",
        "trash-2",
        "pencil",
        "plus",
        "minus",
      ].map((name) => (
        <Icon key={name} name={name} size="lg" />
      ))}
    </div>
  ),
}
