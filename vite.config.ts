import type { PluginOption, UserConfig } from 'vite-plus';
import { askr } from '@askrjs/vite';
import { configDefaults } from 'vitest/config';

function askrPlugin(): PluginOption {
  return askr() as unknown as PluginOption;
}

export default function config(): UserConfig {
  return {
    plugins: [askrPlugin()],
    lint: {
      ignorePatterns: ['.askr/**', 'dist/**', 'node_modules/**'],
    },
    test: {
      // Agent worktrees under .claude/ are full checkouts of this repo, so
      // without this their copies of every suite are discovered alongside the
      // real ones. Vitest's own defaults are kept alongside it.
      exclude: [...configDefaults.exclude, '**/.claude/**'],
    },
    fmt: {
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 80,
      tabWidth: 2,
    },
    build: {
      outDir: '.askr/client',
      emptyOutDir: true,
      sourcemap: false,
      // The two largest chunks are generated documentation datasets. They are
      // route-loaded, highly compressible, and intentionally bounded below
      // this limit rather than folded into the initial application entry.
      chunkSizeWarningLimit: 800,
    },
  };
}
