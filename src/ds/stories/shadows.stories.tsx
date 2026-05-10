import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Shadows",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Shadows define depth without relying on one-off component styles.
Nova groups elevation into three families so depth can communicate intent as well as layering.

## Families

- **neutral**: general depth for menus, popovers, cards, and overlays.
- **action**: blue emphasis for interactive or selected elements.
- **danger**: red focus for errors, destructive actions, and critical messages.

## Levels

Each family uses the same scale: \`xs\`, \`sm\`, \`md\`, \`lg\`, \`xl\`, \`2xl\`, \`3xl\`.
Start with \`xs\` or \`sm\` on small surfaces and reserve \`2xl\` or \`3xl\` for overlays.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const SIZES = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const
const FAMILIES = [
  { key: "neutral", title: "Neutral", note: "Everyday depth for regular UI layers." },
  { key: "action", title: "Action", note: "Emphasis for active or primary controls." },
  { key: "danger", title: "Danger", note: "Critical states that require immediate attention." },
] as const

function ShadowSample({ family, size }: { family: (typeof FAMILIES)[number]["key"]; size: (typeof SIZES)[number] }) {
  return (
    <div className="rounded-lg border border-[var(--border-neutral-quiet)] bg-[var(--neutral-object)] p-4">
      <div
        className="mb-4 h-16 rounded-md bg-[var(--neutral-object)]"
        style={{ boxShadow: `var(--shadow-${family}-${size})` }}
      />
      <code className="block text-xs text-[var(--text-heading)]">--shadow-{family}-{size}</code>
      <span className="mt-1 block text-[10px] text-[var(--text-body-quiet)]">{size}</span>
    </div>
  )
}

export const ScaleByFamily: Story = {
  name: "Scale By Family",
  render: () => (
    <div className="space-y-10 p-6">
      {FAMILIES.map((family) => (
        <section key={family.key} className="space-y-4">
          <div>
            <h3 className="text-h5 text-[var(--text-heading)]">{family.title}</h3>
            <p className="mt-1 text-sm text-[var(--text-body-quiet)]">{family.note}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SIZES.map((size) => (
              <ShadowSample key={size} family={family.key} size={size} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
}

export const TokenReference: Story = {
  name: "Token Reference",
  render: () => (
    <div className="p-6">
      <table className="w-full max-w-4xl border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-neutral-quiet)]">
            <th className="py-3 pr-4 text-left font-semibold text-[var(--text-heading)]">Token</th>
            <th className="py-3 pr-4 text-left font-semibold text-[var(--text-heading)]">Family</th>
            <th className="py-3 text-left font-semibold text-[var(--text-heading)]">Preview</th>
          </tr>
        </thead>
        <tbody>
          {FAMILIES.flatMap((family) =>
            SIZES.map((size) => (
              <tr key={`${family.key}-${size}`} className="border-b border-[var(--border-neutral-silent)]">
                <td className="py-3 pr-4">
                  <code className="rounded bg-[var(--neutral-foreground)] px-2 py-1 text-xs text-[var(--text-body)]">
                    --shadow-{family.key}-{size}
                  </code>
                </td>
                <td className="py-3 pr-4 text-[var(--text-body-quiet)]">{family.title}</td>
                <td className="py-3">
                  <div
                    className="h-9 w-16 rounded-md bg-[var(--neutral-object)]"
                    style={{ boxShadow: `var(--shadow-${family.key}-${size})` }}
                  />
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  ),
}
