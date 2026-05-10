import type { Meta, StoryObj } from "@storybook/react"
import { Logs } from "./logs"

const items = [
  {
    id: "1",
    author: "Maya Chen",
    description: "Updated the production deployment settings.",
    comment: "Pinned rollbacks to the latest stable release.",
    date: new Date(2026, 4, 9, 10, 15),
  },
  {
    id: "2",
    author: "Leo Martin",
    description: "Invited three teammates to the workspace.",
    date: new Date(2026, 4, 9, 11, 5),
  },
  {
    id: "3",
    author: "Nora Silva",
    description: "Closed the accessibility audit checklist.",
    date: new Date(2026, 4, 9, 12, 30),
  },
]

const meta: Meta<typeof Logs> = {
  title: "Blocks/Logs",
  component: Logs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[560px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Logs>

export const Default: Story = {
  args: {
    title: "Recent activity",
    items,
  },
}

export const Empty: Story = {
  args: {
    title: "Recent activity",
    items: [],
    emptyText: "No log entries yet",
  },
}
