import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="breadcrumb"
      aria-label="breadcrumb"
      className={cn("", className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1 text-sm text-[var(--text-body-quiet)]", className)}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

type BreadcrumbLinkProps = React.ComponentProps<"a"> & { asChild?: boolean }

function BreadcrumbLink({ asChild, className, ...props }: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "transition-colors duration-150 hover:text-[var(--text-body)]",
        "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring-action)]/30 rounded",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-medium text-[var(--text-body)]", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5 text-[var(--text-body-quiet)]", className)}
      {...props}
    >
      {children ?? (
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" aria-hidden="true">
          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <svg width="16" height="4" viewBox="0 0 16 4" fill="none" aria-hidden="true">
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        <circle cx="8" cy="2" r="1.5" fill="currentColor" />
        <circle cx="14" cy="2" r="1.5" fill="currentColor" />
      </svg>
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
