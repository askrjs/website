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
          find: '/ui/primitives/badge',
          replacement: resolve(process.cwd(), 'src/ui/primitives/badge.tsx'),
        },
        {
          find: '/ui/primitives/separator',
          replacement: resolve(
            process.cwd(),
            'src/ui/primitives/separator.tsx'
          ),
        },
        {
          find: '/ui/composites/tabs',
          replacement: resolve(process.cwd(), 'src/ui/composites/tabs.tsx'),
        },
        {
          find: '/ui/primitives',
          replacement: resolve(process.cwd(), 'src/ui/primitives'),
        },
        {
          find: '/ui/composites',
          replacement: resolve(process.cwd(), 'src/ui/composites'),
        },
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
        input: isSsrBuild ? 'src/server/entry-server.tsx' : 'src/client.tsx',
        output: {
          entryFileNames: isSsrBuild ? 'entry-server.js' : 'app.js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
    },
  };
}
