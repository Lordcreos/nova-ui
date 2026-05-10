import type { Meta, StoryObj } from "@storybook/react"
import { TextField } from "./text-field"

const meta: Meta<typeof TextField> = {
  title: "Form/TextField",
  component: TextField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
}

export const Required: Story = {
  args: { label: "Full name", placeholder: "John Doe", required: true },
}

export const WithHelperText: Story = {
  args: {
    label: "Username",
    placeholder: "john_doe",
    helperText: "Must be 3-20 characters, letters and numbers only.",
  },
}

export const WithError: Story = {
  args: {
    label: "Password",
    type: "password",
    value: "123",
    required: true,
    error: "Password must be at least 8 characters",
  },
}

export const WithCounter: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    limit: 140,
    count: 45,
  },
}

export const Disabled: Story = {
  args: {
    label: "Read-only field",
    value: "Cannot edit this",
    disabled: true,
  },
}
