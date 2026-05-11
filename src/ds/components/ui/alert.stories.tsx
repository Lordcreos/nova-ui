import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "./alert"
import { Icon } from "./icon"

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert className="w-[420px]">
      <AlertIcon><Icon name="info" /></AlertIcon>
      <AlertContent>
        <AlertTitle>Plan updated</AlertTitle>
        <AlertDescription>Your billing changes will apply on the next cycle.</AlertDescription>
      </AlertContent>
    </Alert>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="grid w-[420px] gap-3">
      {(["info", "success", "warning", "danger"] as const).map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon><Icon name={variant === "danger" ? "circle-alert" : "info"} /></AlertIcon>
          <AlertContent>
            <AlertTitle>{variant}</AlertTitle>
            <AlertDescription>Contextual message with a matching semantic tone.</AlertDescription>
          </AlertContent>
        </Alert>
      ))}
    </div>
  ),
}
