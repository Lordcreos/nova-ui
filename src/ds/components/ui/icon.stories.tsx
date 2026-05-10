import type { Meta, StoryObj } from "@storybook/react"
import { Icon } from "./icon"

const meta: Meta<typeof Icon> = {
  title: "UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["far", "fas", "fab", "fal", "fad", "fat"] },
    size: { control: "select", options: ["xs", "sm", "lg", "xl", "2xl"] },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: { name: "circle-info", type: "far", size: "xl" },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["xs", "sm", "lg", "xl", "2xl"] as const).map((size) => (
        <Icon key={size} name="star" type="far" size={size} />
      ))}
    </div>
  ),
}
