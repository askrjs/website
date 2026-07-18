import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { apiManifest } from '../src/pages/docs/api-manifest';
import { apiSymbolSets } from '../src/pages/docs/api-snapshot';
import { docsCatalog, docsSearchRecords } from '../src/pages/docs/catalog';

const outputPath = resolve(process.cwd(), 'public/docs-manifest.json');
const apiByRoute = new Map(
  apiManifest.map((entrypoint) => [
    `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}`,
    apiSymbolSets[entrypoint.symbolSet],
  ])
);
const manifest = {
  generatedFrom: 'package-lock.json and installed published declarations',
  pages: docsCatalog.map((page) => ({
    route: page.route,
    title: page.title,
    description: page.description,
    navGroup: page.navGroup,
    navSection: page.navSection,
    status: page.status,
    packages: page.packages,
    headings: page.headings.map(({ id, title }) => ({ id, title })),
    previous: page.previous,
    next: page.next,
    apiSymbols: apiByRoute.get(page.route)?.map(({ name, anchor }) => ({
      name,
      anchor,
    })),
  })),
  authoredSearchRecords: docsSearchRecords.length,
};
const source = `${JSON.stringify(manifest, null, 2)}\n`;

if (process.argv.includes('--check')) {
  if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8') !== source) {
    console.error('Docs manifest is out of date. Run npm run docs:manifest.');
    process.exitCode = 1;
  }
} else {
  writeFileSync(outputPath, source);
  console.log(
    `Generated documentation manifest for ${manifest.pages.length} routes.`
  );
}
