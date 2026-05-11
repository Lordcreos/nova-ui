import { useMemo, useState } from "react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/ds/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/ds/components/ui/avatar"
import { Badge } from "@/ds/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ds/components/ui/breadcrumb"
import { Button } from "@/ds/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ds/components/ui/card"
import { Checkbox } from "@/ds/components/ui/checkbox"
import { EmptyState } from "@/ds/components/ui/empty-state"
import { Icon } from "@/ds/components/ui/icon"
import { Label } from "@/ds/components/ui/label"
import { PageTabs } from "@/ds/components/ui/page-tabs"
import { Pagination } from "@/ds/components/ui/pagination"
import { Progress } from "@/ds/components/ui/progress"
import { RowCard, RowCardRight } from "@/ds/components/ui/row-card"
import { SegmentedControl, SegmentedControlItem } from "@/ds/components/ui/segmented-control"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ds/components/ui/select"
import { Separator } from "@/ds/components/ui/separator"
import { Skeleton } from "@/ds/components/ui/skeleton"
import { Spinner } from "@/ds/components/ui/spinner"
import { Switch } from "@/ds/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ds/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ds/components/ui/tooltip"
import { TextField } from "@/ds/components/form/text-field"
import { FileItem } from "@/ds/components/form/file-item"
import { Heading } from "@/ds/components/typography/heading"
import { Body } from "@/ds/components/typography/body"
import "./showcase.css"

const sections = [
  { id: "overview", label: "Overview", group: "Start" },
  { id: "install", label: "Installation", group: "Start" },
  { id: "foundations", label: "Foundations", group: "System" },
  { id: "components", label: "Components", group: "Library" },
  { id: "forms", label: "Forms", group: "Library" },
  { id: "patterns", label: "Patterns", group: "Experience" },
  { id: "cli", label: "CLI", group: "Delivery" },
  { id: "ship", label: "Ship", group: "Delivery" },
]

const stats = [
  ["40+", "Components"],
  ["3", "CLI commands"],
  ["7", "Token layers"],
  ["AA", "WCAG contrast"],
]

const palette = [
  ["Action", "--surface-action-solid", "--surface-action-accent-quiet"],
  ["Success", "--surface-success-solid", "--surface-success-accent-quiet"],
  ["Info", "--surface-info-solid", "--surface-info-accent-quiet"],
  ["Warning", "--surface-warning-solid", "--surface-warning-accent-quiet"],
  ["Danger", "--surface-danger-solid", "--surface-danger-accent-quiet"],
]

const componentRows = [
  { name: "Button", status: "Stable", usage: "Actions, dialogs, forms" },
  { name: "Card", status: "New", usage: "Content framing" },
  { name: "Alert", status: "New", usage: "Inline feedback" },
  { name: "EmptyState", status: "New", usage: "No data and onboarding" },
  { name: "Pagination", status: "New", usage: "Lists and data views" },
]

const componentCatalog = [
  {
    category: "UI",
    variant: "action" as const,
    count: 34,
    items: [
      "Accordion", "Alert", "Avatar", "Badge", "Breadcrumb",
      "Button", "Calendar", "Card", "Checkbox", "Dropdown Menu",
      "Empty State", "Helper Text", "Icon", "Input", "Label",
      "Modal", "Page Tabs", "Pagination", "Popover", "Progress",
      "Radio Button", "Row Card", "Scroll Area", "Segmented Control",
      "Separator", "Select", "Skeleton", "Spinner", "Switch",
      "Table", "Textarea", "Toast", "Toggle", "Tooltip",
    ],
  },
  {
    category: "Form",
    variant: "info" as const,
    count: 6,
    items: ["TextField", "TextareaField", "FileDropZone", "FileItem", "GroupTextField", "SearchableSelect"],
  },
  {
    category: "Blocks",
    variant: "success" as const,
    count: 2,
    items: ["Logs", "TablePagination"],
  },
  {
    category: "Typography",
    variant: "neutral" as const,
    count: 2,
    items: ["Heading", "Body"],
  },
]

