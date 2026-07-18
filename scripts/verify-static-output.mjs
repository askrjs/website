import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const errors = [];

const expectedRoutes = {
  '/': {
    file: 'index.html',
    layout: 'marketing',
    title: 'A cat named Askr, or how we learned to build full-stack apps',
    description:
      'Build typed applications across browser and server rendering with Askr.',
    content: 'Build full-stack TypeScript that stays explicit.',
    requiredContent: [
      'npx @askrjs/cli@latest create startkit my-app',
      'The framework composes. Your application stays visible.',
      'createRouteRegistry',
      'Rendering is a delivery choice',
      'Explore the platform',
    ],
  },
  '/platform': {
    file: 'platform/index.html',
    layout: 'marketing',
    title: 'Platform | Askr',
    description:
      'See how Askr composes runtime, routes, UI, server capabilities, rendering, and production output without hiding application ownership.',
    content: 'A clear path from component to production.',
    requiredContent: ['Build', 'Compose', 'Deliver', 'Operate'],
  },
  '/application-model': {
    file: 'application-model/index.html',
    layout: 'marketing',
    title: 'Application model | Askr',
    description:
      'Explore Askr’s explicit model for state, typed routes, lifecycle-aware resources, queries, cancellation, and invalidation.',
    content: 'Explicit state. Explicit routes. Explicit ownership.',
  },
  '/rendering': {
    file: 'rendering/index.html',
    layout: 'marketing',
    title: 'Rendering | Askr',
    description:
      'Choose SPA, server rendering with hydration, or static generation without changing how an Askr application is written.',
    content: 'Choose where the HTML is produced',
  },
  '/full-stack': {
    file: 'full-stack/index.html',
    layout: 'marketing',
    title: 'Full stack | Askr',
    description:
      'Compose pages, native-first actions, validated APIs, OpenAPI contracts, auth policies, and explicit dependencies with Askr.',
    content: 'Pages, APIs, and actions meet at one explicit composition root.',
  },
  '/themes': {
    file: 'themes/index.html',
    layout: 'marketing',
    title: 'Themes | Askr',
    description:
      'See how Askr headless components connect to replaceable themes, design tokens, icons, logos, charts, and editor integrations.',
    content: 'Headless components. Theme-owned appearance.',
    requiredContent: [
      'Headless components',
      'Themes',
      '@askrjs/ui',
      '@askrjs/themes',
    ],
  },
  '/tooling': {
    file: 'tooling/index.html',
    layout: 'marketing',
    title: 'Tooling | Askr',
    description:
      'Use readable Askr starters, Vite Plus, generators, static output, OpenAPI drift checks, guarded updates, and project-local agent skills.',
    content: 'Scaffolds you can read. Commands you can verify.',
  },
  '/production': {
    file: 'production/index.html',
    layout: 'marketing',
    title: 'Production | Askr',
    description:
      'Ship static or Node output with explicit document, middleware, probe, auth, localization, redaction, and telemetry boundaries.',
    content: 'Ordinary artifacts. Explicit operational boundaries.',
  },
  '/404': {
    file: '404/index.html',
    layout: 'marketing',
    title: 'Page not found | Askr',
    description: 'The requested Askr page does not exist.',
    content: 'This route does not exist.',
    requiredContent: ['Return home', 'Read the documentation'],
  },
  '/docs': {
    file: 'docs/index.html',
    layout: 'docs',
    title: 'Documentation | Askr',
    description:
      'Learn how Askr fits together and find the shortest path into the framework.',
    content: 'Build with Askr',
  },
  '/docs/getting-started': {
    file: 'docs/getting-started/index.html',
    layout: 'docs',
    title: 'Getting started | Askr',
    description:
      'Install Askr, create your first application, and run it locally.',
    content: 'Your first Askr app',
    requiredContent: [
      'npx @askrjs/cli@latest create ssg my-askr-app',
      "route('/hello', HelloPage);",
      'toHaveLength(5);',
    ],
  },
  '/docs/core-concepts': {
    file: 'docs/core-concepts/index.html',
    layout: 'docs',
    title: 'Core concepts | Askr',
    description:
      'Understand Askr routes, reactive state, rendering modes, and hydration.',
    content: 'Runtime and rendering',
    requiredContent: [
      "import { state } from '@askrjs/askr';",
      'const [count, setCount] = state(0);',
      'hydrateSPA',
    ],
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
  for (const content of expectation.requiredContent ?? []) {
    assert(
      html.includes(content),
      `${routePath} is missing verified content: ${content}`
    );
  }
  assert(
    !html.includes('npm create askr@latest'),
    `${routePath} contains the invalid create-askr command`
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
  if (expectation.layout === 'marketing') {
    const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
    const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';
    const footerLinks = [
      '/',
      '/platform',
      '/application-model',
      '/rendering',
      '/full-stack',
      '/themes',
      '/tooling',
      '/production',
      '/docs',
      '/docs/getting-started',
      '/docs/core-concepts',
      'https://github.com/askrjs',
      'https://github.com/askrjs/askr',
      'https://github.com/askrjs/askr-server',
      'https://github.com/askrjs/askr-ui',
      'https://github.com/askrjs/askr-themes',
      'https://github.com/askrjs/askr-cli',
    ];

    assert(header.length > 0, `${routePath} is missing its header`);
    assert(
      header.includes('aria-label="Documentation"') &&
        header.includes('aria-label="Askr on GitHub"') &&
        !header.includes('>Docs<') &&
        !header.includes('>GitHub<'),
      `${routePath} header must use accessible icon-only navigation controls`
    );
    assert(footer.length > 0, `${routePath} is missing its footer`);
    assert(
      !footer.includes('/assets/askr-logo.png'),
      `${routePath} footer must not repeat the Askr logo`
    );
    assert(
      footer.includes('marketing-footer__explore-icon') &&
        footer.includes('Explore') &&
        !footer.includes('>Marketing</'),
      `${routePath} footer must use its icon-backed Explore heading`
    );
    assert(
      footer.includes('marketing-footer__title-link') &&
        !footer.includes('askrjs organization'),
      `${routePath} footer must link its GitHub heading to the organization`
    );
    assert(
      footer.includes('marketing-footer__documentation-icon'),
      `${routePath} footer must link its icon-backed Documentation heading to /docs`
    );
    assert(
      footer.includes('© 2026 Askr contributors.'),
      `${routePath} footer is missing its copyright statement`
    );
    for (const href of footerLinks) {
      assert(
        footer.includes(`href="${href}"`),
        `${routePath} footer is missing ${href}`
      );
    }
    if (routePath !== '/' && routePath !== '/404') {
      assert(
        html.includes('class="page-navigation"'),
        `${routePath} is missing previous/next navigation`
      );
    }
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
    html.includes('/assets/github-mark-black.svg') &&
      html.includes('/assets/github-mark-white.svg'),
    `${routePath} does not reference both theme-safe GitHub marks`
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
  const expectedRoutePaths = Object.keys(expectedRoutes);
  const expectedRouteCount = expectedRoutePaths.length;
  const actualRoutePaths = (metadata.routes ?? []).map((route) => route.path);
  assert(
    metadata.totalRoutes === expectedRouteCount,
    `metadata must report ${expectedRouteCount} total routes`
  );
  assert(
    metadata.successful === expectedRouteCount,
    `metadata must report ${expectedRouteCount} successful routes`
  );
  assert(metadata.failed === 0, 'metadata must report no failed routes');
  assert(
    metadata.routes?.length === expectedRouteCount,
    `metadata must contain ${expectedRouteCount} routes`
  );
  assert(
    [...actualRoutePaths].sort().join('\n') ===
      [...expectedRoutePaths].sort().join('\n'),
    'metadata route set must exactly match the expected route set'
  );

  for (const routePath of expectedRoutePaths) {
    const result = metadata.routes?.find((route) => route.path === routePath);
    assert(Boolean(result), `metadata is missing ${routePath}`);
    assert(result?.status === 'success', `${routePath} must be successful`);
  }
}

assert(
  existsSync(resolve(dist, 'assets/askr-logo.png')),
  'the Askr logo must be published'
);
assert(
  existsSync(resolve(dist, 'assets/github-mark-black.svg')),
  'the black GitHub mark must be published'
);
assert(
  existsSync(resolve(dist, 'assets/github-mark-white.svg')),
  'the white GitHub mark must be published'
);

const robotsPath = resolve(dist, 'robots.txt');
assert(existsSync(robotsPath), 'robots.txt must be published');
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8');
  assert(
    robots.includes('User-agent: *'),
    'robots.txt must address all crawlers'
  );
  assert(
    robots.includes('Allow: /'),
    'robots.txt must allow the site to be crawled'
  );
  assert(
    robots.includes('Sitemap: https://askrjs.com/sitemap.xml'),
    'robots.txt must advertise the canonical sitemap URL'
  );
}

const sitemapPath = resolve(dist, 'sitemap.xml');
assert(existsSync(sitemapPath), 'sitemap.xml must be generated');
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  const sitemapLocations = Array.from(
    sitemap.matchAll(/<loc>(.*?)<\/loc>/g),
    (match) => match[1]
  );
  const expectedLocations = Object.keys(expectedRoutes)
    .filter((routePath) => routePath !== '/404')
    .map((routePath) => new URL(routePath, 'https://askrjs.com').href)
    .sort();

  assert(
    sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
    'sitemap.xml must include its XML declaration'
  );
  assert(
    sitemap.includes(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ),
    'sitemap.xml must use the sitemap protocol namespace'
  );
  assert(
    [...sitemapLocations].sort().join('\n') === expectedLocations.join('\n'),
    'sitemap.xml must contain every indexable route exactly once'
  );
}

for (const [routePath, expectation] of Object.entries(expectedRoutes)) {
  assertGeneratedDocument(routePath, expectation);
}

const githubPagesFallback = resolve(dist, '404.html');
const routedNotFound = resolve(dist, expectedRoutes['/404'].file);
assert(
  existsSync(githubPagesFallback),
  'GitHub Pages fallback document 404.html is missing'
);
if (existsSync(githubPagesFallback) && existsSync(routedNotFound)) {
  assert(
    readFileSync(githubPagesFallback, 'utf8') ===
      readFileSync(routedNotFound, 'utf8'),
    'GitHub Pages 404.html must match the routed /404 document'
  );
}

const prerenderedPages = Object.entries(expectedRoutes).map(
  ([routePath, expectation]) => {
    const html = readFileSync(resolve(dist, expectation.file), 'utf8');
    const pageContent =
      html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ??
      html.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1] ??
      '';
    return { routePath, pageContent };
  }
);
for (const page of prerenderedPages) {
  assert(
    prerenderedPages.every(
      (candidate) =>
        candidate.routePath === page.routePath ||
        candidate.pageContent !== page.pageContent
    ),
    `${page.routePath} must have unique pre-rendered content`
  );
}

