import { useState } from "react"
import { Button } from "@/ds/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/ds/components/ui/dropdown-menu"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/ds/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ds/components/ui/tooltip"
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/ds/components/ui/toast"
import { SonnerToaster } from "@/ds/components/ui/toast"
import { useToast } from "@/ds/hooks/use-toast"

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-body-quiet)]">
        {title}
      </p>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  )
}

// ─── Toast variants (static) ──────────────────────────────────────────────────

function ToastVariants() {
  return (
    <ToastProvider>
      {(["default", "success", "danger", "warning", "info"] as const).map((variant) => (
        <Toast key={variant} variant={variant} open>
          <div className="grid gap-0.5">
            <ToastTitle>{variant} toast</ToastTitle>
            <ToastDescription>Short contextual message for this state.</ToastDescription>
          </div>
        </Toast>
      ))}
      <ToastViewport className="static w-[420px] max-h-none flex-col gap-3 p-0" />
    </ToastProvider>
  )
}

// ─── useToast live demo ───────────────────────────────────────────────────────

function LiveToast() {
  const { showToast, dismissToast } = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      {(["success", "error", "info", "warning"] as const).map((type) => (
        <Button
          key={type}
          variant="tertiary"
          size="sm"
          onClick={() => showToast({ title: type, description: `This is a ${type} notification.`, options: { type } })}
        >
          {type}
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={() => dismissToast()}>
        Dismiss all
      </Button>
    </div>
  )
}

// ─── Playground ───────────────────────────────────────────────────────────────

export function Playground() {
  const [toastOpen, setToastOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--neutral-background)] p-10 space-y-10">
      <SonnerToaster />

      {/* ── Dropdown ──────────────────────────────────── */}
      <Section title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="tertiary">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              Edit <DropdownMenuShortcut>E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Archive</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      {/* ── Popover ───────────────────────────────────── */}
      <Section title="Popover">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="tertiary">Open popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverClose aria-label="Close">
              <span aria-hidden="true" className="text-xs">✕</span>
            </PopoverClose>
            <div className="flex flex-col gap-1 pr-5">
              <p className="text-sm font-semibold text-[var(--text-heading)]">Workspace access</p>
              <p className="text-sm text-[var(--text-body-quiet)]">
                Invite teammates, review roles, and manage sharing permissions.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </Section>

      {/* ── Tooltip ───────────────────────────────────── */}
      <Section title="Tooltip">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger asChild>
              <Button variant="tertiary" size="sm">{side}</Button>
            </TooltipTrigger>
            <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
          </Tooltip>
        ))}
      </Section>

      {/* ── Toast variants (estáticas) ─────────────────── */}
      <Section title="Toast — variants">
        <ToastVariants />
      </Section>

      {/* ── Toast interactivo vía Radix ─────────────────── */}
      <Section title="Toast — Radix (interactivo)">
        <ToastProvider>
          <Button onClick={() => setToastOpen(true)}>Show toast</Button>
          <Toast open={toastOpen} onOpenChange={setToastOpen} variant="success">
            <div className="grid gap-0.5">
              <ToastTitle>Changes saved</ToastTitle>
              <ToastDescription>Your workspace settings were updated.</ToastDescription>
            </div>
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </Section>

      {/* ── useToast (Sonner) ──────────────────────────── */}
      <Section title="useToast — Sonner (live)">
        <LiveToast />
      </Section>
    </div>
  )
}
