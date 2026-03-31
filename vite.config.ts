import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const askrCorePkg = resolve(workspaceRoot, "askr/packages/askr-core");

export default defineConfig(({ isSsrBuild }) => ({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@askrjs/askr",
  },
  resolve: {
    alias: [
      {
        find: /^@askrjs\/askr$/,
        replacement: askrCorePkg,
      },
    ],
  },
  server: {
    fs: {
      allow: [workspaceRoot],
    },
  },
  build: {
    outDir: isSsrBuild ? "dist/server" : "dist",
    emptyOutDir: false,
    sourcemap: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: isSsrBuild ? "src/server/entry-server.tsx" : "src/client.tsx",
      output: {
        entryFileNames: isSsrBuild ? "entry-server.js" : "app.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
}));
