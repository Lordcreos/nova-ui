import type { Meta, StoryObj } from "@storybook/react"
import { Badge } from "./badge"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}

export default meta
type Story = StoryObj<typeof Table>

const rows = [
  { name: "Nova Analytics", owner: "Maya Chen", status: "Active", spend: "$4,290" },
  { name: "Zeph Portal", owner: "Leo Martin", status: "Paused", spend: "$1,180" },
  { name: "Design System", owner: "Nora Silva", status: "Active", spend: "$820" },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Workspace billing summary.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Project</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Spend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell className="font-medium text-[var(--text-heading)]">{row.name}</TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell>
              <Badge variant={row.status === "Active" ? "success" : "warning"}>{row.status}</Badge>
            </TableCell>
            <TableCell className="text-right">{row.spend}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$6,290</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
