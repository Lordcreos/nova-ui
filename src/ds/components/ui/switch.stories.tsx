import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "danger"] },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: { defaultChecked: true },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-3 text-sm text-[var(--text-body)]">
        <Switch defaultChecked />
        Enabled
      </label>
      <label className="flex items-center gap-3 text-sm text-[var(--text-body)]">
        <Switch />
        Disabled state off
      </label>
      <label className="flex items-center gap-3 text-sm text-[var(--text-body)]">
        <Switch variant="danger" defaultChecked />
        Danger variant
      </label>
      <label className="flex items-center gap-3 text-sm text-[var(--text-body)]">
        <Switch disabled />
        Disabled control
      </label>
    </div>
  ),
}
