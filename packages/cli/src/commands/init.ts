import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import pc from "picocolors";
import { select, confirm } from "@inquirer/prompts";
import { detectPackageManager, getInstallCommand } from "../utils/detect-pm.js";
import { detectFramework, findProjectRoot, readPackageJson } from "../utils/file-utils.js";

type Framework = "vite" | "next" | "remix" | "unknown";

const CSS_IMPORT = `@import "@lordcreos/nova-ui/styles";`;

const ENTRY_POINTS: Record<Framework, string[]> = {
  vite: ["src/index.css", "src/main.css", "src/app.css", "src/styles/globals.css"],
  next: ["app/globals.css", "styles/globals.css"],
  remix: ["app/tailwind.css", "app/root.css"],
  unknown: ["src/index.css"],
};

function findCSSEntry(framework: Framework, root: string): string | null {
  for (const candidate of ENTRY_POINTS[framework]) {
    if (existsSync(join(root, candidate))) return join(root, candidate);
  }
  return null;
}

function injectCSSImport(cssPath: string): boolean {
  const content = readFileSync(cssPath, "utf-8");
  if (content.includes("@lordcreos/nova-ui/styles")) {
    console.log(pc.dim("  CSS import already present."));
    return false;
  }
  writeFileSync(cssPath, `${CSS_IMPORT}\n\n${content}`, "utf-8");
  return true;
}

export async function initCommand() {
  const root = findProjectRoot();
  const pkg = readPackageJson(root);

  console.log(`\n${pc.bold("Nova UI — Project setup")}\n`);

  const allDeps = { ...(pkg.dependencies as object ?? {}), ...(pkg.devDependencies as object ?? {}) };
  const alreadyInstalled = "@lordcreos/nova-ui" in allDeps;

  if (alreadyInstalled) {
    console.log(`${pc.green("✓")} @lordcreos/nova-ui is already installed.`);
  }

  const detectedFramework = detectFramework(root);
  const detectedPM = detectPackageManager(root);

  const framework = await select<Framework>({
    message: "Which framework are you using?",
    choices: [
      { value: "vite", name: "Vite (React)" },
      { value: "next", name: "Next.js" },
      { value: "remix", name: "Remix" },
      { value: "unknown", name: "Other" },
    ],
    default: detectedFramework === "unknown" ? "vite" : detectedFramework,
  });

  const pm = await select({
    message: "Package manager?",
    choices: [
      { value: "pnpm", name: "pnpm" },
      { value: "npm", name: "npm" },
      { value: "yarn", name: "yarn" },
    ],
    default: detectedPM,
  });

  console.log();

  if (!alreadyInstalled) {
    const shouldInstall = await confirm({
      message: `Install @lordcreos/nova-ui with ${pm}?`,
      default: true,
    });

    if (shouldInstall) {
      const cmd = getInstallCommand(pm as "pnpm" | "npm" | "yarn", "@lordcreos/nova-ui");
      console.log(pc.dim(`  Running: ${cmd.join(" ")}`));
      try {
        execSync(cmd.join(" "), { cwd: root, stdio: "inherit" });
        console.log(`${pc.green("✓")} Installed @lordcreos/nova-ui\n`);
      } catch {
        console.error(pc.red("  Installation failed. Run it manually:"));
        console.error(pc.dim(`  ${cmd.join(" ")}\n`));
      }
    }
  }

  const cssPath = findCSSEntry(framework, root);

  if (cssPath) {
    const injected = injectCSSImport(cssPath);
    if (injected) {
      console.log(`${pc.green("✓")} Added CSS import to ${pc.bold(cssPath.replace(root, "").replace(/^[\\/]/, ""))}`);
    }
  } else {
    console.log(pc.yellow("⚠ Could not detect CSS entry file. Add this manually:"));
    console.log(pc.dim(`\n  ${CSS_IMPORT}\n`));
  }

  console.log(`\n${pc.bold("You're all set!")} Start using components:\n`);
  console.log(pc.dim(`  import { Button } from "@lordcreos/nova-ui";\n`));
  console.log(pc.dim(`Run ${pc.white("nova-ui list")} to see all components.`));
  console.log(pc.dim(`Run ${pc.white("nova-ui add button")} to generate a usage example.\n`));
}
