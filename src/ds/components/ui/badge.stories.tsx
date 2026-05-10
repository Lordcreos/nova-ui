import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import { Icon } from "./icon"

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: "Badge" } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["neutral", "action", "success", "info", "warning", "danger", "disabled"] as const).map((v) => (
        <Badge key={v} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
}

export const Solid: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["neutral", "action", "success", "info", "warning", "danger"] as const).map((v) => (
        <Badge key={v} variant={v} fill="solid">{v}</Badge>
      ))}
    </div>
  ),
}

export const Pills: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["neutral", "action", "success", "danger"] as const).map((v) => (
        <Badge key={v} variant={v} shape="pill">{v}</Badge>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="xs">xs</Badge>
      <Badge size="sm">sm</Badge>
      <Badge size="default">default</Badge>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge icon={<Icon name="check" size="xs" />} variant="success">
        Left
      </Badge>
      <Badge icon={<Icon name="arrow-right" size="xs" />} iconPosition="right" variant="action">
        Right
      </Badge>
      <Badge icon={<Icon name="arrow-up" size="xs" />} iconPosition="top" variant="info">
        Top
      </Badge>
      <Badge icon={<Icon name="arrow-down" size="xs" />} iconPosition="bottom" variant="warning">
        Bottom
      </Badge>
    </div>
  ),
}
