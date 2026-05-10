import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Initials: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback color="action">NC</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["2xs", "xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback color="neutral">{size.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const FallbackVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["action", "success", "info", "warning", "danger", "neutral"] as const).map((color) => (
        <Avatar key={color} size="lg">
          <AvatarFallback color={color} type="ghost">
            {color.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const Image: Story = {
  render: () => (
    <Avatar size="xl" shape="square">
      <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces" alt="Profile" />
      <AvatarFallback color="action">PR</AvatarFallback>
    </Avatar>
  ),
}
