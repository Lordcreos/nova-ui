import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default", "secondary", "tertiary", "quiet", "ghost", "ghost-action",
        "danger-primary", "danger-secondary", "danger-tertiary",
        "warning-primary", "warning-secondary", "warning-tertiary",
        "alpha-neutral", "input-helper",
      ],
    },
    size: { control: "select", options: ["xs", "sm", "default", "lg", "icon"] },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = { args: { children: "Button" } }

export const Secondary: Story = { args: { children: "Button", variant: "secondary" } }

export const Tertiary: Story = { args: { children: "Button", variant: "tertiary" } }

export const Ghost: Story = { args: { children: "Button", variant: "ghost" } }

export const DangerPrimary: Story = { args: { children: "Delete", variant: "danger-primary" } }

export const Disabled: Story = { args: { children: "Disabled", disabled: true } }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3 flex-wrap">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const Grouped: Story = {
  render: () => (
    <div className="flex">
      <Button group="left" variant="tertiary">Left</Button>
      <Button group="middle" variant="tertiary">Middle</Button>
      <Button group="right" variant="tertiary">Right</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["default", "secondary", "tertiary", "quiet", "ghost", "ghost-action",
        "danger-primary", "danger-secondary", "danger-tertiary",
        "warning-primary", "warning-secondary", "warning-tertiary"] as const
      ).map((variant) => (
        <Button key={variant} variant={variant}>{variant}</Button>
      ))}
    </div>
  ),
}
