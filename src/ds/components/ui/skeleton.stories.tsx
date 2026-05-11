import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const CardLoading: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-[var(--border-neutral-quiet)] bg-[var(--neutral-object)] p-4">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="h-10 w-10" />
        <div className="flex-1 space-y-2">
          <Skeleton shape="text" className="w-3/5" />
          <Skeleton shape="text" className="w-4/5" />
        </div>
      </div>
      <Skeleton className="mt-4 h-24 w-full" />
    </div>
  ),
}