const homeHtml = readFileSync(resolve(dist, expectedRoutes['/'].file), 'utf8');
for (const routePath of [
  '/platform',
  '/application-model',
  '/rendering',
  '/full-stack',
  '/themes',
  '/tooling',
  '/production',
]) {
  assert(
    homeHtml.includes(`href="${routePath}"`),
    `homepage discovery is missing ${routePath}`
  );
}

const platformHtml = readFileSync(
  resolve(dist, expectedRoutes['/platform'].file),
  'utf8'
);
const journeyPositions = ['Build', 'Compose', 'Deliver', 'Operate'].map(
  (label) => platformHtml.indexOf(`>${label}<`)
);
assert(
  platformHtml.includes('<ol class="platform-journey"') &&
    journeyPositions.every((position) => position >= 0) &&
    journeyPositions.every(
      (position, index) => index === 0 || position > journeyPositions[index - 1]
    ),
  '/platform must contain the semantic Build → Compose → Deliver → Operate journey'
);

const browserJavaScript = filesIn(resolve(dist, 'assets'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
assert(
  browserJavaScript.includes('askr-docs-sidebar-collapsed'),
  'the browser bundle must include docs sidebar persistence'
);
assert(
  browserJavaScript.includes('This route does not exist.'),
  'the browser bundle must include the client-side not-found route'
);
assert(
  browserJavaScript.includes('askr-theme'),
  'the browser bundle must include theme persistence'
);

const browserCss = filesIn(resolve(dist, 'assets'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
assert(
  browserCss.includes('[data-theme=dark]'),
  'the stylesheet must include the Askr dark theme selector'
);
assert(
  browserCss.includes('--ak-dark-color-bg'),
  'the stylesheet must include Askr dark theme color tokens'
);
assert(
  browserCss.includes('Domine Variable'),
  'the stylesheet must include the Domine marketing font'
);
assert(
  filesIn(resolve(dist, 'assets')).some((file) => file.endsWith('.woff2')),
  'the Domine font must be bundled with the static assets'
);

for (const legacyDirectory of ['framework', 'showcase', 'ui']) {
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
  `Static output verified: ${Object.keys(expectedRoutes).length} pre-rendered routes with metadata and hashed assets.`
);
