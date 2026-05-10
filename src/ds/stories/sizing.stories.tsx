import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Sizing",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Sizing defines the physical limits of the interface: content widths, container heights,
and responsive padding. The goal is to avoid one-off measurements and keep layouts consistent
across pages, dashboards, and composed components.

## System layers

- **Container widths**: \`--container-xs\` through \`--container-3xl\`.
- **Container heights**: \`--container-h-3xs\` through \`--container-h-3xl\`.
- **Utility classes**: \`size-horizontal-*\` and \`size-vertical-*\`.
- **Section padding**: \`p-section-*\`, \`px-section-*\`, \`py-section-*\`, plus directional variants.

## Example

\`\`\`tsx
<main className="size-horizontal-xl px-section-md">
  <section className="size-vertical-sm">...</section>
</main>
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const HORIZONTAL_SIZES = [
  { name: "xs", token: "--container-xs", utility: "size-horizontal-xs", px: "440px" },
  { name: "sm", token: "--container-sm", utility: "size-horizontal-sm", px: "520px" },
  { name: "md", token: "--container-md", utility: "size-horizontal-md", px: "720px" },
  { name: "lg", token: "--container-lg", utility: "size-horizontal-lg", px: "960px" },
  { name: "xl", token: "--container-xl", utility: "size-horizontal-xl", px: "1020px" },
  { name: "2xl", token: "--container-2xl", utility: "size-horizontal-2xl", px: "1312px" },
  { name: "3xl", token: "--container-3xl", utility: "size-horizontal-3xl", px: "1440px" },
] as const

const VERTICAL_SIZES = [
  { name: "h-3xs", token: "--container-h-3xs", utility: "size-vertical-3xs", px: "240px" },
  { name: "h-2xs", token: "--container-h-2xs", utility: "size-vertical-2xs", px: "320px" },
  { name: "h-xs", token: "--container-h-xs", utility: "size-vertical-xs", px: "440px" },
  { name: "h-sm", token: "--container-h-sm", utility: "size-vertical-sm", px: "520px" },
  { name: "h-md", token: "--container-h-md", utility: "size-vertical-md", px: "640px" },
  { name: "h-lg", token: "--container-h-lg", utility: "size-vertical-lg", px: "720px" },
  { name: "h-xl", token: "--container-h-xl", utility: "size-vertical-xl", px: "840px" },
  { name: "h-2xl", token: "--container-h-2xl", utility: "size-vertical-2xl", px: "920px" },
  { name: "h-3xl", token: "--container-h-3xl", utility: "size-vertical-3xl", px: "1040px" },
] as const

export const WidthContainers: Story = {
  name: "Width Containers",
  render: () => (
    <div className="space-y-5 p-6">
      <p className="max-w-3xl text-sm text-[var(--text-body-quiet)]">
        Use these tokens to constrain horizontal content. The blue bar uses the real utility class and is clipped
        with max-width so it can be previewed inside the canvas.
      </p>
      {HORIZONTAL_SIZES.map(({ token, utility, px }) => (
        <div key={token} className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <code className="text-xs text-[var(--text-action)]">{utility}</code>
            <code className="text-xs text-[var(--text-body-quiet)]">{token}</code>
            <span className="text-xs text-[var(--text-body-quiet)]">{px}</span>
          </div>
          <div className="h-7 overflow-hidden rounded bg-[var(--neutral-foreground)]">
            <div className={`${utility} h-full max-w-full rounded bg-[var(--surface-action-solid)]`} />
          </div>
        </div>
      ))}
    </div>
  ),
}

export const HeightContainers: Story = {
  name: "Height Containers",
  render: () => (
    <div className="space-y-5 p-6">
      <p className="max-w-3xl text-sm text-[var(--text-body-quiet)]">
        Height tokens are intentionally large. To document them without breaking the viewport, each sample is
        visually scaled while keeping the real \`size-vertical-*\` class in use.
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {VERTICAL_SIZES.map(({ token, utility, px }) => (
          <div key={token} className="rounded-lg border border-[var(--border-neutral-quiet)] p-3">
            <code className="block text-xs text-[var(--text-action)]">{utility}</code>
            <code className="mt-1 block text-[10px] text-[var(--text-body-quiet)]">{token}</code>
            <span className="mt-1 block text-xs text-[var(--text-body-quiet)]">{px}</span>
            <div className="mt-3 flex h-32 items-end justify-center overflow-hidden rounded bg-[var(--neutral-foreground)]">
              <div
                className={`${utility} w-10 rounded-t bg-[var(--surface-success-solid)]`}
                style={{ transform: "scaleY(0.1154)", transformOrigin: "bottom" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const SectionPadding: Story = {
  name: "Section Padding",
  render: () => (
    <div className="grid max-w-5xl gap-4 p-6 md:grid-cols-2">
      {(["xl", "lg", "md", "sm", "xs"] as const).map((size) => (
        <section key={size} className="rounded-lg border border-[var(--border-neutral-quiet)] bg-[var(--neutral-object)]">
          <div className={`p-section-${size} bg-[var(--surface-action-accent-quiet)]`}>
            <code className="text-xs text-[var(--text-action)]">p-section-{size}</code>
            <p className="mt-2 text-sm text-[var(--text-body)]">
              Responsive padding for page sections. Values shift across tablet, laptop, and desktop breakpoints.
            </p>
          </div>
        </section>
      ))}
    </div>
  ),
}

export const ReferenceTable: Story = {
  name: "Reference Table",
  render: () => (
    <div className="p-6">
      <table className="w-full max-w-4xl border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-neutral)]">
            <th className="py-3 pr-4 text-left font-semibold text-[var(--text-heading)]">Token</th>
            <th className="py-3 pr-4 text-left font-semibold text-[var(--text-heading)]">Utility</th>
            <th className="py-3 text-left font-semibold text-[var(--text-heading)]">Value</th>
          </tr>
        </thead>
        <tbody>
          {[...HORIZONTAL_SIZES, ...VERTICAL_SIZES].map(({ token, utility, px }) => (
            <tr key={token} className="border-b border-[var(--border-neutral-silent)]">
              <td className="py-3 pr-4">
                <code className="rounded bg-[var(--neutral-foreground)] px-2 py-1 text-xs text-[var(--text-body)]">
                  {token}
                </code>
              </td>
              <td className="py-3 pr-4 text-[var(--text-body-quiet)]">{utility}</td>
              <td className="py-3 text-[var(--text-body-quiet)]">{px}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
