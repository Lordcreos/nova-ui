import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../ui/button"
import { FileItem } from "./file-item"

const meta: Meta<typeof FileItem> = {
  title: "Form/FileItem",
  component: FileItem,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[460px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FileItem>

export const Default: Story = {
  args: {
    fileName: "quarterly-report.pdf",
    tag: "PDF",
    message: "Uploaded just now",
  },
}

export const Uploading: Story = {
  args: {
    fileName: "customer-import.csv",
    tag: "CSV",
    color: "action",
    showProgress: true,
    progressValue: 58,
    message: "Uploading...",
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <FileItem fileName="signed-contract.pdf" tag="Done" color="success" message="Ready to share" />
      <FileItem fileName="large-export.zip" tag="Retry" error="Upload failed" />
      <FileItem
        fileName="brief.docx"
        tag="Draft"
        action={<Button variant="tertiary" size="sm">Review</Button>}
      />
    </div>
  ),
}
