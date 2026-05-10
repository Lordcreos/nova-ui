import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Icon } from "../ui/icon"
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

export const Variants: Story = {
  decorators: [(Story) => <div className="w-[720px]"><Story /></div>],
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(["neutral", "action", "success", "info", "warning", "danger"] as const).map((variant) => (
        <FileDropZone
          key={variant}
          variant={variant}
          size="sm"
          title={`${variant} upload`}
          acceptedFilesExtensions={[".pdf", ".png"]}
        />
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
  render: () => (
    <div className="space-y-4">
      <FileDropZone size="sm" title="Small upload" acceptedFilesExtensions={[".csv"]} />
      <FileDropZone size="default" title="Default upload" acceptedFilesExtensions={[".pdf", ".png"]} />
      <FileDropZone size="lg" title="Large upload" description="Drop multiple assets or click to browse." />
    </div>
  ),
}

export const CustomContent: Story = {
  args: {
    variant: "info",
    title: "Upload workspace assets",
    description: "SVG, PNG, JPG or PDF up to 20MB.",
    icon: <Icon name="cloud-upload" size="lg" />,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    title: "Uploads disabled",
    description: "Enable workspace storage before uploading files.",
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
