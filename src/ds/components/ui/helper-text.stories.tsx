import type { Meta, StoryObj } from "@storybook/react"
import { HelperText } from "./helper-text"

const meta: Meta<typeof HelperText> = {
  title: "UI/HelperText",
  component: HelperText,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof HelperText>

export const Default: Story = {
  args: { children: "This field is visible to workspace admins." },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["default", "success", "danger", "warning", "info"] as const).map((color) => (
        <HelperText key={color} color={color}>
          {color} helper text
        </HelperText>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <HelperText key={size} size={size}>
          {size} helper text
        </HelperText>
      ))}
    </div>
  ),
}
