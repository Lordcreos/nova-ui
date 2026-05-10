import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalClose,
  AlertModal,
  AlertModalTrigger,
  AlertModalContent,
  AlertModalHeader,
  AlertModalTitle,
  AlertModalDescription,
  AlertModalBody,
  AlertModalFooter,
  AlertModalCancel,
  AlertModalAction,
} from "./modal"
import { Button } from "./button"
import { Input } from "./input"

const meta: Meta = {
  title: "UI/Modal",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
The **Modal** system has two variants:

- **\`Modal\`** — standard dialog. Closable by clicking the overlay or pressing Escape.
- **\`AlertModal\`** — confirmation dialog. Only closable via explicit action/cancel buttons (blocking pattern for destructive actions).

## Anatomy

\`\`\`tsx
<Modal>
  <ModalTrigger asChild><Button>Open</Button></ModalTrigger>
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
      <ModalDescription>Supporting text</ModalDescription>
    </ModalHeader>
    <ModalBody>…content…</ModalBody>
    <ModalFooter>
      <ModalClose asChild><Button variant="tertiary">Cancel</Button></ModalClose>
      <Button>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
\`\`\`

## Sizes

\`xs\` · \`sm\` · \`md\` (default) · \`lg\` · \`xl\` · \`2xl\` · \`full\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/* ─── Default ────────────────────────────────────────────── */

export const Default: Story = {
  name: "Default",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open modal</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Modal title</ModalTitle>
          <ModalDescription>
            Supporting description that gives the user extra context about what this modal does.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-[var(--text-body)]">
            This is the modal body. You can place any content here — forms, detail views, images, or rich layouts.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Cancel</Button>
          </ModalClose>
          <Button>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

/* ─── Sizes ──────────────────────────────────────────────── */

export const Sizes: Story = {
  name: "Sizes",
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const
    return (
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Modal key={size}>
            <ModalTrigger asChild>
              <Button variant="tertiary" size="sm">
                size=&quot;{size}&quot;
              </Button>
            </ModalTrigger>
            <ModalContent size={size}>
              <ModalHeader>
                <ModalTitle>Size: {size}</ModalTitle>
                <ModalDescription>This modal uses size=&quot;{size}&quot;.</ModalDescription>
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-[var(--text-body)]">
                  Content adapts to the available width inside this size variant.
                </p>
              </ModalBody>
              <ModalFooter>
                <ModalClose asChild>
                  <Button variant="tertiary">Cancel</Button>
                </ModalClose>
                <Button>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ))}
      </div>
    )
  },
}

/* ─── With Form ──────────────────────────────────────────── */

export const WithForm: Story = {
  name: "With Form",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Edit profile</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Edit profile</ModalTitle>
          <ModalDescription>Update your display name and email address.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-heading)]" htmlFor="name">
                Display name
              </label>
              <Input id="name" defaultValue="Alex Johnson" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[var(--text-heading)]" htmlFor="email">
                Email address
              </label>
              <Input id="email" type="email" defaultValue="alex@example.com" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Cancel</Button>
          </ModalClose>
          <Button>Save changes</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

/* ─── No header close button ─────────────────────────────── */

export const NoClose: Story = {
  name: "No header close button",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Open (no ✕)</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader showClose={false}>
          <ModalTitle>Session expiring</ModalTitle>
          <ModalDescription>Your session will expire in 2 minutes. Do you want to stay signed in?</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Sign out</Button>
          </ModalClose>
          <Button>Stay signed in</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

/* ─── Alert Modal — destructive confirmation ─────────────── */

export const Destructive: Story = {
  name: "Alert Modal (destructive)",
  render: () => {
    const [deleted, setDeleted] = useState(false)
    return (
      <div className="flex items-center gap-4">
        <AlertModal onOpenChange={() => setDeleted(false)}>
          <AlertModalTrigger asChild>
            <Button variant="danger-primary">Delete account</Button>
          </AlertModalTrigger>
          <AlertModalContent>
            <AlertModalHeader>
              <AlertModalTitle>Delete account</AlertModalTitle>
              <AlertModalDescription>
                This action cannot be undone. All your data, projects, and settings will be permanently removed.
              </AlertModalDescription>
            </AlertModalHeader>
            <AlertModalBody>
              <p className="text-sm text-[var(--text-body-quiet)]">
                You will lose access immediately and will not be able to recover your account.
              </p>
            </AlertModalBody>
            <AlertModalFooter>
              <AlertModalCancel asChild>
                <Button variant="tertiary">Cancel</Button>
              </AlertModalCancel>
              <AlertModalAction asChild>
                <Button variant="danger-primary" onClick={() => setDeleted(true)}>
                  Yes, delete account
                </Button>
              </AlertModalAction>
            </AlertModalFooter>
          </AlertModalContent>
        </AlertModal>
        {deleted && (
          <span className="text-sm text-[var(--text-danger)]">Account deleted (demo only)</span>
        )}
      </div>
    )
  },
}

/* ─── Scrollable body ────────────────────────────────────── */

export const ScrollableBody: Story = {
  name: "Scrollable body",
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Long content</Button>
      </ModalTrigger>
      <ModalContent size="md" className="max-h-[80vh]">
        <ModalHeader>
          <ModalTitle>Terms of service</ModalTitle>
          <ModalDescription>Please read the full terms before accepting.</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4 text-sm text-[var(--text-body)]">
            {Array.from({ length: 10 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Section {i + 1}.
              </p>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Decline</Button>
          </ModalClose>
          <Button>Accept</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}
