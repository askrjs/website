import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { serializeRouteMeta } from '@askrjs/askr/router';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import { routeMetadata, routeRegistry } from './src/pages/_routes';

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
  const document = clientTemplate.replace(
    /<title(?:\s[^>]*)?>.*?<\/title>/,
    serializeRouteMeta(metadata)
  );

  return document.replace(
    '<div id="app"></div>',
    `<div id="app">${appHtml}</div>`
  );
}

export const staticConfig = {
  registry,
  outputDir,
  document: renderDocument,
  assets: [
    { from: resolve(process.cwd(), 'public'), to: '.' },
    { from: resolve(process.cwd(), '.askr/client/assets'), to: 'assets' },
  ],
};
