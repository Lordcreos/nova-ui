import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      story: { inline: false, height: "220px" },
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="tertiary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverClose aria-label="Close">
          <span aria-hidden="true">x</span>
        </PopoverClose>
        <div className="flex flex-col gap-1 pr-5">
          <p className="text-sm font-semibold text-[var(--text-heading)]">Workspace access</p>
          <p className="text-sm text-[var(--text-body-quiet)]">
            Invite teammates, review roles, and manage sharing permissions.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
