import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const errors = [];

const expectedRoutes = {
  '/': {
    file: 'index.html',
    layout: 'marketing',
    title: 'Askr — Full-stack TypeScript applications',
    description:
      'Build fast, typed applications across the browser and server with Askr.',
    content: 'Build full-stack TypeScript apps with Askr.',
  },
  '/docs': {
    file: 'docs/index.html',
    layout: 'docs',
    title: 'Documentation — Askr',
    description:
      'Learn how Askr fits together and find the shortest path into the framework.',
    content: 'Build with Askr',
  },
  '/docs/getting-started': {
    file: 'docs/getting-started/index.html',
    layout: 'docs',
    title: 'Getting started — Askr',
    description:
      'Install Askr, create your first application, and run it locally.',
    content: 'Your first Askr app',
  },
  '/docs/core-concepts': {
    file: 'docs/core-concepts/index.html',
    layout: 'docs',
    title: 'Core concepts — Askr',
    description:
      'Understand Askr routes, reactive state, rendering modes, and hydration.',
    content: 'Runtime and rendering',
  },
};

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function filesIn(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

function assertGeneratedDocument(routePath, expectation) {
  const documentPath = resolve(dist, expectation.file);
  assert(existsSync(documentPath), `${routePath} document is missing`);
  if (!existsSync(documentPath)) return;

  const html = readFileSync(documentPath, 'utf8');
  const app = html.match(/<div id="app">([\s\S]*?)<\/div>/)?.[1] ?? '';
  const assetReferences = Array.from(
    html.matchAll(/(?:src|href)="(\/assets\/[^"?]+\.(?:js|css))"/g),
    (match) => match[1]
  );

  assert(
    html.includes(expectation.content),
    `${routePath} is missing its pre-rendered page content`
  );
  assert(app.trim().length > 0, `${routePath} #app has no pre-rendered markup`);
  assert(
    html.includes(`data-layout="${expectation.layout}"`),
    `${routePath} is missing the ${expectation.layout} layout marker`
  );
  if (expectation.layout === 'docs') {
    assert(
      html.includes('data-sidebar-collapsed="false"'),
      `${routePath} must use the deterministic expanded sidebar markup`
    );
    assert(
      html.includes('aria-current="page"'),
      `${routePath} must identify the active docs route`
    );
  }
  assert(
    html.includes(`<title>${expectation.title}</title>`),
    `${routePath} has the wrong title`
  );
  assert(
    html.includes(`content="${expectation.description}"`),
    `${routePath} has the wrong description`
  );
  assert(!html.includes('/src/'), `${routePath} references source files`);
  assert(
    html.includes('/assets/askr-logo.png'),
    `${routePath} does not reference the Askr logo`
  );
  assert(
    assetReferences.some((path) => /-[A-Za-z0-9_-]+\.js$/.test(path)),
    `${routePath} does not reference a hashed JavaScript asset`
  );
  assert(
    assetReferences.some((path) => /-[A-Za-z0-9_-]+\.css$/.test(path)),
    `${routePath} does not reference a hashed CSS asset`
  );

  for (const asset of assetReferences) {
    assert(
      existsSync(resolve(dist, `.${asset}`)),
      `${routePath} references missing asset ${asset}`
    );
  }
}

const metadataPath = resolve(dist, 'metadata.json');
assert(existsSync(dist), 'dist/ is missing');
assert(existsSync(metadataPath), 'metadata.json is missing');

if (existsSync(metadataPath)) {
  const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
  assert(metadata.totalRoutes === 4, 'metadata must report four total routes');
  assert(
    metadata.successful === 4,
    'metadata must report four successful routes'
  );
  assert(metadata.failed === 0, 'metadata must report no failed routes');
  assert(metadata.routes?.length === 4, 'metadata must contain four routes');

  for (const routePath of Object.keys(expectedRoutes)) {
    const result = metadata.routes?.find((route) => route.path === routePath);
    assert(Boolean(result), `metadata is missing ${routePath}`);
    assert(result?.status === 'success', `${routePath} must be successful`);
  }
}

assert(
  existsSync(resolve(dist, 'assets/askr-logo.png')),
  'the Askr logo must be published'
);

for (const [routePath, expectation] of Object.entries(expectedRoutes)) {
  assertGeneratedDocument(routePath, expectation);
}

const browserJavaScript = filesIn(resolve(dist, 'assets'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
assert(
  browserJavaScript.includes('askr-docs-sidebar-collapsed'),
  'the browser bundle must include docs sidebar persistence'
);
assert(
  browserJavaScript.includes('askr-theme'),
  'the browser bundle must include theme persistence'
);

for (const legacyDirectory of ['framework', 'showcase', 'themes', 'ui']) {
  assert(
    !existsSync(resolve(dist, legacyDirectory)),
    `legacy route directory remains: ${legacyDirectory}`
  );
}

for (const file of filesIn(dist)) {
  assert(statSync(file).isFile(), `${file} is not a regular file`);
}

if (errors.length > 0) {
  console.error('Static output verification failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  'Static output verified: four pre-rendered routes with metadata and hashed assets.'
);
