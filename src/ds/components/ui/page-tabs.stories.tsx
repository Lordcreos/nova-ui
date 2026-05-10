import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { PageTabs } from "./page-tabs"

const items = [
  { key: "overview", label: "Overview" },
  { key: "members", label: "Members", badge: 12 },
  { key: "billing", label: "Billing" },
  { key: "audit", label: "Audit log", disabled: true },
]

const meta: Meta<typeof PageTabs> = {
  title: "UI/PageTabs",
  component: PageTabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[560px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof PageTabs>

export const Default: Story = {
  render: function Render() {
    const [activeKey, setActiveKey] = useState("overview")
    return <PageTabs items={items} activeKey={activeKey} onTabChange={setActiveKey} />
  },
}

export const Square: Story = {
  render: () => <PageTabs items={items} activeKey="members" shape="square" />,
}
