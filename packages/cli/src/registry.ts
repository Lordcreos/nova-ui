export type ComponentCategory = "ui" | "form" | "blocks" | "typography";

export interface ComponentEntry {
  name: string;
  importPath: string;
  category: ComponentCategory;
  exports: string[];
  description: string;
}

export const registry: ComponentEntry[] = [
  // UI
  { name: "accordion", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"], description: "Expandable content sections" },
  { name: "alert", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Alert", "AlertIcon", "AlertContent", "AlertTitle", "AlertDescription"], description: "Contextual feedback messages" },
  { name: "avatar", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Avatar", "AvatarImage", "AvatarFallback"], description: "User profile image or initials" },
  { name: "badge", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Badge"], description: "Status and label indicators" },
  { name: "breadcrumb", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator"], description: "Navigation path indicator" },
  { name: "button", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Button"], description: "Interactive action trigger with 14 variants" },
  { name: "calendar", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Calendar"], description: "Date picker calendar" },
  { name: "card", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"], description: "Content container with sections" },
  { name: "checkbox", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Checkbox"], description: "Boolean selection control" },
  { name: "dropdown-menu", importPath: "@nova-ui/components/ui", category: "ui", exports: ["DropdownMenu", "DropdownMenuTrigger", "DropdownMenuContent", "DropdownMenuItem", "DropdownMenuSeparator", "DropdownMenuLabel"], description: "Contextual action menu" },
  { name: "empty-state", importPath: "@nova-ui/components/ui", category: "ui", exports: ["EmptyState"], description: "Placeholder for empty data views" },
  { name: "icon", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Icon"], description: "Lucide icon wrapper with size system" },
  { name: "input", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Input"], description: "Text input primitive" },
  { name: "modal", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Modal", "ModalContent", "ModalHeader", "ModalTitle", "ModalBody", "ModalFooter", "AlertModal"], description: "Dialog and confirmation modals" },
  { name: "pagination", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Pagination"], description: "Page navigation controls" },
  { name: "popover", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Popover", "PopoverTrigger", "PopoverContent"], description: "Floating content anchored to a trigger" },
  { name: "progress", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Progress"], description: "Progress bar indicator" },
  { name: "select", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Select", "SelectTrigger", "SelectContent", "SelectItem", "SelectValue"], description: "Single option selector" },
  { name: "skeleton", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Skeleton"], description: "Loading placeholder" },
  { name: "spinner", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Spinner"], description: "Loading spinner animation" },
  { name: "switch", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Switch"], description: "Toggle on/off control" },
  { name: "table", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Table", "TableHeader", "TableBody", "TableRow", "TableHead", "TableCell", "TableCaption", "TableFooter"], description: "Data table with all subcomponents" },
  { name: "toast", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Toast", "Toaster"], description: "Notification toasts via Sonner" },
  { name: "tooltip", importPath: "@nova-ui/components/ui", category: "ui", exports: ["Tooltip", "TooltipTrigger", "TooltipContent", "TooltipProvider"], description: "Hover information popup" },

  // Form
  { name: "text-field", importPath: "@nova-ui/components/form", category: "form", exports: ["TextField"], description: "Full input with label, error, helper text" },
  { name: "textarea-field", importPath: "@nova-ui/components/form", category: "form", exports: ["TextareaField"], description: "Multi-line text field with label" },
  { name: "searchable-select", importPath: "@nova-ui/components/form", category: "form", exports: ["SearchableSelect"], description: "Virtualized searchable dropdown" },
  { name: "file-drop-zone", importPath: "@nova-ui/components/form", category: "form", exports: ["FileDropZone", "FileItem"], description: "File upload with drag-and-drop" },

  // Blocks
  { name: "table-pagination", importPath: "@nova-ui/components/blocks", category: "blocks", exports: ["TablePagination"], description: "Pagination footer for data tables" },

  // Typography
  { name: "heading", importPath: "@nova-ui/components/typography", category: "typography", exports: ["Heading"], description: "Semantic heading (h1–h6) with size variants" },
  { name: "body", importPath: "@nova-ui/components/typography", category: "typography", exports: ["Body"], description: "Body text with size and weight variants" },
];

export function findComponent(name: string): ComponentEntry | undefined {
  return registry.find((c) => c.name === name || c.exports.some((e) => e.toLowerCase() === name.toLowerCase()));
}
