import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { getWebsiteDocumentMeta, websiteRoutes } from '../src/pages/_routes';
import { formatDocumentTitle } from '../src/shared/document-meta';

interface StaticMetadataRoute {
  path: string;
  filePath: string;
  status: string;
}

interface StaticMetadata {
  failed: number;
  routes: StaticMetadataRoute[];
}

const outputDir = resolve(process.cwd(), 'dist');
const appRootPattern = /\bid=["']app["']/g;
const emptyAppRootPattern = /<div([^>]*\bid=["']app["'][^>]*)>\s*<\/div>/i;
const legacyArtifacts = ['styles.css', 'theme-tokens.css', 'styles'];
const errors: string[] = [];

function readJsonFile<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf8')) as T;
}

function count(pattern: RegExp, value: string) {
  return Array.from(value.matchAll(pattern)).length;
}

function htmlDecode(value: string) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function getTitle(html: string) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '';
}

function getDescription(html: string) {
  const match = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']\s*\/?>/i
  );
  return match ? htmlDecode(match[1]) : '';
}

function getAppHtml(html: string) {
  return (
    html.match(
      /<div[^>]*\bid=["']app["'][^>]*>([\s\S]*)<\/div>\s*<\/body>/i
    )?.[1] ?? ''
  );
}

function assert(condition: boolean, message: string) {
  if (!condition) errors.push(message);
}

function verifyRoute(route: StaticMetadataRoute) {
  if (route.status === 'removed') return;

  const routePath = resolve(outputDir, route.filePath);
  assert(existsSync(routePath), `${route.path} is missing ${route.filePath}`);
  if (!existsSync(routePath)) return;

  const html = readFileSync(routePath, 'utf8');
  const meta = getWebsiteDocumentMeta(route.path);
  const expectedTitle = formatDocumentTitle(meta);
  const appHtml = getAppHtml(html);

  assert(
    count(/<html\b/gi, html) === 1,
    `${route.path} must contain one <html>`
  );
  assert(
    count(/<head\b/gi, html) === 1,
    `${route.path} must contain one <head>`
  );
  assert(
    count(/<body\b/gi, html) === 1,
    `${route.path} must contain one <body>`
  );
  assert(
    count(appRootPattern, html) === 1,
    `${route.path} must contain one #app root`
  );
  assert(
    !emptyAppRootPattern.test(html),
    `${route.path} must contain rendered app HTML`
  );
  assert(
    appHtml.trim().length > 1000,
    `${route.path} app HTML is unexpectedly small`
  );
  assert(
    !/^\s*<>\s*<\/>\s*$/.test(appHtml),
    `${route.path} rendered an empty fragment in #app`
  );
  assert(appHtml.includes('<header'), `${route.path} is missing site header`);
  assert(appHtml.includes('<main'), `${route.path} is missing page main`);
  assert(appHtml.includes('<footer'), `${route.path} is missing site footer`);
  assert(count(/<h1\b/gi, appHtml) === 1, `${route.path} must contain one h1`);
  assert(
    getTitle(html) === expectedTitle,
    `${route.path} title mismatch: expected "${expectedTitle}"`
  );
  assert(
    getDescription(html) === (meta.description ?? ''),
    `${route.path} description mismatch`
  );
  assert(
    html.includes('/theme-init.js'),
    `${route.path} is missing theme init`
  );
  assert(
    /\/assets\/style-[^"']+\.css/.test(html),
    `${route.path} is missing the built CSS asset`
  );
  assert(
    /src=["']\/app\.js["']/.test(html),
    `${route.path} is missing the client app script`
  );
  assert(
    !html.includes('/src/styles.css'),
    `${route.path} still references source CSS`
  );
}

function verifyStaticRoutesHaveKeys() {
  for (const route of websiteRoutes) {
    assert(
      Boolean(route.invalidationKeys?.length),
      `${route.path} is missing invalidationKeys`
    );
  }
}

function verifyLegacyArtifacts() {
  for (const artifact of legacyArtifacts) {
    const artifactPath = resolve(outputDir, artifact);
    assert(!existsSync(artifactPath), `legacy artifact remains: ${artifact}`);
  }
}

function run() {
  const metadataPath = resolve(outputDir, 'metadata.json');
  assert(existsSync(outputDir), 'dist/ is missing');
  if (existsSync(outputDir)) {
    assert(statSync(outputDir).isDirectory(), 'dist/ is not a directory');
  }
  assert(existsSync(metadataPath), 'dist/metadata.json is missing');
  if (!existsSync(metadataPath)) return;

  const metadata = readJsonFile<StaticMetadata>(metadataPath);
  const metadataRoutes = new Map(
    metadata.routes.map((route) => [route.path, route])
  );

  assert(metadata.failed === 0, 'static generation reported failed routes');

  for (const route of websiteRoutes) {
    const metadataRoute = metadataRoutes.get(route.path);
    assert(Boolean(metadataRoute), `${route.path} is missing from metadata`);
    if (metadataRoute) verifyRoute(metadataRoute);
  }

  verifyStaticRoutesHaveKeys();
  verifyLegacyArtifacts();

  if (errors.length > 0) {
    console.error('Static output verification failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Static output verified: ${websiteRoutes.length} routes.`);
}

run();
