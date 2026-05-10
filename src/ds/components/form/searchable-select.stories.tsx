import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "../ui/badge"
import { SearchableSelect } from "./searchable-select"

const options = [
  { value: "analytics", label: "Analytics workspace", indicator: <Badge size="xs">Core</Badge> },
  { value: "billing", label: "Billing operations" },
  { value: "support", label: "Customer support" },
  { value: "growth", label: "Growth experiments" },
  { value: "research", label: "Research lab", disabled: true },
]

const manyOptions = Array.from({ length: 60 }, (_, index) => ({
  value: `item-${index + 1}`,
  label: `Option ${index + 1}`,
}))

const meta: Meta<typeof SearchableSelect> = {
  title: "Form/SearchableSelect",
  component: SearchableSelect,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof SearchableSelect>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState("analytics")
    return (
      <SearchableSelect
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="Select workspace"
        srOnlyLabel="Workspace"
      />
    )
  },
}

export const Virtualized: Story = {
  render: () => (
    <SearchableSelect
      options={manyOptions}
      placeholder="Search many options"
      srOnlyLabel="Large option list"
    />
  ),
}

export const Loading: Story = {
  args: {
    options: [],
    isLoading: true,
    placeholder: "Loading workspaces",
  },
}
