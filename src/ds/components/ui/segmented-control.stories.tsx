import type { Meta, StoryObj } from "@storybook/react"
import { SegmentedControl, SegmentedControlItem } from "./segmented-control"

const meta: Meta<typeof SegmentedControl> = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  render: () => (
    <SegmentedControl defaultValue="week" aria-label="Time range">
      <SegmentedControlItem value="day">Day</SegmentedControlItem>
      <SegmentedControlItem value="week">Week</SegmentedControlItem>
      <SegmentedControlItem value="month">Month</SegmentedControlItem>
    </SegmentedControl>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <SegmentedControl key={size} size={size} defaultValue="grid" aria-label={`${size} layout`}>
          <SegmentedControlItem value="list" size={size}>List</SegmentedControlItem>
          <SegmentedControlItem value="grid" size={size}>Grid</SegmentedControlItem>
        </SegmentedControl>
      ))}
    </div>
  ),
}
