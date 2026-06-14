import { cpSync, copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { createStaticGen } from '@askrjs/askr/ssg';

const root = process.cwd();

function resolveThemeTokensPath() {
  const candidates = [
    resolve(root, 'node_modules/@askrjs/themes/src/themes/default/tokens.css'),
    resolve(root, '../askr-themes/src/themes/default/tokens.css'),
  ];
  const match = candidates.find((candidate) => existsSync(candidate));
  if (!match) throw new Error('Unable to locate askr-themes tokens.css.');
  return match;
}

async function run() {
  const args = process.argv.slice(2);
  const mode = args.includes('--incremental') ? 'incremental' : 'full';

  const config = await import(
    pathToFileURL(resolve(root, 'ssg.config.ts')).href
  );
  const outputDir = config.outputDir ?? 'dist';

  const generator = createStaticGen({
    routes: config.routes,
    outputDir: resolve(root, outputDir),
    seed: config.seed,
    concurrency: config.concurrency,
  });

  await generator.generate({ mode });

  copyFileSync(
    resolve(root, 'src/styles.css'),
    resolve(root, outputDir, 'styles.css')
  );

  const stylesDir = resolve(root, 'src/styles');
  if (existsSync(stylesDir)) {
    cpSync(stylesDir, resolve(root, outputDir, 'styles'), {
      recursive: true,
    });
  }

  copyFileSync(
    resolveThemeTokensPath(),
    resolve(root, outputDir, 'theme-tokens.css')
  );

  const assetsDir = resolve(root, 'src/assets');
  if (existsSync(assetsDir)) {
    cpSync(assetsDir, resolve(root, outputDir, 'assets'), {
      recursive: true,
    });
  }
}

run().catch((error: unknown) => {
  console.error('Website build failed.');
  console.error(error);
  process.exit(1);
});
