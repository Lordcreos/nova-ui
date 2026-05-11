# @nova-ui/components

Professional React design system built with Radix UI, Tailwind CSS v4, and TypeScript.

## Installation

```bash
npm install @nova-ui/components
# or
pnpm add @nova-ui/components
```

### Peer dependencies

```bash
npm install react react-dom
```

## Setup

### 1. Import the theme CSS

In your app entry point (e.g. `main.tsx`, `_app.tsx`, or `layout.tsx`):

```ts
import "@nova-ui/components/styles";
```

### 2. Configure Tailwind CSS v4

In your CSS entry file, add the Nova UI preset to your Tailwind config:

```css
@import "tailwindcss";
@import "@nova-ui/components/styles";
```

## Usage

```tsx
import { Button, Badge, Alert } from "@nova-ui/components";

export function Demo() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="danger-primary" size="sm">Delete</Button>
      <Badge variant="success">Active</Badge>
      <Alert variant="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Something needs your attention.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  );
}
```

### Forms

```tsx
import { TextField, SearchableSelect } from "@nova-ui/components/form";

export function LoginForm() {
  return (
    <form>
      <TextField label="Email" type="email" placeholder="you@example.com" />
      <TextField label="Password" type="password" />
    </form>
  );
}
```

### Modals

```tsx
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button } from "@nova-ui/components";

export function ConfirmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Confirm action</ModalTitle>
        </ModalHeader>
        <ModalBody>Are you sure you want to proceed?</ModalBody>
        <ModalFooter>
          <Button variant="tertiary" onClick={onClose}>Cancel</Button>
          <Button variant="danger-primary">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

## Subpath imports

For better tree-shaking, import from specific subpaths:

```ts
import { Button, Icon } from "@nova-ui/components/ui";
import { TextField, SearchableSelect } from "@nova-ui/components/form";
import { Heading, Body } from "@nova-ui/components/typography";
import { TablePagination } from "@nova-ui/components/blocks";
import { useToast } from "@nova-ui/components/hooks";
```

## Design tokens

Tokens are CSS custom properties defined in the imported theme CSS. You can use them directly in your styles:

```css
.my-card {
  background: var(--color-surface-action-quiet);
  border: 1px solid var(--color-border-contextual-action-quiet);
  box-shadow: var(--shadow-action-md);
}
```

### Token categories

| Category | Example variables |
|---|---|
| Colors | `--color-surface-action-*`, `--color-text-body`, `--color-border-contextual-*` |
| Typography | `--font-size-h1`, `--font-weight-semibold`, `--line-height-normal` |
| Shadows | `--shadow-neutral-md`, `--shadow-danger-lg` |
| Sizing | `--container-width-lg`, `--container-height-md` |

## Components

### UI (36 components)

Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Dropdown Menu, Empty State, Helper Text, Icon, Input, Label, Modal, Page Tabs, Pagination, Popover, Progress, Radio Button, Row Card, Scroll Area, Segmented Control, Separator, Select, Skeleton, Spinner, Switch, Table, Textarea, Toast, Toggle, Tooltip

### Form (6 components)

TextField, TextareaField, FileDropZone, FileItem, GroupTextField, SearchableSelect

### Blocks (2 components)

Logs, TablePagination

### Typography (2 components)

Heading, Body

## CLI

Speed up setup and scaffolding with the Nova UI CLI:

```bash
npm install -g @nova-ui/cli
nova-ui init
```

See [@nova-ui/cli](https://www.npmjs.com/package/@nova-ui/cli) for details.

## License

MIT