function groupSections() {
  return sections.reduce<Record<string, typeof sections>>((groups, section) => {
    const group = groups[section.group] ?? []
    group.push(section)
    groups[section.group] = group
    return groups
  }, {})
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="showcase-code">
      <code>{children}</code>
    </pre>
  )
}

function Sidebar() {
  const groups = useMemo(groupSections, [])

  return (
    <aside className="showcase-sidebar">
      <a className="showcase-brand" href="#overview" aria-label="Nova UI overview">
        <span className="showcase-logo">
          <Icon name="sparkles" size="lg" />
        </span>
        <span>
          <strong>Nova UI</strong>
          <small>Design System</small>
        </span>
      </a>
      <nav className="showcase-nav" aria-label="Documentation sections">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className="showcase-nav-group">
            <p>{group}</p>
            {items.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                <span />
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </nav>
      <div className="showcase-sidebar-links">
        <a href="https://lordcreos.github.io/nova-ui/" target="_blank" rel="noreferrer" className="showcase-sidebar-link">
          <Icon name="globe" size="sm" />
          <Body size="xs">lordcreos.github.io/nova-ui</Body>
        </a>
        <a href="https://www.npmjs.com/package/@lordcreos/nova-ui" target="_blank" rel="noreferrer" className="showcase-sidebar-link">
          <Icon name="package" size="sm" />
          <Body size="xs">@lordcreos/nova-ui</Body>
        </a>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="showcase-topbar">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#overview">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Nova UI</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="showcase-topbar-actions">
        <Badge variant="success" shape="pill" icon={<Icon name="circle-check" />}>
          Build passing
        </Badge>

      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="overview" className="showcase-hero">
      <div className="showcase-hero-copy">
        <Badge variant="action" shape="pill" className="showcase-eyebrow" icon={<Icon name="rocket" />}>
          v0.1.0 — now available
        </Badge>
        <Heading variant="h3xl" color="loud" className="showcase-hero-title">
          A professional React design system, ready to ship.
        </Heading>
        <Body size="lg" color="quiet" className="showcase-hero-subtitle">
          40+ accessible components, a full design token system, and a CLI to set up any
          React project in seconds. Built with Radix UI, Tailwind CSS v4, and TypeScript.
        </Body>
        <div className="showcase-hero-actions">
          <a href="#install" className="showcase-hero-link">
            <Button size="lg" icon={<Icon name="download" />}>Get started</Button>
          </a>
          <a href="#components" className="showcase-hero-link">
            <Button variant="tertiary" size="lg" icon={<Icon name="layout-grid" />}>Browse components</Button>
          </a>
        </div>
      </div>
      <Card className="showcase-hero-panel">
        <CardHeader>
          <div>
            <CardTitle>Release readiness</CardTitle>
            <CardDescription>Snapshot for stakeholders</CardDescription>
          </div>
          <Badge variant="success" shape="pill" fill="solid">v0.1</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            ["Foundations", 92],
            ["Primitives", 86],
            ["Forms", 78],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="showcase-metric-row">
                <Body size="sm" variant="bold">{label}</Body>
                <Body size="sm" color="quiet">{value}%</Body>
              </div>
              <Progress value={Number(value)} />
            </div>
          ))}
          <Separator />
          <Alert variant="info">
            <AlertIcon><Icon name="info" /></AlertIcon>
            <AlertContent>
              <AlertTitle>Curated for presentation</AlertTitle>
              <AlertDescription>Uses the same components exported by the library.</AlertDescription>
            </AlertContent>
          </Alert>
        </CardContent>
      </Card>
      <div className="showcase-stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="showcase-section-header">
      <Badge variant="neutral" shape="pill">{eyebrow}</Badge>
      <Heading variant="h1" color="loud">{title}</Heading>
      <Body color="quiet">{description}</Body>
    </div>
  )
}

