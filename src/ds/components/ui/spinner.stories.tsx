import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "UI/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="xs" tone="action" />
      <Spinner size="sm" tone="action" />
      <Spinner tone="action" />
      <Spinner size="lg" tone="action" />
      <Spinner size="xl" tone="action" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <Button disabled icon={<Spinner size="sm" tone="inverse" />}>
      Saving
    </Button>
  ),
}
