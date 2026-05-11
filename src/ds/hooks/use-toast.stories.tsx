import type { Meta, StoryObj } from "@storybook/react"
import { useToast } from "@/ds/hooks/use-toast"
import { SonnerToaster } from "@/ds/components/ui/toast"
import { Button } from "@/ds/components/ui/button"

const meta: Meta = {
  title: "Hooks/useToast",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A custom hook that provides a simple and consistent API for displaying toast notifications powered by **Sonner**.

## Setup

Add \`<SonnerToaster />\` once near the root of your app:

\`\`\`tsx
import { SonnerToaster } from "@lordcreos/nova-ui/ui"

function App() {
  return (
    <>
      <YourApp />
      <SonnerToaster />
    </>
  )
}
\`\`\`

## Usage

\`\`\`tsx
import { useToast } from "@lordcreos/nova-ui/hooks"

function MyComponent() {
  const { showToast, dismissToast } = useToast()

  return (
    <Button onClick={() => showToast({ title: "Saved!", options: { type: "success" } })}>
      Save
    </Button>
  )
}
\`\`\`

## API

### \`showToast({ title, description?, options? })\`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`title\` | \`string\` | — | Required. Main message text |
| \`description\` | \`string\` | — | Optional subtitle |
| \`options.type\` | \`"success" \\| "error" \\| "info" \\| "warning"\` | \`"success"\` | Visual variant |
| \`options.duration\` | \`number\` | \`5000\` | Auto-dismiss delay in ms |
| \`options.customIcon\` | \`ReactNode\` | — | Overrides the default icon |
| \`options.customAction\` | \`ReactNode\` | — | Replaces the dismiss button |

### \`dismissToast(id?)\`

Dismisses all toasts, or a specific one by ID.

## Types

\`\`\`ts
type ToastType = "success" | "error" | "info" | "warning"

interface UseToastOptions {
  duration?: number
  type?: ToastType
  customIcon?: ReactNode
  customAction?: ReactNode
}
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// ─── Wrapper with Toaster ─────────────────────────────────────────────────────

function WithToaster({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SonnerToaster />
    </>
  )
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const { showToast, dismissToast } = useToast()
    return (
      <WithToaster>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              showToast({
                title: "Changes saved",
                description: "Your workspace settings were updated.",
                options: { type: "success" },
              })
            }
          >
            Show Toast
          </Button>
          <Button variant="tertiary" onClick={() => dismissToast()}>
            Dismiss All
          </Button>
        </div>
      </WithToaster>
    )
  },
}

export const AllTypes: Story = {
  name: "All Types",
  render: () => {
    const { showToast } = useToast()
    const types = [
      { type: "success", label: "Success", description: "Operation completed successfully." },
      { type: "error", label: "Error", description: "Something went wrong. Please try again." },
      { type: "info", label: "Info", description: "Here's some useful information." },
      { type: "warning", label: "Warning", description: "This action may have side effects." },
    ] as const

    return (
      <WithToaster>
        <div className="flex flex-wrap gap-3">
          {types.map(({ type, label, description }) => (
            <Button
              key={type}
              variant="tertiary"
              onClick={() =>
                showToast({ title: label, description, options: { type } })
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </WithToaster>
    )
  },
}

export const WithDescription: Story = {
  name: "With Description",
  render: () => {
    const { showToast } = useToast()
    return (
      <WithToaster>
        <Button
          onClick={() =>
            showToast({
              title: "File uploaded",
              description: "report-q1-2026.pdf has been uploaded to your workspace.",
              options: { type: "success", duration: 6000 },
            })
          }
        >
          Upload file
        </Button>
      </WithToaster>
    )
  },
}

export const TitleOnly: Story = {
  name: "Title Only",
  render: () => {
    const { showToast } = useToast()
    return (
      <WithToaster>
        <Button
          onClick={() =>
            showToast({ title: "Link copied to clipboard", options: { type: "info" } })
          }
        >
          Copy link
        </Button>
      </WithToaster>
    )
  },
}

export const CustomDuration: Story = {
  name: "Custom Duration",
  render: () => {
    const { showToast } = useToast()
    return (
      <WithToaster>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="tertiary"
            onClick={() =>
              showToast({ title: "Quick message (2s)", options: { type: "info", duration: 2000 } })
            }
          >
            2 seconds
          </Button>
          <Button
            variant="tertiary"
            onClick={() =>
              showToast({ title: "Persistent message (10s)", options: { type: "warning", duration: 10000 } })
            }
          >
            10 seconds
          </Button>
        </div>
      </WithToaster>
    )
  },
}
