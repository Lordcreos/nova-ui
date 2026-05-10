import type { Meta, StoryObj } from "@storybook/react"
import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  args: { value: 62 },
}

export const Values: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[0, 24, 50, 76, 100].map((value) => (
        <div key={value} className="flex items-center gap-3">
          <span className="w-9 text-xs text-[var(--text-body-quiet)]">{value}%</span>
          <Progress value={value} />
        </div>
      ))}
    </div>
  ),
}
