import pc from "picocolors";
import { registry, type ComponentCategory } from "../registry.js";

const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  ui: "UI",
  form: "Form",
  blocks: "Blocks",
  typography: "Typography",
};

export function listCommand(category?: string) {
  const filter = category as ComponentCategory | undefined;
  const categories: ComponentCategory[] = filter ? [filter] : ["ui", "form", "blocks", "typography"];

  console.log(`\n${pc.bold("@lordcreos/nova-ui")} — available components\n`);

  for (const cat of categories) {
    const items = registry.filter((c) => c.category === cat);
    if (items.length === 0) continue;

    console.log(pc.cyan(pc.bold(`${CATEGORY_LABELS[cat]} (${items.length})`)));
    for (const item of items) {
      const exports = item.exports.slice(0, 3).join(", ") + (item.exports.length > 3 ? ", …" : "");
      console.log(`  ${pc.green(item.name.padEnd(22))} ${pc.dim(item.description)}`);
      console.log(`  ${pc.dim("exports:")} ${exports}`);
    }
    console.log();
  }

  console.log(pc.dim(`Run ${pc.white("nova-ui add <component>")} to generate a usage example.\n`));
}
