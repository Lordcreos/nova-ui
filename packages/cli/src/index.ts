import { Command } from "commander";
import pc from "picocolors";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";

const program = new Command();

program
  .name("nova-ui")
  .description("CLI for Nova UI design system")
  .version("0.1.0");

program
  .command("init")
  .description("Set up Nova UI in your project")
  .action(async () => {
    try {
      await initCommand();
    } catch (err) {
      if ((err as NodeJS.ErrnoException)?.code === "ERR_USE_AFTER_CLOSE") {
        process.exit(0);
      }
      console.error(pc.red("Error:"), err);
      process.exit(1);
    }
  });

program
  .command("add <component>")
  .description("Generate a usage example for a component")
  .option("--dir <path>", "Output directory for the generated file")
  .option("--dry", "Preview the output without writing files")
  .action((component: string, options: { dir?: string; dry?: boolean }) => {
    addCommand(component, options);
  });

program
  .command("list")
  .description("List all available components")
  .option("--category <category>", "Filter by category (ui, form, blocks, typography)")
  .action((options: { category?: string }) => {
    listCommand(options.category);
  });

program.parse(process.argv);
