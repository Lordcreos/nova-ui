# Nova UI

Professional React design system built with Radix UI, Tailwind CSS v4, and TypeScript.

**40+ accessible, production-ready components** — fully typed, tree-shakeable, and styled with design tokens.

---

## Packages

| Package | Version | Description |
|---|---|---|
| `@lordcreos/nova-ui` | 0.1.0 | Component library |
| `@lordcreos/nova-ui-cli` | 0.1.0 | CLI for setup and scaffolding |

---

## Installation

```bash
# npm
npm install @lordcreos/nova-ui

# pnpm
pnpm add @lordcreos/nova-ui

# yarn
yarn add @lordcreos/nova-ui
```

### Peer dependencies

```bash
npm install react react-dom
```

---

## Setup

### 1. Import the theme CSS

In your app entry point (`main.tsx`, `_app.tsx`, or `layout.tsx`):

```ts
import "@lordcreos/nova-ui/styles";
```

### 2. Configure Tailwind CSS v4

In your CSS entry file:

```css
@import "tailwindcss";
@import "@lordcreos/nova-ui/styles";
```

---

## Quick start

```tsx
import { Button, Badge, Alert, AlertIcon, AlertContent, AlertTitle } from "@lordcreos/nova-ui";

export function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger-primary" size="sm">Delete</Button>
        <Button variant="ghost" disabled>Disabled</Button>
      </div>

      <Badge variant="success">Active</Badge>

      <Alert variant="warning">
        <AlertIcon />
        <AlertContent>
          <AlertTitle>Heads up</AlertTitle>
        </AlertContent>
      </Alert>
    </div>
  );
}
```

---

## Components

### UI

| Component | Exports | Description |
|---|---|---|
| `accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | Expandable content sections |
| `alert` | `Alert`, `AlertIcon`, `AlertContent`, `AlertTitle`, `AlertDescription` | Contextual feedback messages |
| `avatar` | `Avatar`, `AvatarImage`, `AvatarFallback` | User profile image or initials |
| `badge` | `Badge` | Status and label indicators |
| `breadcrumb` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator` | Navigation path indicator |
| `button` | `Button` | Interactive action trigger — 14 variants, 4 sizes |
| `calendar` | `Calendar` | Date picker calendar |
| `card` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Content container with sections |
| `checkbox` | `Checkbox` | Boolean selection control |
| `dropdown-menu` | `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel` | Contextual action menu |
| `empty-state` | `EmptyState` | Placeholder for empty data views |
| `icon` | `Icon` | Lucide icon wrapper with size system |
| `input` | `Input` | Text input primitive |
| `modal` | `Modal`, `ModalContent`, `ModalHeader`, `ModalTitle`, `ModalBody`, `ModalFooter`, `AlertModal` | Dialog and confirmation modals |
| `pagination` | `Pagination` | Page navigation controls |
| `popover` | `Popover`, `PopoverTrigger`, `PopoverContent` | Floating content anchored to a trigger |
| `progress` | `Progress` | Progress bar indicator |
| `select` | `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue` | Single option selector |
| `skeleton` | `Skeleton` | Loading placeholder |
| `spinner` | `Spinner` | Loading spinner animation |
| `switch` | `Switch` | Toggle on/off control |
| `table` | `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`, `TableFooter` | Data table with all subcomponents |
| `toast` | `Toast`, `Toaster` | Notification toasts via Sonner |
| `tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | Hover information popup |

### Form

| Component | Exports | Description |
|---|---|---|
| `text-field` | `TextField` | Full input with label, error, and helper text |
| `textarea-field` | `TextareaField` | Multi-line text field with label |
| `searchable-select` | `SearchableSelect` | Virtualized searchable dropdown |
| `file-drop-zone` | `FileDropZone`, `FileItem` | File upload with drag-and-drop |

### Blocks

| Component | Exports | Description |
|---|---|---|
| `table-pagination` | `TablePagination` | Pagination footer for data tables |

### Typography

| Component | Exports | Description |
|---|---|---|
| `heading` | `Heading` | Semantic heading (h1–h6) with size variants |
| `body` | `Body` | Body text with size and weight variants |

### Hooks

| Hook | Import | Description |
|---|---|---|
| `useToast` | `@lordcreos/nova-ui/hooks` | Trigger toast notifications programmatically |

---

## Usage examples

### Button variants

```tsx
import { Button } from "@lordcreos/nova-ui";

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger-primary">Danger</Button>
<Button variant="danger-secondary">Danger outline</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
```

### Modal

```tsx
import {
  Modal, ModalContent, ModalHeader, ModalTitle,
  ModalBody, ModalFooter, Button
} from "@lordcreos/nova-ui";
import { useState } from "react";

export function ConfirmModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Confirm action</ModalTitle>
          </ModalHeader>
          <ModalBody>Are you sure you want to proceed?</ModalBody>
          <ModalFooter>
            <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger-primary">Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Form fields

