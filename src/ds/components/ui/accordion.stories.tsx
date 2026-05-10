import type { Meta, StoryObj } from "@storybook/react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[520px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="details">
      <AccordionItem value="details">
        <AccordionTrigger>Account details</AccordionTrigger>
        <AccordionContent>
          Manage profile information, default workspace, and notification preferences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Security</AccordionTrigger>
        <AccordionContent>
          Review two-factor settings, active sessions, and password policies.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="billing">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionContent>
          View invoices, payment methods, and plan limits.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["overview", "usage"]}>
      <AccordionItem value="overview">
        <AccordionTrigger>Overview</AccordionTrigger>
        <AccordionContent>High-level summary of current workspace health.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="usage">
        <AccordionTrigger>Usage</AccordionTrigger>
        <AccordionContent>Seat usage, storage consumption, and API request volume.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
