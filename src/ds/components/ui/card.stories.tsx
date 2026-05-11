import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div>
          <CardTitle>Usage summary</CardTitle>
          <CardDescription>Current billing period</CardDescription>
        </div>
        <Badge variant="success" shape="pill">Healthy</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--text-body)]">12,842 events processed across 3 active projects.</p>
      </CardContent>
      <CardFooter>
        <Button variant="tertiary">View details</Button>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
}
