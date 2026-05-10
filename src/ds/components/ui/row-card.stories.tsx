import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import { RowCard, RowCardRight } from "./row-card"

const meta: Meta<typeof RowCard> = {
  title: "UI/RowCard",
  component: RowCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof RowCard>

export const Default: Story = {
  args: {
    title: "Production workspace",
    subtitle: "12 members - updated 2 hours ago",
    icon: { name: "folder" },
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["neutral", "action", "success", "info", "warning", "danger"] as const).map((color) => (
        <RowCard key={color} color={color} title={`${color} card`} subtitle="Contextual status" />
      ))}
    </div>
  ),
}

export const WithTrailingContent: Story = {
  render: () => (
    <RowCard title="Invoices" subtitle="Monthly billing documents" icon={{ name: "file-invoice" }}>
      <RowCardRight>
        <Badge variant="success" shape="pill">Ready</Badge>
      </RowCardRight>
    </RowCard>
  ),
}
