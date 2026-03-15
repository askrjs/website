import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();

function resolveAskrSourcePath() {
  const candidates = [
    resolve(root, '../askr/src/ssg/create-static-gen.ts'),
    resolve(root, 'askr/src/ssg/create-static-gen.ts'),
  ];

  const match = candidates.find((candidate) => existsSync(candidate));

  if (!match) {
    throw new Error(
      'Unable to locate askr source. Expected ../askr or ./askr checkout with src/ssg/create-static-gen.ts.'
    );
  }

  return match;
}

function resolveThemeTokensPath() {
  const candidates = [
    resolve(root, '../askr-themes/src/themes/default/tokens.css'),
    resolve(root, 'node_modules/@askrjs/askr-themes/src/themes/default/tokens.css'),
  ];
  const match = candidates.find((candidate) => existsSync(candidate));
  if (!match) throw new Error('Unable to locate askr-themes tokens.css.');
  return match;
}

async function run() {
  const args = process.argv.slice(2);
  const mode = args.includes('--incremental') ? 'incremental' : 'full';

  const askrModulePath = resolveAskrSourcePath();
  const askrModuleUrl = pathToFileURL(askrModulePath).href;

  const [{ createStaticGen }, config] = await Promise.all([
    import(askrModuleUrl),
    import(pathToFileURL(resolve(root, 'ssg.config.ts')).href),
  ]);

  const generator = createStaticGen({
    routes: config.routes,
    outputDir: resolve(root, 'dist'),
    seed: config.seed,
    concurrency: config.concurrency,
  });

  await generator.generate({ mode });

  copyFileSync(resolve(root, 'src/styles.css'), resolve(root, 'dist/styles.css'));
  copyFileSync(resolveThemeTokensPath(), resolve(root, 'dist/theme-tokens.css'));
}

run().catch((error: unknown) => {
  console.error('Website build failed.');
  console.error(error);
  process.exit(1);
});