function InstallSection() {
  const [pm, setPm] = useState<"pnpm" | "npm" | "yarn">("pnpm")

  const cmds = {
    pnpm: { install: "pnpm add @lordcreos/nova-ui", peer: "pnpm add react react-dom" },
    npm:  { install: "npm install @lordcreos/nova-ui", peer: "npm install react react-dom" },
    yarn: { install: "yarn add @lordcreos/nova-ui", peer: "yarn add react react-dom" },
  }

  return (
    <section id="install" className="showcase-section">
      <SectionHeader
        eyebrow="Installation"
        title="Up and running in minutes"
        description="Install the package, import the theme once, and start importing components anywhere in your app."
      />
      <div className="showcase-grid two">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Install the package</CardTitle>
              <CardDescription>Available on npm — pick your package manager</CardDescription>
            </div>
            <SegmentedControl value={pm} onValueChange={(v) => setPm(v as typeof pm)}>
              <SegmentedControlItem value="pnpm">pnpm</SegmentedControlItem>
              <SegmentedControlItem value="npm">npm</SegmentedControlItem>
              <SegmentedControlItem value="yarn">yarn</SegmentedControlItem>
            </SegmentedControl>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">Install</Body>
              <CodeBlock>{cmds[pm].install}</CodeBlock>
            </div>
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">Peer dependencies</Body>
              <CodeBlock>{cmds[pm].peer}</CodeBlock>
            </div>
            <Alert variant="info">
              <AlertIcon><Icon name="info" /></AlertIcon>
              <AlertContent>
                <AlertTitle>Requires Node.js ≥ 18, React ≥ 18, Tailwind CSS v4</AlertTitle>
              </AlertContent>
            </Alert>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Theme setup</CardTitle>
            <CardDescription>Import design tokens once — they apply to every component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">main.tsx · _app.tsx · layout.tsx</Body>
              <CodeBlock>{`import "@lordcreos/nova-ui/styles";`}</CodeBlock>
            </div>
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">globals.css — Tailwind CSS v4</Body>
              <CodeBlock>{`@import "tailwindcss";\n@import "@lordcreos/nova-ui/styles";`}</CodeBlock>
            </div>
            <Separator />
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">Quick start</Body>
              <CodeBlock>{`import { Button, Badge, Alert }\n  from "@lordcreos/nova-ui";\n\n<Button variant="default">Get started</Button>`}</CodeBlock>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="showcase-grid three">
        <Card>
          <CardHeader>
            <div className="showcase-install-subpath-header">
              <Badge variant="action" shape="pill">ui</Badge>
              <CardTitle>UI components</CardTitle>
            </div>
            <CardDescription>@lordcreos/nova-ui/ui</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{`import {\n  Button, Badge, Alert,\n  Modal, Table, Tooltip\n} from "@lordcreos/nova-ui/ui";`}</CodeBlock>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="showcase-install-subpath-header">
              <Badge variant="info" shape="pill">form</Badge>
              <CardTitle>Form components</CardTitle>
            </div>
            <CardDescription>@lordcreos/nova-ui/form</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{`import {\n  TextField, TextareaField,\n  SearchableSelect, FileDropZone\n} from "@lordcreos/nova-ui/form";`}</CodeBlock>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="showcase-install-subpath-header">
              <Badge variant="neutral" shape="pill">more</Badge>
              <CardTitle>Typography & hooks</CardTitle>
            </div>
            <CardDescription>@lordcreos/nova-ui/typography · /hooks</CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{`import { Heading, Body }\n  from "@lordcreos/nova-ui/typography";\n\nimport { useToast }\n  from "@lordcreos/nova-ui/hooks";`}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function FoundationsSection() {
  return (
    <section id="foundations" className="showcase-section">
      <SectionHeader
        eyebrow="Foundations"
        title="Tokens with product intent"
        description="Color, spacing, type, shadows, and semantic states are shown as decisions a team can reuse."
      />
      <div className="showcase-grid two">
        <Card>
          <CardHeader>
            <CardTitle>Semantic palette</CardTitle>
            <CardDescription>Surface tokens mapped to product states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {palette.map(([label, solid, quiet]) => (
              <div key={label} className="showcase-color-row">
                <div className="showcase-swatch-pair">
                  <span style={{ background: `var(${solid})` }} />
                  <span style={{ background: `var(${quiet})` }} />
                </div>
                <div>
                  <Body size="sm" variant="bold">{label}</Body>
                  <Body size="xs" color="quiet" as="code">{solid}</Body>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Typography scale</CardTitle>
            <CardDescription>Responsive roles for docs and applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Heading variant="h2xl" color="loud">Display</Heading>
              <Body color="quiet">For first-screen product statements.</Body>
            </div>
            <Separator />
            <div className="showcase-type-list">
              {(["h1", "h2", "h3", "h4"] as const).map((variant) => (
                <div key={variant}>
                  <Body size="xs" color="quiet" as="code">.{variant}</Body>
                  <Heading variant={variant}>The quick system ships</Heading>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="showcase-grid three">
        {["xs", "sm", "md", "lg", "xl", "2xl"].map((level) => (
          <Card key={level} className="showcase-shadow-card" style={{ boxShadow: `var(--shadow-neutral-${level})` }}>
            <CardContent>
              <Body variant="bold">Shadow {level}</Body>
              <Body size="xs" color="quiet" as="code">--shadow-neutral-{level}</Body>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

function ComponentsSection() {
  const [tab, setTab] = useState("overview")
  const [period, setPeriod] = useState("week")
  const [page, setPage] = useState(3)

  return (
    <section id="components" className="showcase-section">
      <SectionHeader
        eyebrow="Components"
        title="A polished primitive layer"
        description="Buttons, status, selection controls, data display, loading states, and feedback primitives — 40+ components across 4 categories."
      />
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Component inventory</CardTitle>
            <CardDescription>Representative surface using the local exports</CardDescription>
          </div>
          <PageTabs
            items={[
              { key: "overview", label: "Overview", badge: 5 },
              { key: "status", label: "Status" },
              { key: "loading", label: "Loading" },
            ]}
            activeKey={tab}
            onTabChange={setTab}
            showBorder={false}
          />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="showcase-toolbar">
            <div className="showcase-button-row">
              <Button icon={<Icon name="plus" />}>Create</Button>
              <Button variant="secondary" icon={<Icon name="wand-sparkles" />}>Generate</Button>
              <Button variant="tertiary" icon={<Icon name="download" />}>Export</Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="More actions">
                    <Icon name="ellipsis" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>More actions</TooltipContent>
              </Tooltip>
            </div>
            <SegmentedControl value={period} onValueChange={setPeriod}>
              <SegmentedControlItem value="day">Day</SegmentedControlItem>
              <SegmentedControlItem value="week">Week</SegmentedControlItem>
              <SegmentedControlItem value="month">Month</SegmentedControlItem>
            </SegmentedControl>
          </div>
          <div className="showcase-grid three">
            <Alert variant="success">
              <AlertIcon><Icon name="circle-check" /></AlertIcon>
              <AlertContent>
                <AlertTitle>Success state</AlertTitle>
                <AlertDescription>Feedback stays compact and readable.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="warning">
              <AlertIcon><Icon name="triangle-alert" /></AlertIcon>
              <AlertContent>
                <AlertTitle>Usage warning</AlertTitle>
                <AlertDescription>Semantic tokens carry the tone.</AlertDescription>
              </AlertContent>
            </Alert>
            <Alert variant="danger">
              <AlertIcon><Icon name="circle-alert" /></AlertIcon>
              <AlertContent>
                <AlertTitle>Danger zone</AlertTitle>
                <AlertDescription>Critical states are consistent.</AlertDescription>
              </AlertContent>
            </Alert>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Component</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {componentRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-semibold text-[var(--text-heading)]">{row.name}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === "New" ? "action" : "success"} shape="pill">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="showcase-pagination-row">
            <Pagination currentPage={page} totalPages={9} onPageChange={setPage} />
          </div>
        </CardContent>
      </Card>
      <div className="showcase-grid three">
        <Card>
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
            <CardDescription>Loading layout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" className="h-10 w-10" />
              <div className="flex-1 space-y-2">
                <Skeleton shape="text" className="w-3/4" />
                <Skeleton shape="text" className="w-1/2" />
              </div>
            </div>
            <Skeleton className="h-24" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spinner</CardTitle>
            <CardDescription>Inline progress</CardDescription>
          </CardHeader>
          <CardContent className="showcase-spinner-card">
            <Spinner size="xl" tone="action" />
            <Button disabled icon={<Spinner size="sm" tone="inverse" />}>Saving</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
            <CardDescription>Avatar and status</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Avatar size="xl">
              <AvatarImage src="https://i.pravatar.cc/120?img=32" alt="Ava Morgan" />
              <AvatarFallback color="action">AM</AvatarFallback>
            </Avatar>
            <div>
              <Body variant="bold">Ava Morgan</Body>
              <Badge variant="success" shape="pill">Online</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full component catalog */}
      <div className="showcase-catalog">
        <div className="showcase-catalog-title">
          <Heading variant="h3">Complete component catalog</Heading>
          <Body color="quiet">All exported components grouped by subpath</Body>
        </div>
        <div className="showcase-catalog-grid">
          {componentCatalog.map((group) => (
            <div key={group.category} className="showcase-catalog-group">
              <div className="showcase-catalog-group-header">
                <div className="showcase-catalog-group-meta">
                  <Badge variant={group.variant} shape="pill">{group.category}</Badge>
                  <Body size="xs" color="quiet">{group.count} components</Body>
                </div>
              </div>
              <div className="showcase-catalog-chips">
                {group.items.map((name) => (
                  <span key={name} className="showcase-catalog-chip">{name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FormsSection() {
  const [enabled, setEnabled] = useState(true)

  return (
    <section id="forms" className="showcase-section">
      <SectionHeader
        eyebrow="Forms"
        title="Form controls that feel ready"
        description="Labels, fields, select inputs, helper states, file rows, and control groups compose into product workflows."
      />
      <div className="showcase-grid two">
        <Card>
          <CardHeader>
            <CardTitle>Project settings</CardTitle>
            <CardDescription>A compact form built from primitives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              label="Workspace"
              required
              defaultValue="Nova Cloud"
              helperText="Visible to everyone in the organization."
              leadingIcon={<Icon name="building-2" />}
            />
            <div className="grid gap-2">
              <Label htmlFor="region">Region</Label>
              <Select defaultValue="eu">
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="latam">Latin America</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="showcase-field-row">
              <Checkbox checked label="Enable audit log" />
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>
            <div className="showcase-field-row">
              <div>
                <Body size="sm" variant="bold">Public roadmap</Body>
                <Body size="xs" color="quiet">Share upcoming milestones.</Body>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="tertiary">Cancel</Button>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload package</CardTitle>
            <CardDescription>File item states for documentation assets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FileItem
              fileName="brand-guidelines.pdf"
              tag="Ready"
              color="success"
              message="2.4 MB uploaded"
            />
            <FileItem
              fileName="tokens-export.json"
              tag="Syncing"
              color="action"
              showProgress
              progressValue={68}
              message="Publishing to CDN"
            />
            <FileItem
              fileName="legacy-icons.zip"
              tag="Blocked"
              color="danger"
              error="Unsupported icon format"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function PatternsSection() {
  return (
    <section id="patterns" className="showcase-section">
      <SectionHeader
        eyebrow="Patterns"
        title="Reusable page moments"
        description="Real product states show how primitives become decisions: empty data, activity, settings, and cards."
      />
      <div className="showcase-grid two">
        <Card>
          <CardHeader>
            <CardTitle>Empty data</CardTitle>
            <CardDescription>Friendly, compact, action-oriented</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<Icon name="search" />}
              title="No matching components"
              description="Clear the filters or browse the full component index."
              action={<Button variant="tertiary" icon={<Icon name="filter-x" />}>Clear filters</Button>}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity feed</CardTitle>
            <CardDescription>Row cards with semantic badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {([
              ["rocket", "Published static docs", "The showcase is ready for review.", "success"],
              ["palette", "Updated color tokens", "Semantic aliases now cover states.", "action"],
              ["shield-check", "Accessibility pass", "Focus states and labels verified.", "info"],
            ] as const).map(([icon, title, subtitle, color]) => (
              <RowCard key={title} icon={{ name: icon }} title={title} subtitle={subtitle} color={color as "success" | "action" | "info"}>
                <RowCardRight>
                  <Badge variant={color as "success" | "action" | "info"} shape="pill">Done</Badge>
                </RowCardRight>
              </RowCard>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function CLISection() {
  return (
    <section id="cli" className="showcase-section">
      <SectionHeader
        eyebrow="CLI"
        title="@lordcreos/nova-ui-cli — project tooling"
        description="Initialize projects, scaffold component examples, and explore the registry directly from the terminal."
      />
      <Card className="showcase-cli-banner">
        <CardContent className="showcase-cli-banner-content">
          <div>
            <Body variant="bold">Install the CLI</Body>
            <Body size="sm" color="quiet">Available globally or run any command with npx</Body>
          </div>
          <div className="showcase-cli-installs">
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">Global install</Body>
              <CodeBlock>{`npm install -g @lordcreos/nova-ui-cli`}</CodeBlock>
            </div>
            <div className="showcase-cli-or">
              <Body size="xs" color="quiet">or</Body>
            </div>
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">Without installing</Body>
              <CodeBlock>{`npx @lordcreos/nova-ui-cli <command>`}</CodeBlock>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="showcase-grid three">
        <Card>
          <CardHeader>
            <Badge variant="action" shape="pill" icon={<Icon name="zap" />}>init</Badge>
            <CardTitle>Set up your project</CardTitle>
            <CardDescription>
              Detects your framework and package manager. Installs the package and injects the CSS import automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock>{`nova-ui init`}</CodeBlock>
            <div>
              <Body size="xs" color="quiet" className="showcase-code-label">Supported frameworks</Body>
              <div className="showcase-cli-frameworks">
                {["Vite", "Next.js", "Remix"].map((f) => (
                  <Badge key={f} variant="neutral" shape="pill">{f}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Badge variant="neutral" shape="pill" icon={<Icon name="plus" />}>add</Badge>
            <CardTitle>Scaffold a component</CardTitle>
            <CardDescription>
              Generates a ready-to-use .tsx example file for any component in the registry. Use --dry to preview.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock>{`nova-ui add button\nnova-ui add modal --dry\nnova-ui add table --dir src/ui`}</CodeBlock>
            <Alert variant="success">
              <AlertIcon><Icon name="file-code-2" /></AlertIcon>
              <AlertContent>
                <AlertTitle>Creates ButtonExample.tsx with working JSX</AlertTitle>
              </AlertContent>
            </Alert>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Badge variant="neutral" shape="pill" icon={<Icon name="list" />}>list</Badge>
            <CardTitle>Browse the registry</CardTitle>
            <CardDescription>
              Lists all components with exports and descriptions. Filter by category: ui, form, blocks, typography.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock>{`nova-ui list\nnova-ui list --category form\nnova-ui list --category ui`}</CodeBlock>
            <Alert variant="info">
              <AlertIcon><Icon name="info" /></AlertIcon>
              <AlertContent>
                <AlertTitle>Shows exports, description, and import path</AlertTitle>
              </AlertContent>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function ShipSection() {
  return (
    <section id="ship" className="showcase-section showcase-ship">
      <Card>
        <CardContent className="showcase-ship-content">
          <div>
            <Badge variant="success" shape="pill" fill="solid">Ready to publish</Badge>
            <Heading variant="h1" color="loud">Static, buildable, and stakeholder friendly.</Heading>
            <Body color="quiet">
              Run the Vite build and host the generated files from `dist`. This page is designed as the first
              thing a reviewer sees, not a marketing placeholder.
            </Body>
          </div>
          <div className="showcase-ship-actions">
            <Button size="lg" icon={<Icon name="upload-cloud" />}>Publish docs</Button>
            <Button size="lg" variant="tertiary" icon={<Icon name="terminal" />}>npm run build</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export function Playground() {
  return (
    <div className="showcase-shell">
      <Sidebar />
      <main className="showcase-main">
        <Topbar />
        <div className="showcase-content">
          <Hero />
          <InstallSection />
          <FoundationsSection />
          <ComponentsSection />
          <FormsSection />
          <PatternsSection />
          <CLISection />
          <ShipSection />
        </div>
      </main>
    </div>
  )
}
