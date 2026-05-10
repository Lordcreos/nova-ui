import type { Meta, StoryObj } from "@storybook/react"
import { TextareaField } from "./textarea-field"

const meta: Meta<typeof TextareaField> = {
  title: "Form/TextareaField",
  component: TextareaField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-96"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof TextareaField>

export const Default: Story = {
  args: {
    label: "Internal note",
    placeholder: "Add context for the team...",
    helperText: "Visible only to workspace members.",
  },
}

export const WithCounter: Story = {
  args: {
    label: "Release summary",
    defaultValue: "Fixed pagination and improved loading feedback.",
    limit: 120,
    count: 48,
  },
}

export const Error: Story = {
  args: {
    label: "Review comment",
    required: true,
    error: "Comment must be at least 20 characters.",
    defaultValue: "Looks good.",
    limit: 200,
    count: 11,
  },
}
