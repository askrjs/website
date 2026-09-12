import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { serializeRouteMeta } from '@askrjs/askr/router';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import { withThemeStyles } from '@askrjs/themes/ssr';
import { routeMetadata, routeRegistry } from './src/pages/_routes';

export const registry = routeRegistry;
export const outputDir = 'dist';

let clientTemplate: string | undefined;
let headExtras: string | undefined;

/**
 * The hero <h1> is the LCP element on every marketing route and it renders in
 * Domine. The font is only discoverable after the render-blocking stylesheet
 * parses, so without a preload it is requested roughly a second late, swaps in
 * after first paint, and resizes the heading -- which registers a second,
 * larger LCP candidate. Preloading the latin subset (the only one English
 * content pulls) starts the request alongside the stylesheet instead.
 */
function buildHeadExtras(): string {
  const assetDir = resolve(process.cwd(), '.askr/client/assets');
  const font = readdirSync(assetDir).find(
    (name) =>
      name.startsWith('domine-latin-wght-normal-') && name.endsWith('.woff2')
  );
  if (!font) {
    throw new Error(
      `Could not find the Domine latin woff2 in ${assetDir} to preload.`
    );
  }
  return `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${font}" />`;
}

function renderDocument({ appHtml, context }: DocumentRenderArgs) {
  clientTemplate ??= readFileSync(
    resolve(process.cwd(), '.askr/client/index.html'),
    'utf8'
  );

  const metadata = routeMetadata[context.route.path];
  if (!metadata) {
    throw new Error(`Missing metadata for route: ${context.route.path}`);
  }
  headExtras ??= buildHeadExtras();

  const document = clientTemplate
    .replace(/<title(?:\s[^>]*)?>.*?<\/title>/, serializeRouteMeta(metadata))
    .replace('</head>', `${headExtras}</head>`);

  return document.replace(
    '<div id="app"></div>',
    `<div id="app">${appHtml}</div>`
  );
}

export const staticConfig = {
  registry,
  outputDir,
  document: withThemeStyles(renderDocument),
  assets: [
    { from: resolve(process.cwd(), 'public'), to: '.' },
    { from: resolve(process.cwd(), '.askr/llms'), to: '.' },
    { from: resolve(process.cwd(), '.askr/client/assets'), to: 'assets' },
  ],
  siteUrl: 'https://askrjs.com',
  sitemap: {
    // 404 is a fallback document, not a crawlable page.
    routes: { '/404': false },
  },
};
