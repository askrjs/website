import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { apiManifest } from '../src/pages/docs/api-manifest';
import { apiSymbolSets } from '../src/pages/docs/api-snapshot';
import { docsCatalog } from '../src/pages/docs/catalog';
import { marketingPages } from '../src/pages/marketing/catalog';
import { marketingRouteMetadata } from '../src/pages/marketing/_routes';

const root = process.cwd();
const dist = resolve(root, 'dist');
const errors: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};
const read = (path: string) => readFileSync(resolve(dist, path), 'utf8');
const routeFile = (route: string) =>
  route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;

const apiSymbolsByRoute = new Map(
  apiManifest.map((entrypoint) => [
    `/docs/reference/api/${entrypoint.packageName.slice('@askrjs/'.length)}/${entrypoint.slug}`,
    apiSymbolSets[entrypoint.symbolSet as keyof typeof apiSymbolSets],
  ])
);

const marketing = [
  { route: '/', ...marketingRouteMetadata['/'] },
  ...marketingPages.map((page) => ({
    route: page.path,
    title: page.title,
    description: page.description,
  })),
  { route: '/404', ...marketingRouteMetadata['/404'] },
].map((page) => ({ ...page, layout: 'marketing' }));

const docs = docsCatalog.map((page) => ({
  route: page.route,
  title: `${page.title} | Askr`,
  description: page.description,
  headings: page.headings.map(({ id }) => ({ id })),
  apiSymbols: apiSymbolsByRoute
    .get(page.route)
    ?.map(({ anchor }) => ({ anchor })),
  layout: 'docs',
}));

const expectations = [...marketing, ...docs];
const expectedRoutes = new Set(expectations.map(({ route }) => route));

assert(existsSync(dist), 'dist/ is missing');
assert(existsSync(resolve(dist, 'metadata.json')), 'metadata.json is missing');
const metadata = JSON.parse(read('metadata.json'));
const generatedRoutes = new Set(
  (metadata.routes ?? []).map(({ path }: { path: string }) => path)
);
assert(
  metadata.totalRoutes === expectations.length,
  `metadata must report ${expectations.length} routes`
);
assert(
  metadata.successful === expectations.length,
  'every route must generate successfully'
);
assert(metadata.failed === 0, 'metadata must report no failures');
assert(
  [...expectedRoutes].every((route) => generatedRoutes.has(route)) &&
    generatedRoutes.size === expectedRoutes.size,
  'metadata route set must exactly match the catalog and marketing routes'
);

const documents = new Map<string, string>();

function textContent(value: string) {
  return value
    .replace(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .trim();
}

for (const expectation of expectations) {
  const file = routeFile(expectation.route);
  assert(
    existsSync(resolve(dist, file)),
    `${expectation.route} document is missing`
  );
  if (!existsSync(resolve(dist, file))) continue;
  const html = read(file);
  documents.set(expectation.route, html);
  const titles = [...html.matchAll(/<title([^>]*)>(.*?)<\/title>/g)];
  assert(titles.length === 1, `${expectation.route} must have one title`);
  assert(
    titles[0]?.[1]?.includes('data-askr-head') &&
      titles[0]?.[2] === expectation.title,
    `${expectation.route} has the wrong or unowned title`
  );
  const descriptions = [
    ...html.matchAll(/<meta([^>]*name="description"[^>]*)>/g),
  ];
  assert(
    descriptions.length === 1 &&
      descriptions[0]?.[1]?.includes('data-askr-head'),
    `${expectation.route} must have one framework-owned description`
  );
  assert(
    html.includes(
      `content="${expectation.description.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}"`
    ),
    `${expectation.route} has the wrong description`
  );
  assert(
    html.includes(`data-layout="${expectation.layout}"`),
    `${expectation.route} is missing its layout marker`
  );
  assert(
    !html.includes('/src/'),
    `${expectation.route} references source files`
  );
  assert(
    html.includes('/assets/askr-logo-64.avif'),
    `${expectation.route} is missing the Askr mark`
  );
  const assets = [
    ...html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(?:js|css))"/g),
  ].map((match) => match[1]);
  assert(
    assets.some((asset) => /-[A-Za-z0-9_-]+\.js$/.test(asset!)),
    `${expectation.route} is missing a hashed script`
  );
  assert(
    assets.some((asset) => /-[A-Za-z0-9_-]+\.css$/.test(asset!)),
    `${expectation.route} is missing a hashed stylesheet`
  );
  for (const asset of assets)
    assert(
      existsSync(resolve(dist, `.${asset}`)),
      `${expectation.route} references missing ${asset}`
    );
  if (expectation.layout === 'docs') {
    for (const marker of [
      'Documentation navigation',
      'Search docs',
      'Open documentation navigation',
      'On this page',
      'Breadcrumb',
      'docs-pagination',
    ]) {
      assert(
        html.includes(marker),
        `${expectation.route} is missing docs marker: ${marker}`
      );
    }
    assert(
      html.includes(`data-docs-route="${expectation.route}"`),
      `${expectation.route} is missing its unique content marker`
    );
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert(
      new Set(ids).size === ids.length,
      `${expectation.route} contains duplicate anchors`
    );
    for (const heading of (expectation as (typeof docs)[number]).headings ?? [])
      assert(
        ids.includes(heading.id),
        `${expectation.route} is missing #${heading.id}`
      );
    for (const symbol of (expectation as (typeof docs)[number]).apiSymbols ??
      [])
      assert(
        ids.includes(symbol.anchor),
        `${expectation.route} is missing API anchor #${symbol.anchor}`
      );
    const toc = html.match(
      /<aside class="docs-toc"[^>]*>[\s\S]*?<\/aside>/
    )?.[0];
    const tocHeadings = [
      ...(toc ?? '').matchAll(/<a href="#([^"]+)">([\s\S]*?)<\/a>/g),
    ].map((match) => ({ id: match[1], title: textContent(match[2]!) }));
    const contentHeadings = [
      ...html.matchAll(
        /<h2 id="([^"]+)"[^>]*>[\s\S]*?<a href="#[^"]+">([\s\S]*?)<\/a>[\s\S]*?<\/h2>/g
      ),
    ].map((match) => ({ id: match[1], title: textContent(match[2]!) }));
    assert(
      JSON.stringify(tocHeadings) === JSON.stringify(contentHeadings),
      `${expectation.route} table of contents does not match its visible sections`
    );
    if (!(expectation as (typeof docs)[number]).apiSymbols) {
      assert(
        html.includes('data-code-block'),
        `${expectation.route} must include a directly adaptable code example`
      );
      assert(
        html.includes('How to use') ||
          expectation.route.endsWith('/lucide-gallery'),
        `${expectation.route} must explain how to use the documented surface`
      );
    }
  }
}

