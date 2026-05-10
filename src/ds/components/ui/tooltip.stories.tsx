import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      story: { inline: false, height: "120px" },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button variant="tertiary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>View workspace usage and limits.</TooltipContent>
    </Tooltip>
  ),
}

export const Sides: Story = {
  parameters: {
    docs: { story: { inline: false, height: "280px" } },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-16 p-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} open>
          <TooltipTrigger asChild>
            <Button variant="tertiary">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
