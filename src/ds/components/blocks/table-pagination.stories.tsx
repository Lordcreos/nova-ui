import type { Meta, StoryObj } from "@storybook/react"
import { TablePagination } from "./table-pagination"

const meta: Meta<typeof TablePagination> = {
  title: "Blocks/TablePagination",
  component: TablePagination,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof TablePagination>

export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    totalItems: 30,
    pageSize: 10,
    onPageChange: (p) => console.log("page:", p),
  },
}

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    totalItems: 200,
    pageSize: 10,
    onPageChange: (p) => console.log("page:", p),
  },
}

export const LastPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
    totalItems: 193,
    pageSize: 10,
    onPageChange: (p) => console.log("page:", p),
  },
}