const canonicalSmoke: Record<string, string[]> = {
  '/docs/getting-started/first-application': [
    'createRouteRegistry',
    'count.set',
  ],
  '/docs/core-concepts/state-and-derived-values': ['derive', 'unitPrice'],
  '/docs/routing/definitions-and-layouts': [
    'createRouteRegistry',
    "route('/projects/:projectId'",
  ],
  '/docs/data/queries-and-consistency': ['defineQuery', 'createQuery'],
  '/docs/rendering/server-side-rendering': ['renderToString'],
  '/docs/server/request-binding': ['context.bind', 'created'],
  '/docs/authentication/authorization': ['permissions', 'forbidden'],
  '/docs/http-contracts/schemas': ['jsonSchema'],
  '/docs/charts/cartesian-marks': ['createPlot', 'Plot.Line'],
  '/docs/mcp/primitives': ['createMcpServer', '.tool'],
  '/docs/tooling/create': ['create startkit', '--prompt'],
};
for (const [route, snippets] of Object.entries(canonicalSmoke)) {
  const html = documents.get(route) ?? '';
  for (const snippet of snippets)
    assert(
      html.includes(snippet),
      `${route} is missing canonical content: ${snippet}`
    );
}

for (const [route, html] of documents) {
  const links = [...html.matchAll(/href="(\/[^"?#]*)(?:#[^"]*)?"/g)].map(
    (match) => match[1] || '/'
  );
  for (const link of links) {
    if (link.startsWith('/assets/')) continue;
    const normalized =
      link.endsWith('/') && link !== '/' ? link.slice(0, -1) : link;
    assert(
      expectedRoutes.has(normalized),
      `${route} links to missing route ${link}`
    );
  }
}

for (const asset of [
  'assets/askr-logo-64.avif',
  'assets/askr-logo-64.png',
  'assets/askr-logo-180.png',
  'assets/github-mark-black.svg',
  'assets/github-mark-white.svg',
  'robots.txt',
  'sitemap.xml',
])
  assert(existsSync(resolve(dist, asset)), `${asset} must be published`);
const sitemap = read('sitemap.xml');
const sitemapRoutes = new Set(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]!).pathname.replace(/\/$/, '') || '/'
  )
);
for (const route of expectedRoutes)
  if (route !== '/404')
    assert(sitemapRoutes.has(route), `sitemap is missing ${route}`);
assert(
  sitemapRoutes.size === expectedRoutes.size - 1,
  'sitemap must contain every indexable route exactly once'
);
assert(
  existsSync(resolve(dist, '404.html')),
  'GitHub Pages fallback is missing'
);
assert(read('404.html') === read('404/index.html'), '404.html must match /404');

const htmlFiles = readdirSync(dist, { recursive: true }).filter((file) =>
  String(file).endsWith('.html')
);
assert(
  htmlFiles.length >= expectations.length,
  'static output is missing generated documents'
);

if (errors.length) {
  console.error(
    `Static output verification failed:\n${errors.map((error) => `- ${error}`).join('\n')}`
  );
  process.exitCode = 1;
} else {
  console.log(
    `Static output verified: ${expectations.length} routes, ${docs.reduce((sum, page) => sum + (page.apiSymbols?.length ?? 0), 0)} API anchors.`
  );
}