```tsx
import { TextField, TextareaField, SearchableSelect } from "@lordcreos/nova-ui/form";

<TextField
  label="Email"
  type="email"
  placeholder="you@example.com"
  helperText="We will never share your email."
/>

<TextField
  label="Username"
  placeholder="johndoe"
  error="Username already taken"
/>

<TextareaField
  label="Bio"
  placeholder="Tell us about yourself…"
  rows={4}
/>

<SearchableSelect
  label="Country"
  options={[{ value: "us", label: "United States" }]}
  placeholder="Search…"
/>
```

### Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@lordcreos/nova-ui";

const rows = [
  { name: "Alice", role: "Admin", status: "Active" },
  { name: "Bob",   role: "Editor", status: "Inactive" },
];

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((r) => (
      <TableRow key={r.name}>
        <TableCell>{r.name}</TableCell>
        <TableCell>{r.role}</TableCell>
        <TableCell>{r.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Toast

```tsx
import { Toaster } from "@lordcreos/nova-ui";
import { useToast } from "@lordcreos/nova-ui/hooks";

// Place <Toaster /> once in your app root
function App() {
  return (
    <>
      <Toaster />
      <YourApp />
    </>
  );
}

// Then trigger toasts from anywhere
function SaveButton() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "Saved!", variant: "success" })}>
      Save
    </Button>
  );
}
```

---

## Subpath imports

Import from specific subpaths for optimal tree-shaking:

```ts
import { Button, Icon, Badge }     from "@lordcreos/nova-ui/ui";
import { TextField, SearchableSelect } from "@lordcreos/nova-ui/form";
import { Heading, Body }            from "@lordcreos/nova-ui/typography";
import { TablePagination }          from "@lordcreos/nova-ui/blocks";
import { useToast }                 from "@lordcreos/nova-ui/hooks";
```

---

## Design tokens

Tokens ship as CSS custom properties in the theme file. Use them directly in your styles:

```css
.my-card {
  background:    var(--color-surface-action-quiet);
  border:        1px solid var(--color-border-contextual-action-quiet);
  box-shadow:    var(--shadow-action-md);
  border-radius: var(--radius-md);
}
```

### Token categories

| Category | Example tokens |
|---|---|
| Colors | `--color-surface-action-*`, `--color-text-body`, `--color-border-contextual-*` |
| Typography | `--font-size-h1`, `--font-weight-semibold`, `--line-height-normal` |
| Shadows | `--shadow-neutral-md`, `--shadow-danger-lg`, `--shadow-action-md` |
| Sizing | `--container-width-lg`, `--container-height-md` |
| Radius | `--radius-sm`, `--radius-md`, `--radius-lg` |
| Animations | `--duration-fast`, `--ease-spring` |

---

## CLI — `@lordcreos/nova-ui-cli`

Speed up setup with the Nova UI CLI.

### Install

```bash
# Global (recommended)
npm install -g @lordcreos/nova-ui-cli

# Or run directly with npx
npx @lordcreos/nova-ui-cli <command>
```

### Commands

#### `nova-ui init`

Guided setup for new projects. Detects your framework and package manager automatically.

```bash
nova-ui init
```

**What it does:**
- Detects your framework (Vite, Next.js, Remix)
- Detects your package manager (pnpm, npm, yarn)
- Installs `@lordcreos/nova-ui` if not present
- Injects the CSS import into your entry stylesheet

**Supported frameworks:**

| Framework | CSS entry file detected |
|---|---|
| Vite | `src/index.css`, `src/main.css`, `src/app.css` |
| Next.js | `app/globals.css`, `styles/globals.css` |
| Remix | `app/tailwind.css`, `app/root.css` |

---

#### `nova-ui add <component>`

Generates a ready-to-use example file for any component.

```bash
nova-ui add button
nova-ui add modal
nova-ui add text-field
nova-ui add table
```

**Options:**

| Flag | Description |
|---|---|
| `--dir <path>` | Output directory (default: `src/components/examples/`) |
| `--dry` | Preview the generated file without writing it |

**Examples:**

```bash
# Generate Button example in default location
nova-ui add button

# Preview without creating the file
nova-ui add modal --dry

# Output to a custom directory
nova-ui add table --dir src/app/components
```

The command creates a `.tsx` file with a working usage example:

```
src/components/examples/ButtonExample.tsx
```

---

#### `nova-ui list`

Lists all available components with their exports and descriptions.

```bash
nova-ui list

# Filter by category
nova-ui list --category ui
nova-ui list --category form
nova-ui list --category blocks
nova-ui list --category typography
```

**Output:**

```
@lordcreos/nova-ui — available components

UI (24)
  accordion              Expandable content sections
  exports: Accordion, AccordionItem, AccordionTrigger, …
  alert                  Contextual feedback messages
  exports: Alert, AlertIcon, AlertContent, …
  …

Form (4)
  text-field             Full input with label, error, helper text
  exports: TextField
  …
```

---

## Requirements

| Dependency | Version |
|---|---|
| Node.js | ≥ 18 |
| React | ^18 |
| Tailwind CSS | ^4 |
| TypeScript | ^5 (optional but recommended) |

---

## License

MIT
