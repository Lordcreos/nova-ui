import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { GroupTextField, GroupTextFieldRow } from "./group-text-field"

const meta: Meta<typeof GroupTextField> = {
  title: "Form/GroupTextField",
  component: GroupTextField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof GroupTextField>

export const InlineGroup: Story = {
  render: () => (
    <GroupTextField label="Website" helperText="Use the canonical project URL.">
      <Select defaultValue="https">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="https">https://</SelectItem>
          <SelectItem value="http">http://</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="example.com" />
    </GroupTextField>
  ),
}

export const GridGroup: Story = {
  render: () => (
    <GroupTextField label="Address" required helperText="Shipping destination.">
      <GroupTextFieldRow>
        <Input placeholder="Street" />
      </GroupTextFieldRow>
      <GroupTextFieldRow>
        <Input placeholder="City" />
        <Input placeholder="Postal code" />
      </GroupTextFieldRow>
      <GroupTextFieldRow>
        <Input placeholder="Country" />
      </GroupTextFieldRow>
    </GroupTextField>
  ),
}

export const WithButton: Story = {
  render: () => (
    <GroupTextField label="API Key" helperText="Copy and store this key securely.">
      <Input placeholder="sk-••••••••••••••••••••" readOnly defaultValue="sk-1a2b3c4d5e6f7g8h" />
      <Button variant="tertiary">Copy</Button>
    </GroupTextField>
  ),
}

export const SearchWithFilter: Story = {
  render: () => (
    <GroupTextField label="Search users">
      <Select defaultValue="email">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="email">By email</SelectItem>
          <SelectItem value="name">By name</SelectItem>
          <SelectItem value="id">By ID</SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder="Search…" />
      <Button variant="default">Search</Button>
    </GroupTextField>
  ),
}

export const Error: Story = {
  render: () => (
    <GroupTextField label="Card details" error="Enter a valid card number." limit={19} count={22}>
      <Input placeholder="Card number" />
      <Input placeholder="MM/YY" />
      <Input placeholder="CVC" />
    </GroupTextField>
  ),
}
