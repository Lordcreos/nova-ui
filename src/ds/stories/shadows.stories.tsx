import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Shadows",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Our shadow system provides depth and visual hierarchy through three semantic families, each with 7 elevation levels.

Shadow tokens are accessible as CSS variables **and** as auto-generated Tailwind classes:

\`\`\`html
<!-- CSS variable -->
<div style="box-shadow: var(--shadow-neutral-md)">…</div>

<!-- Tailwind class -->
<div class="shadow-neutral-md">…</div>
<div class="shadow-action-lg">…</div>
<div class="shadow-danger-xs">…</div>
\`\`\`

## Families
- **neutral** — general depth for cards, panels, dropdowns and overlays
- **action** — blue emphasis for interactive or selected elements
- **danger** — red focus for errors, destructive actions and critical messages

## Scale
\`xs\` → \`sm\` → \`md\` → \`lg\` → \`xl\` → \`2xl\` → \`3xl\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const
type Size = (typeof SIZES)[number]
type Family = "neutral" | "action" | "danger"

function ShadowCard({ family, size }: { family: Family; size: Size }) {
  const cls = `shadow-${family}-${size}` as const
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-[var(--text-body-quiet)] font-mono">{cls}</p>
      <div
        className={`h-20 w-full rounded-xl bg-[var(--neutral-object)] border border-[var(--border-neutral-silent)] ${cls}`}
      />
    </div>
  )
}

function FamilyRow({ family, label }: { family: Family; label: string }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-[var(--text-heading)] capitalize">{label}</h3>
      <div className="grid grid-cols-7 gap-4">
        {SIZES.map((size) => (
          <ShadowCard key={size} family={family} size={size} />
        ))}
      </div>
    </section>
  )
}

export const Default: Story = {
  name: "All Shadows",
  render: () => (
    <div className="space-y-10 p-6 min-w-[900px]">
      <FamilyRow family="neutral" label="Neutral — everyday elevation" />
      <FamilyRow family="action" label="Action — interactive emphasis" />
      <FamilyRow family="danger" label="Danger — critical states" />
    </div>
  ),
}

export const TokenReference: Story = {
  name: "Token Reference",
  render: () => (
    <div className="p-6">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-neutral-quiet)]">
            <th className="py-3 pr-6 text-left font-semibold text-[var(--text-heading)]">CSS variable</th>
            <th className="py-3 pr-6 text-left font-semibold text-[var(--text-heading)]">Tailwind class</th>
            <th className="py-3 text-left font-semibold text-[var(--text-heading)]">Preview</th>
          </tr>
        </thead>
        <tbody>
          {(["neutral", "action", "danger"] as Family[]).flatMap((family) =>
            SIZES.map((size) => (
              <tr key={`${family}-${size}`} className="border-b border-[var(--border-neutral-silent)]">
                <td className="py-3 pr-6">
                  <code className="rounded bg-[var(--neutral-foreground)] px-2 py-1 text-xs text-[var(--text-body)]">
                    --shadow-{family}-{size}
                  </code>
                </td>
                <td className="py-3 pr-6">
                  <code className="rounded bg-[var(--neutral-foreground)] px-2 py-1 text-xs text-[var(--text-action)]">
                    shadow-{family}-{size}
                  </code>
                </td>
                <td className="py-3">
                  <div
                    className={`h-10 w-20 rounded-lg bg-[var(--neutral-object)] border border-[var(--border-neutral-silent)] shadow-${family}-${size}`}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ),
}
