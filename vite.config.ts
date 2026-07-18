import type { PluginOption, UserConfig } from 'vite-plus';
import { askr } from '@askrjs/vite';

function askrPlugin(): PluginOption {
  return askr() as unknown as PluginOption;
}

export default function config(): UserConfig {
  return {
    plugins: [askrPlugin()],
    lint: {
      ignorePatterns: ['.askr/**', 'dist/**', 'node_modules/**'],
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
      open: false,
    },
    build: {
      outDir: '.askr/client',
      emptyOutDir: true,
    },
  };
}
