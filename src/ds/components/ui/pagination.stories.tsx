import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Pagination } from "./pagination"

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: function Render() {
    const [page, setPage] = useState(4)
    return <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
  },
}
