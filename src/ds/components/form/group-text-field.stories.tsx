import type { Meta, StoryObj } from "@storybook/react"
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

export const Error: Story = {
  render: () => (
    <GroupTextField label="Card details" error="Enter a valid card number." limit={19} count={22}>
      <Input placeholder="Card number" />
      <Input placeholder="MM/YY" />
      <Input placeholder="CVC" />
    </GroupTextField>
  ),
}
