import { existsSync } from "fs";
import { join } from "path";

export type PackageManager = "pnpm" | "yarn" | "npm";

export function detectPackageManager(cwd = process.cwd()): PackageManager {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

export function getInstallCommand(pm: PackageManager, pkg: string, dev = false): string[] {
  const flag = dev ? (pm === "npm" ? "--save-dev" : "-D") : "";
  switch (pm) {
    case "pnpm":
      return ["pnpm", "add", flag, pkg].filter(Boolean);
    case "yarn":
      return ["yarn", "add", flag, pkg].filter(Boolean);
    default:
      return ["npm", "install", flag, pkg].filter(Boolean);
  }
}
