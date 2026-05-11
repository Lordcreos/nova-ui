import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { EmptyState } from "./empty-state"
import { Icon } from "./icon"

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  render: () => (
    <div className="w-[440px] rounded-lg border border-[var(--border-neutral-quiet)] bg-[var(--neutral-object)]">
      <EmptyState
        icon={<Icon name="search" />}
        title="No results found"
        description="Try adjusting the filters or searching for a different keyword."
        action={<Button variant="tertiary">Clear filters</Button>}
      />
    </div>
  ),
}
