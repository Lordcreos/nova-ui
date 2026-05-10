import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Calendar>

export const SingleDate: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 4, 9))

    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={new Date(2026, 4, 1)}
        startMonth={new Date(2020, 0, 1)}
        endMonth={new Date(2030, 11, 1)}
      />
    )
  },
}

export const Range: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<DateRange | undefined>({
      from: new Date(2026, 4, 7),
      to: new Date(2026, 4, 13),
    })

    return (
      <Calendar
        mode="range"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={new Date(2026, 4, 1)}
        startMonth={new Date(2020, 0, 1)}
        endMonth={new Date(2030, 11, 1)}
      />
    )
  },
}

export const MonthYearSelect: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 4, 9))

    return (
      <Calendar
        mode="single"
        navigationVariant="select"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={new Date(2026, 4, 1)}
        startMonth={new Date(2020, 0, 1)}
        endMonth={new Date(2030, 11, 1)}
      />
    )
  },
}
