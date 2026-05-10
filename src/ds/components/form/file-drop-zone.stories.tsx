import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { FileDropZone } from "./file-drop-zone"

const meta: Meta<typeof FileDropZone> = {
  title: "Form/FileDropZone",
  component: FileDropZone,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [(Story) => <div className="w-[420px]"><Story /></div>],
}

export default meta
type Story = StoryObj<typeof FileDropZone>

export const Default: Story = {
  args: {
    acceptedFilesExtensions: [".pdf", ".png", ".jpg"],
    acceptedFilesMimeTypes: "application/pdf,image/png,image/jpeg",
  },
}

export const Dragging: Story = {
  args: {
    isDragging: true,
    acceptedFilesExtensions: [".csv", ".xlsx"],
  },
}

export const Interactive: Story = {
  render: function Render() {
    const [isDragging, setIsDragging] = useState(false)
    return (
      <FileDropZone
        acceptedFilesExtensions={[".pdf", ".docx"]}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        onFileDrop={(files) => console.log("files:", files.length)}
      />
    )
  },
}
