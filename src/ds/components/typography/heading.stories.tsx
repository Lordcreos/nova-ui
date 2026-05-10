import type { CSSProperties } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Heading } from "./heading"

const VARIANTS = ["h4xl", "h3xl", "h2xl", "hxl", "h0", "h1", "h2", "h3", "h4", "h5", "h6"] as const

type HeadingVariant = (typeof VARIANTS)[number]
type SizeScale = { mobile: string; tablet?: string; laptop?: string; desktop?: string }

const SIZE_MAP: Record<HeadingVariant, SizeScale> = {
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

const TONES = [
  { color: "loud" as const, token: "--text-heading-loud", use: "Primary titles, hero copy, and the strongest page hierarchy." },
  { color: "default" as const, token: "--text-heading", use: "Section titles, panels, forms, and cards." },
  { color: "quiet" as const, token: "--text-heading-quiet", use: "Subtitles, secondary groups, and editorial labels." },
]

const THEMES = [
  {
    name: "Base",
    description: "Uses the global system tokens.",
    vars: {},
  },
  {
    name: "Deep Blue",
    description: "A brand example with cool, high-contrast headings.",
    vars: {
      "--text-heading-loud": "#172554",
      "--text-heading": "#1d4ed8",
      "--text-heading-quiet": "#60a5fa",
    },
  },
  {
    name: "Operational Green",
    description: "A product-focused example for dashboards and work surfaces.",
    vars: {
      "--text-heading-loud": "#064e3b",
      "--text-heading": "#047857",
      "--text-heading-quiet": "#34d399",
    },
  },
]

function sizeLabel(size: SizeScale) {
  return [size.mobile, size.tablet, size.laptop, size.desktop].filter(Boolean).join(" -> ")
}

const meta: Meta<typeof Heading> = {
  title: "Typography/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Heading is the semantic title layer for the system. It does not expose raw pixel values:
each variant maps to a responsive utility (\`text-h4xl\`, \`text-h2\`, and so on),
and each color maps to text tokens so themes can change without editing React.

Use the larger variants (\`h4xl\` through \`h0\`) for editorial compositions,
hero areas, or low-density screens. Use \`h1\` through \`h6\` for product UI:
forms, tables, panels, modals, and cards.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const Scale: Story = {
  name: "Responsive Scale",
  render: () => (
    <div className="space-y-1">
      <p className="mb-4 rounded-md border border-[var(--border-contextual-info-quiet)] bg-[var(--surface-info-accent-quiet)] px-3 py-2 text-xs text-[var(--text-info)]">
        Switch the Storybook viewport to see how each variant changes size across breakpoints.
      </p>
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          className="grid gap-4 border-b border-[var(--border-neutral-silent)] py-4 md:grid-cols-[190px_1fr]"
        >
          <div>
            <code className="text-xs text-[var(--text-action)]">variant="{variant}"</code>
            <p className="mt-1 text-xs text-[var(--text-body-quiet)]">{sizeLabel(SIZE_MAP[variant])}</p>
          </div>
          <Heading variant={variant}>Organize information with clarity</Heading>
        </div>
      ))}
    </div>
  ),
}

export const Tone: Story = {
  name: "Tone",
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      {TONES.map(({ color, token, use }) => (
        <section key={color} className="space-y-3 border-l border-[var(--border-neutral-quiet)] pl-4">
          <code className="block text-xs text-[var(--text-action)]">color="{color}"</code>
          <code className="block text-xs text-[var(--text-body-quiet)]">{token}</code>
          <Heading variant="h2" color={color}>
            System status
          </Heading>
          <p className="text-sm leading-6 text-[var(--text-body-quiet)]">{use}</p>
        </section>
      ))}
    </div>
  ),
}

export const ResponsiveMatrix: Story = {
  name: "Breakpoint Matrix",
  render: () => {
    const columns: Array<keyof SizeScale> = ["mobile", "tablet", "laptop", "desktop"]

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-[var(--border-neutral)] text-left text-[var(--text-body-quiet)]">
              <th className="py-3 pr-4 font-semibold">Variant</th>
              <th className="px-4 py-3 font-semibold">Mobile</th>
              <th className="px-4 py-3 font-semibold">Tablet</th>
              <th className="px-4 py-3 font-semibold">Laptop</th>
              <th className="px-4 py-3 font-semibold">Desktop</th>
            </tr>
          </thead>
          <tbody>
            {VARIANTS.map((variant) => (
              <tr key={variant} className="border-b border-[var(--border-neutral-silent)]">
                <td className="py-3 pr-4">
                  <code className="text-[var(--text-action)]">{variant}</code>
                </td>
                {columns.map((column) => (
                  <td key={column} className="px-4 py-3 font-mono text-xs text-[var(--text-body)]">
                    {SIZE_MAP[variant][column] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}

export const ThemeOverride: Story = {
  name: "Theme Override",
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      {THEMES.map(({ name, description, vars }) => (
        <section
          key={name}
          className="rounded-lg border border-[var(--border-neutral-quiet)] p-4"
          style={vars as CSSProperties}
        >
          <p className="mb-2 text-xs font-semibold text-[var(--text-body-quiet)]">{name}</p>
          <Heading variant="h3" color="loud">
            Monthly report
          </Heading>
          <Heading variant="h5" color="default" className="mt-2">
            Key metrics
          </Heading>
          <p className="mt-3 text-sm leading-6 text-[var(--text-body-quiet)]">{description}</p>
        </section>
      ))}
    </div>
  ),
}

export const TokenReference: Story = {
  name: "Token Reference",
  render: () => (
    <div className="space-y-5">
      <section className="space-y-2">
        <h3 className="text-h5 text-[var(--text-heading)]">Color</h3>
        {TONES.map(({ color, token }) => (
          <div key={color} className="grid gap-2 border-b border-[var(--border-neutral-silent)] py-2 md:grid-cols-[180px_1fr]">
            <code className="text-xs text-[var(--text-action)]">color="{color}"</code>
            <code className="text-xs text-[var(--text-body-quiet)]">{token}</code>
          </div>
        ))}
      </section>
      <section className="space-y-2">
        <h3 className="text-h5 text-[var(--text-heading)]">Utilities</h3>
        <p className="text-sm leading-6 text-[var(--text-body-quiet)]">
          Variants use explicit classes in <code>styles/theme.typography.css</code>, for example{" "}
          <code>text-h4xl</code>, <code>text-h2xl</code>, and <code>text-h6</code>. Each class defines
          font-size, line-height, and weight, with breakpoint changes where needed.
        </p>
      </section>
    </div>
  ),
}
