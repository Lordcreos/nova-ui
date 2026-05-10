import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Design System/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
Nova treats color as intent first and hex values second. Primitive palette tokens live under
\`--color-*\`, while product UI should usually consume semantic tokens such as
\`--text-heading\`, \`--surface-action-solid\`, or \`--border-neutral-quiet\`.

## How to read this page

- **Text**: hierarchy, supporting content, and semantic state tokens.
- **Surfaces**: backgrounds for objects, soft states, and primary actions.
- **Borders**: neutral dividers plus contextual outlines.
- **Primitives**: base color ramps used to compose semantic tokens.

## Practical rule

Use semantic tokens in components. Reach for \`--color-*\` only when creating new tokens,
prototyping, or documenting the underlying palette.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

type Token = { name: string; value: string }

function ColorTile({ name, value, border = false }: Token & { border?: boolean }) {
  const isPrimitive = value.startsWith("--color-")
  const twName = isPrimitive ? value.replace("--color-", "") : null

  return (
    <div className="grid grid-cols-[56px_1fr] items-start gap-3 rounded-lg border border-[var(--border-neutral-quiet)] bg-[var(--neutral-object)] p-3">
      <div
        className="mt-0.5 h-12 w-12 flex-shrink-0 rounded-md border border-[var(--border-neutral-quiet)]"
        style={border ? { borderColor: `var(${value})`, borderWidth: 2 } : { backgroundColor: `var(${value})` }}
        title={value}
      />
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-[var(--text-heading)]">{name}</div>
        <code className="mt-0.5 block truncate text-[10px] text-[var(--text-body-quiet)]">{value}</code>
        {twName ? (
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
            <code className="text-[10px] text-[var(--text-action)]">bg-{twName}</code>
            <code className="text-[10px] text-[var(--text-action)]">text-{twName}</code>
            <code className="text-[10px] text-[var(--text-action)]">border-{twName}</code>
          </div>
        ) : (
          <code className="mt-1 block truncate text-[10px] text-[var(--text-body-quiet)]">bg-[var({value})]</code>
        )}
      </div>
    </div>
  )
}

function TokenSection({
  title,
  note,
  tokens,
  border,
}: {
  title: string
  note?: string
  tokens: Token[]
  border?: boolean
}) {
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-h5 text-[var(--text-heading)]">{title}</h3>
        {note && <p className="mt-1 text-sm text-[var(--text-body-quiet)]">{note}</p>}
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tokens.map((token) => (
          <ColorTile key={token.value} {...token} border={border} />
        ))}
      </div>
    </section>
  )
}

const scale = (family: string, steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]) =>
  steps.map((step) => ({ name: `${family}-${step}`, value: `--color-${family}-${step}` }))

export const TextTokens: Story = {
  name: "Text Tokens",
  render: () => (
    <div className="space-y-8 p-6">
      <TokenSection
        title="Text hierarchy"
        note="For headings, body copy, and secondary content."
        tokens={[
          { name: "heading loud", value: "--text-heading-loud" },
          { name: "heading", value: "--text-heading" },
          { name: "heading quiet", value: "--text-heading-quiet" },
          { name: "body loud", value: "--text-body-loud" },
          { name: "body", value: "--text-body" },
          { name: "body quiet", value: "--text-body-quiet" },
        ]}
      />
      <TokenSection
        title="State text"
        note="For actions, feedback, and system messages."
        tokens={[
          { name: "action", value: "--text-action" },
          { name: "success", value: "--text-success" },
          { name: "info", value: "--text-info" },
          { name: "warning", value: "--text-warning" },
          { name: "danger", value: "--text-danger" },
          { name: "on solid", value: "--text-on-solid" },
          { name: "on disabled", value: "--text-on-disabled" },
        ]}
      />
    </div>
  ),
}

export const SurfaceTokens: Story = {
  name: "Surface Tokens",
  render: () => (
    <div className="space-y-8 p-6">
      <TokenSection
        title="Action"
        note="Primary buttons, selection, and active states."
        tokens={[
          { name: "solid", value: "--surface-action-solid" },
          { name: "solid hover", value: "--surface-action-solid-hover" },
          { name: "solid active", value: "--surface-action-solid-active" },
          { name: "accent quiet", value: "--surface-action-accent-quiet" },
          { name: "accent", value: "--surface-action-accent" },
          { name: "accent loud", value: "--surface-action-accent-loud" },
          { name: "accent hover", value: "--surface-action-accent-hover" },
        ]}
      />
      {([
        ["Success", "Confirmations and positive states.", "success"],
        ["Info", "Informational states or neutral emphasis.", "info"],
        ["Warning", "Notices that need attention.", "warning"],
        ["Danger", "Errors, deletion, and critical states.", "danger"],
      ] as const).map(([title, note, key]) => (
        <TokenSection
          key={key}
          title={title}
          note={note}
          tokens={[
            { name: "solid", value: `--surface-${key}-solid` },
            { name: "solid hover", value: `--surface-${key}-solid-hover` },
            { name: "accent quiet", value: `--surface-${key}-accent-quiet` },
            { name: "accent", value: `--surface-${key}-accent` },
            { name: "accent loud", value: `--surface-${key}-accent-loud` },
          ]}
        />
      ))}
      <TokenSection
        title="Neutral"
        note="The application shell: page backgrounds, panels, and objects."
        tokens={[
          { name: "background", value: "--neutral-background" },
          { name: "foreground", value: "--neutral-foreground" },
          { name: "object", value: "--neutral-object" },
          { name: "accent silent", value: "--neutral-object-accent-silent" },
          { name: "accent quiet", value: "--neutral-object-accent-quiet" },
          { name: "accent", value: "--neutral-object-accent" },
          { name: "accent loud", value: "--neutral-object-accent-loud" },
        ]}
      />
    </div>
  ),
}

export const BorderTokens: Story = {
  name: "Border Tokens",
  render: () => (
    <div className="space-y-8 p-6">
      <TokenSection
        title="Neutral borders"
        note="Dividers, field outlines, and card boundaries."
        border
        tokens={[
          { name: "neutral loud", value: "--border-neutral-loud" },
          { name: "neutral", value: "--border-neutral" },
          { name: "neutral quiet", value: "--border-neutral-quiet" },
          { name: "neutral silent", value: "--border-neutral-silent" },
        ]}
      />
      <TokenSection
        title="Contextual borders"
        note="Semantic border variants for states, alerts, and validation."
        border
        tokens={[
          { name: "action", value: "--border-contextual-action" },
          { name: "action quiet", value: "--border-contextual-action-quiet" },
          { name: "success", value: "--border-contextual-success" },
          { name: "success quiet", value: "--border-contextual-success-quiet" },
          { name: "info", value: "--border-contextual-info" },
          { name: "info quiet", value: "--border-contextual-info-quiet" },
          { name: "warning", value: "--border-contextual-warning" },
          { name: "warning quiet", value: "--border-contextual-warning-quiet" },
          { name: "danger", value: "--border-contextual-danger" },
          { name: "danger quiet", value: "--border-contextual-danger-quiet" },
        ]}
      />
    </div>
  ),
}

export const PrimitivePalette: Story = {
  name: "Primitive Palette",
  render: () => (
    <div className="space-y-8 p-6">
      {[
        ["Gray", scale("gray")],
        ["Blue", scale("blue")],
        ["Emerald", scale("emerald")],
        ["Violet", scale("violet")],
        ["Amber", scale("amber")],
        ["Red", scale("red")],
        ["White", [
          { name: "white", value: "--color-white" },
          { name: "white · alpha-50", value: "--color-white-alpha-50" },
          { name: "white · alpha-100", value: "--color-white-alpha-100" },
          { name: "white · alpha-150", value: "--color-white-alpha-150" },
          { name: "white · alpha-300", value: "--color-white-alpha-300" },
        ] as Token[]],
      ].map(([title, tokens]) => (
        <TokenSection key={title as string} title={title as string} tokens={tokens as Token[]} />
      ))}
    </div>
  ),
}
