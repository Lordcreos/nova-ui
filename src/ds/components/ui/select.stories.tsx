import type { Meta, StoryObj } from "@storybook/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select defaultValue="viewer">
      <SelectTrigger>
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="owner">Owner</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select defaultValue="linear">
      <SelectTrigger variant="lg">
        <SelectValue placeholder="Select integration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Project tools</SelectLabel>
          <SelectItem value="linear">Linear</SelectItem>
          <SelectItem value="jira">Jira</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Messaging</SelectLabel>
          <SelectItem value="slack">Slack</SelectItem>
          <SelectItem value="teams">Teams</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Loading: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger isLoading>
        <SelectValue placeholder="Loading options" />
      </SelectTrigger>
    </Select>
  ),
}
