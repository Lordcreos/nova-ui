import type { Meta, StoryObj } from "@storybook/react"
import { Body } from "./body"

const SIZES = [
  { size: "xs" as const, label: "XS", use: "Metadata, short helper text, and very compact supporting copy." },
  { size: "sm" as const, label: "SM", use: "Secondary descriptions, captions, and control content." },
  { size: "default" as const, label: "Default", use: "Interface paragraphs, forms, and normal reading text." },
  { size: "lg" as const, label: "LG", use: "Introductions, empty states, and messages that need more presence." },
]

const TONES = [
  { color: "loud" as const, token: "--text-body-loud", use: "Information that needs to compete near headings or actions." },
  { color: "default" as const, token: "--text-body", use: "Primary interface text." },
  { color: "quiet" as const, token: "--text-body-quiet", use: "Help text, context, notes, and lower-priority information." },
]

const meta: Meta<typeof Body> = {
  title: "Typography/Body",
  component: Body,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Body owns the system's reading text. Its API avoids scattering one-off styles across screens:
\`size\` controls scale, \`variant\` controls weight, and \`color\` connects to semantic text tokens.

Use it for descriptions, forms, table content, empty states, and contextual help.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Body>

export const Default: Story = {
  args: {
    children: "Interface text with consistent rhythm and token-driven tone.",
  },
}

export const SizeScale: Story = {
  name: "Scale",
  render: () => (
    <div className="space-y-5">
      {SIZES.map(({ size, label, use }) => (
        <section key={size} className="grid gap-3 border-b border-[var(--border-neutral-silent)] pb-5 md:grid-cols-[160px_1fr]">
          <div>
            <code className="text-xs text-[var(--text-action)]">size="{size}"</code>
            <p className="mt-1 text-xs text-[var(--text-body-quiet)]">{label}</p>
          </div>
          <div>
            <Body size={size}>Content should be easy to scan, even in dense product screens.</Body>
            <p className="mt-2 text-xs text-[var(--text-body-quiet)]">{use}</p>
          </div>
        </section>
      ))}
    </div>
  ),
}

export const ToneAndWeight: Story = {
  name: "Tone And Weight",
  render: () => (
    <div className="grid gap-8 md:grid-cols-2">
      <section className="space-y-4">
        <h3 className="text-h5 text-[var(--text-heading)]">Tones</h3>
        {TONES.map(({ color, token, use }) => (
          <div key={color}>
            <code className="text-xs text-[var(--text-action)]">color="{color}"</code>
            <Body color={color} className="mt-1">
              {use}
            </Body>
            <code className="mt-1 block text-xs text-[var(--text-body-quiet)]">{token}</code>
          </div>
        ))}
      </section>
      <section className="space-y-4">
        <h3 className="text-h5 text-[var(--text-heading)]">Weights</h3>
        <div>
          <code className="text-xs text-[var(--text-action)]">variant="default"</code>
          <Body className="mt-1">Regular weight for sustained reading.</Body>
        </div>
        <div>
          <code className="text-xs text-[var(--text-action)]">variant="bold"</code>
          <Body variant="bold" className="mt-1">
            Strong weight for labels, values, or focused emphasis.
          </Body>
        </div>
      </section>
    </div>
  ),
}

export const UsagePattern: Story = {
  name: "Usage Pattern",
  render: () => (
    <div className="max-w-xl rounded-lg border border-[var(--border-neutral-quiet)] p-5">
      <h3 className="text-h4 text-[var(--text-heading)]">Sync complete</h3>
      <Body className="mt-2">
        Changes were saved successfully and will be available to the team in a few seconds.
      </Body>
      <Body size="sm" color="quiet" className="mt-3">
        Last updated 2 minutes ago.
      </Body>
    </div>
  ),
}
