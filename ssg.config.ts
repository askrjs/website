import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { serializeRouteMeta } from '@askrjs/askr/router';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import { withThemeStyles } from '@askrjs/themes/ssr';
import { routeMetadata, routeRegistry } from './src/pages/_routes';
import { legacyRedirects } from './src/pages/marketing/redirects';

export const registry = routeRegistry;
export const outputDir = 'dist';

let clientTemplate: string | undefined;
function renderDocument({ appHtml, context }: DocumentRenderArgs) {
  clientTemplate ??= readFileSync(
    resolve(process.cwd(), '.askr/client/index.html'),
    'utf8'
  );

  const metadata = routeMetadata[context.route.path];
  if (!metadata) {
    throw new Error(`Missing metadata for route: ${context.route.path}`);
  }

  const redirect =
    legacyRedirects[context.route.path as keyof typeof legacyRedirects];
  // GitHub Pages serves static files: refresh + canonical provide a fallback
  // without claiming an HTTP 301/308 response from the host.
  const refresh = redirect
    ? `<script>window.location.replace(${JSON.stringify(redirect)} + window.location.search + window.location.hash);</script><noscript><meta http-equiv="refresh" content="0;url=${redirect}"></noscript>`
    : '';
  const document = clientTemplate
    .replace(/<title(?:\s[^>]*)?>.*?<\/title>/, serializeRouteMeta(metadata))
    .replace('</head>', `${refresh}</head>`);

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
    routes: {
      '/404': false,
      ...Object.fromEntries(
        Object.keys(legacyRedirects).map((path) => [path, false])
      ),
    },
  },
};
