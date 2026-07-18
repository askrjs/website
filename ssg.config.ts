import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import { routeRegistry } from './src/pages/_routes';

export const registry = routeRegistry;
export const outputDir = 'dist';

let clientTemplate: string | undefined;

function renderDocument({ appHtml }: DocumentRenderArgs) {
  clientTemplate ??= readFileSync(
    resolve(process.cwd(), '.askr/client/index.html'),
    'utf8'
  );

  return clientTemplate.replace(
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
