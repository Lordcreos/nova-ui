import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/ds/index.ts"),
        ui: resolve(__dirname, "src/ds/components/ui/index.ts"),
        form: resolve(__dirname, "src/ds/components/form/index.ts"),
        blocks: resolve(__dirname, "src/ds/components/blocks/index.ts"),
        typography: resolve(__dirname, "src/ds/components/typography/index.ts"),
        hooks: resolve(__dirname, "src/ds/hooks/index.ts"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        /^@radix-ui\/.*/,
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "@tanstack/react-virtual",
        "usehooks-ts",
        "date-fns",
        "react-day-picker",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        preserveModules: false,
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
