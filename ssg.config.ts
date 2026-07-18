import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import { routeMetadata, routeRegistry } from './src/pages/_routes';

export const registry = routeRegistry;
export const outputDir = 'dist';

let clientTemplate: string | undefined;

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character] ?? character
  );
}

function renderDocument({ appHtml, context }: DocumentRenderArgs) {
  clientTemplate ??= readFileSync(
    resolve(process.cwd(), '.askr/client/index.html'),
    'utf8'
  );

  const metadata = routeMetadata[context.pathname] ?? routeMetadata['/'];
  const document = clientTemplate
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHtml(metadata.title)}</title>`
    )
    .replace(
      '</head>',
      `    <meta name="description" content="${escapeHtml(metadata.description)}" />\n  </head>`
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
    { from: resolve(process.cwd(), '.askr/client/assets'), to: 'assets' },
  ],
};
