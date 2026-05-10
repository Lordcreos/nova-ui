import type { Meta, StoryObj } from "@storybook/react"
import { Heading } from "@/ds/components/typography/heading"
import { Body } from "@/ds/components/typography/body"

const meta: Meta = {
  title: "Design System/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Nova typography has two layers: numeric tokens and semantic variants.
\`--text-*\` tokens define the raw scale, while \`Heading\` and \`Body\`
translate that scale into product-facing roles.

## Heading breakpoints

- **Mobile**: base styles from 320px.
- **Tablet**: 769px.
- **Laptop**: 992px.
- **Desktop**: 1440px.

## Usage

\`\`\`tsx
<Heading variant="h2" color="default">Panel title</Heading>
<Body size="sm" color="quiet">Supporting description</Body>
\`\`\`

You can also use utility classes directly when building plain markup:

\`\`\`html
<h2 className="text-h2 text-[var(--text-heading)]">Panel title</h2>
\`\`\`

## Guidance

Use \`h4xl\` through \`h0\` for editorial layouts and hero moments. Use \`h1\` through \`h6\`
for product screens, forms, panels, and cards.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const HEADING_VARIANTS = [
  "h4xl",
  "h3xl",
  "h2xl",
  "hxl",
  "h0",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
] as const

type HeadingVariant = (typeof HEADING_VARIANTS)[number]
type SizeInfo = { mobile: string; tablet?: string; laptop?: string; desktop?: string }

const SIZE_MAP: Record<HeadingVariant, SizeInfo> = {
  h4xl: { mobile: "48px", tablet: "72px", laptop: "96px", desktop: "128px" },
  h3xl: { mobile: "36px", tablet: "60px", laptop: "72px", desktop: "96px" },
  h2xl: { mobile: "32px", tablet: "48px", laptop: "60px", desktop: "72px" },
  hxl: { mobile: "28px", tablet: "36px", laptop: "48px", desktop: "60px" },
  h0: { mobile: "24px", tablet: "32px", laptop: "36px", desktop: "48px" },
  h1: { mobile: "28px", tablet: "32px", laptop: "36px" },
  h2: { mobile: "24px", tablet: "28px", laptop: "32px" },
  h3: { mobile: "20px", tablet: "24px", laptop: "28px" },
  h4: { mobile: "18px", tablet: "20px", laptop: "24px" },
  h5: { mobile: "16px", tablet: "18px", laptop: "20px" },
  h6: { mobile: "16px" },
}

const TYPE_SCALE = [
  { token: "--text-2xs", px: "10px" },
  { token: "--text-xs", px: "12px" },
  { token: "--text-sm", px: "14px" },
  { token: "--text-base", px: "16px" },
  { token: "--text-lg", px: "18px" },
  { token: "--text-xl", px: "20px" },
  { token: "--text-2xl", px: "24px" },
  { token: "--text-3xl", px: "28px" },
  { token: "--text-4xl", px: "32px" },
  { token: "--text-5xl", px: "36px" },
  { token: "--text-6xl", px: "48px" },
  { token: "--text-7xl", px: "60px" },
  { token: "--text-8xl", px: "72px" },
  { token: "--text-9xl", px: "96px" },
  { token: "--text-10xl", px: "128px" },
] as const

function sizeLabel(size: SizeInfo) {
  return [
    `mobile ${size.mobile}`,
    size.tablet && `tablet ${size.tablet}`,
    size.laptop && `laptop ${size.laptop}`,
    size.desktop && `desktop ${size.desktop}`,
  ]
    .filter(Boolean)
    .join(" / ")
}

export const HeadingSystem: Story = {
  name: "Heading System",
  render: () => (
    <div className="space-y-5 p-6">
      {HEADING_VARIANTS.map((variant) => (
        <div
          key={variant}
          className="grid gap-3 border-b border-[var(--border-neutral-silent)] pb-5 md:grid-cols-[180px_1fr]"
        >
          <div>
            <code className="text-xs text-[var(--text-action)]">variant="{variant}"</code>
            <p className="mt-1 text-xs text-[var(--text-body-quiet)]">{sizeLabel(SIZE_MAP[variant])}</p>
          </div>
          <Heading variant={variant} color="default">
            Build calm, precise interfaces
          </Heading>
        </div>
      ))}
    </div>
  ),
}

export const HeadingTone: Story = {
  name: "Heading Tone",
  render: () => (
    <div className="space-y-8 p-6">
      {(["loud", "default", "quiet"] as const).map((color) => (
        <section key={color} className="space-y-2">
          <code className="text-xs text-[var(--text-body-quiet)]">
            color="{color}" uses {color === "default" ? "--text-heading" : `--text-heading-${color}`}
          </code>
          <Heading variant="h2" color={color}>
            Dashboard overview
          </Heading>
          <Heading variant="h5" color={color}>
            Secondary section label
          </Heading>
        </section>
      ))}
    </div>
  ),
}

export const BodySystem: Story = {
  name: "Body System",
  render: () => (
    <div className="grid gap-8 p-6 md:grid-cols-3">
      <section className="space-y-4">
        <h3 className="text-h5 text-[var(--text-heading)]">Sizes</h3>
        {(["xs", "sm", "default", "lg"] as const).map((size) => (
          <div key={size}>
            <code className="text-xs text-[var(--text-body-quiet)]">size="{size}"</code>
            <Body size={size}>Clear system copy helps teams move faster.</Body>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h3 className="text-h5 text-[var(--text-heading)]">Weight</h3>
        {(["default", "bold"] as const).map((variant) => (
          <div key={variant}>
            <code className="text-xs text-[var(--text-body-quiet)]">variant="{variant}"</code>
            <Body variant={variant}>Readable text with predictable emphasis.</Body>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h3 className="text-h5 text-[var(--text-heading)]">Tone</h3>
        {(["loud", "default", "quiet"] as const).map((color) => (
          <div key={color}>
            <code className="text-xs text-[var(--text-body-quiet)]">color="{color}"</code>
            <Body color={color}>Use tone to organize importance.</Body>
          </div>
        ))}
      </section>
    </div>
  ),
}

export const TokenScale: Story = {
  name: "Token Scale",
  render: () => (
    <div className="space-y-3 p-6">
      <p className="text-sm text-[var(--text-body-quiet)]">
        Complete numeric scale from 10px to 128px. These tokens power the semantic variants.
      </p>
      {TYPE_SCALE.map(({ token, px }) => (
        <div
          key={token}
          className="grid grid-cols-[120px_56px_1fr] items-center gap-4 border-b border-[var(--border-neutral-silent)] pb-3"
        >
          <code className="text-xs text-[var(--text-body-quiet)]">{token}</code>
          <span className="text-xs text-[var(--text-body-quiet)]">{px}</span>
          <span className="truncate leading-tight text-[var(--text-heading)]" style={{ fontSize: `var(${token})` }}>
            Aa
          </span>
        </div>
      ))}
    </div>
  ),
}

export const WeightTokens: Story = {
  name: "Weight Tokens",
  render: () => (
    <div className="space-y-4 p-6">
      {[
        { token: "--font-weight-heading", value: "600", label: "Heading" },
        { token: "--font-weight-body", value: "400", label: "Body" },
        { token: "--font-weight-body-bold", value: "600", label: "Body bold" },
        { token: "--font-weight-action", value: "600", label: "Action" },
      ].map(({ token, value, label }) => (
        <div key={token} className="grid gap-3 border-b border-[var(--border-neutral-silent)] pb-3 md:grid-cols-[220px_1fr]">
          <div>
            <code className="text-xs text-[var(--text-body-quiet)]">{token}</code>
            <p className="text-xs text-[var(--text-body-quiet)]">weight {value}</p>
          </div>
          <span className="text-lg text-[var(--text-heading)]" style={{ fontWeight: `var(${token})` }}>
            {label} sample
          </span>
        </div>
      ))}
    </div>
  ),
}
