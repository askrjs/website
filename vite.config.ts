import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@askrjs/askr",
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
