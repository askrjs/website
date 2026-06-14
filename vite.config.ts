import { resolve } from 'node:path';
import type { PluginOption, UserConfig } from 'vite-plus';
import { askr } from '@askrjs/vite';

interface VitePlusEnv {
  isSsrBuild?: boolean;
}

function askrPlugin(): PluginOption {
  return askr() as unknown as PluginOption;
}

export default function config({ isSsrBuild }: VitePlusEnv): UserConfig {
  return {
    plugins: [askrPlugin()],
    lint: {
      ignorePatterns: ['dist/**', 'node_modules/**', 'coverage/**'],
    },
    fmt: {
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 80,
      tabWidth: 2,
    },
    server: {
      port: 5173,
      open: true,
    },
    resolve: {
      alias: [
        {
          find: '/themes',
          replacement: resolve(
            process.cwd(),
            'node_modules/@askrjs/themes/src/themes'
          ),
        },
      ],
    },
    build: {
      outDir: isSsrBuild ? 'dist/server' : 'dist',
      emptyOutDir: false,
      sourcemap: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: isSsrBuild ? 'src/server/entry-server.tsx' : 'index.html',
        output: {
          entryFileNames: isSsrBuild ? 'entry-server.js' : 'app.js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  };
}
