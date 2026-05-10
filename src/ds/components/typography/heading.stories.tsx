import type { Meta, StoryObj } from "@storybook/react"
import { Heading } from "./heading"

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Scale: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["h4xl", "h3xl", "h2xl", "hxl", "h0", "h1", "h2", "h3", "h4", "h5", "h6"] as const).map((v) => (
        <div key={v} className="flex items-baseline gap-4">
          <code className="w-12 shrink-0 text-xs text-gray-400">{v}</code>
          <Heading variant={v}>{v} — The quick brown fox</Heading>
        </div>
      ))}
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Heading variant="h2" color="loud">Loud heading</Heading>
      <Heading variant="h2" color="default">Default heading</Heading>
      <Heading variant="h2" color="quiet">Quiet heading</Heading>
    </div>
  ),
}
