import type { Meta, StoryObj } from "@storybook/react"
import { ScrollArea } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-56 w-80 rounded-lg border border-[var(--border-neutral)] bg-[var(--neutral-object)]">
      <div className="flex flex-col gap-3 p-4">
        {Array.from({ length: 18 }, (_, index) => (
          <p key={index} className="text-sm text-[var(--text-body)]">
            Activity item {index + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
}
