import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import pc from "picocolors";
import { findComponent } from "../registry.js";
import { findProjectRoot } from "../utils/file-utils.js";

function generateUsageExample(name: string, exports: string[], importPath: string): string {
  const primaryExport = exports[0];
  const allExports = exports.join(", ");

  const examples: Record<string, string> = {
    Button: `import { Button } from "${importPath}";

export function ${primaryExport}Example() {
  return (
    <div className="flex gap-2 flex-wrap">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger-primary" size="sm">Delete</Button>
      <Button variant="ghost" disabled>Disabled</Button>
    </div>
  );
}`,
    Modal: `import { ${allExports}, Button } from "${importPath}";
import { useState } from "react";

export function ModalExample() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent size="sm">
          <ModalHeader>
            <ModalTitle>Modal title</ModalTitle>
          </ModalHeader>
          <ModalBody>Modal content goes here.</ModalBody>
          <ModalFooter>
            <Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}`,
    TextField: `import { TextField } from "${importPath}";
import { useState } from "react";

export function TextFieldExample() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-4 max-w-sm">
      <TextField
        label="Full name"
        placeholder="John Doe"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        placeholder="you@example.com"
        helperText="We will never share your email."
      />
      <TextField
        label="Username"
        placeholder="johndoe"
        error="Username already taken"
      />
    </div>
  );
}`,
    Table: `import { ${allExports} } from "${importPath}";

const data = [
  { id: 1, name: "Alice", role: "Admin", status: "Active" },
  { id: 2, name: "Bob", role: "Editor", status: "Inactive" },
];

export function TableExample() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`,
  };

  if (examples[primaryExport]) return examples[primaryExport];

  return `import { ${allExports} } from "${importPath}";

export function ${primaryExport}Example() {
  return (
    <${primaryExport}>
      {/* Add your content here */}
    </${primaryExport}>
  );
}`;
}

export function addCommand(componentName: string, options: { dir?: string; dry?: boolean }) {
  const entry = findComponent(componentName);

  if (!entry) {
    console.error(pc.red(`Component "${componentName}" not found.`));
    console.log(pc.dim(`Run ${pc.white("nova-ui list")} to see all available components.\n`));
    process.exit(1);
  }

  const root = findProjectRoot();
  const outDir = options.dir ?? join(root, "src", "components", "examples");
  const fileName = `${entry.exports[0]}Example.tsx`;
  const filePath = join(outDir, fileName);

  const content = generateUsageExample(entry.name, entry.exports, entry.importPath);

  if (options.dry) {
    console.log(`\n${pc.bold(`Would create: ${filePath}`)}\n`);
    console.log(pc.dim(content));
    return;
  }

  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  if (existsSync(filePath)) {
    console.warn(pc.yellow(`File already exists: ${filePath}`));
    console.log(pc.dim("Use --dry to preview without writing.\n"));
    return;
  }

  writeFileSync(filePath, content, "utf-8");
  console.log(`\n${pc.green("✓")} Created ${pc.bold(filePath)}`);
  console.log(pc.dim(`  Exports: ${entry.exports.join(", ")}`));
  console.log(pc.dim(`  Import:  ${entry.importPath}\n`));
}
