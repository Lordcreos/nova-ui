import { existsSync, readFileSync } from "fs";
import { join } from "path";

export function findProjectRoot(cwd = process.cwd()): string {
  let dir = cwd;
  while (dir !== join(dir, "..")) {
    if (existsSync(join(dir, "package.json"))) return dir;
    dir = join(dir, "..");
  }
  return cwd;
}

export function readPackageJson(cwd = process.cwd()): Record<string, unknown> {
  const path = join(cwd, "package.json");
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function detectFramework(cwd = process.cwd()): "next" | "vite" | "remix" | "unknown" {
  const pkg = readPackageJson(cwd);
  const deps = { ...(pkg.dependencies as object), ...(pkg.devDependencies as object) };
  if ("next" in deps) return "next";
  if ("@remix-run/react" in deps) return "remix";
  if ("vite" in deps) return "vite";
  return "unknown";
}
