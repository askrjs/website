import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DocumentRenderArgs } from '@askrjs/askr/ssg';
import type { StaticRouteConfig } from './src/shared/site-routes';
import {
  getStaticRoutes,
  getWebsiteDocumentMeta,
} from './src/pages/_routes';
import { renderDocument } from './src/app/server/document-template';

export const routes: StaticRouteConfig[] = getStaticRoutes();
export const outputDir = 'dist';

export const seed = 20260315;
export const concurrency = 4;

let clientTemplate: string | undefined;

function renderStaticDocument({ appHtml, context }: DocumentRenderArgs) {
  clientTemplate ??= readFileSync(
    resolve(process.cwd(), '.askr/client/index.html'),
    'utf8'
  );

  return renderDocument({
    templateHtml: clientTemplate,
    appHtml,
    meta: getWebsiteDocumentMeta(context.pathname),
  });
}

export const staticConfig = {
  routes,
  outputDir,
  seed,
  concurrency,
  document: renderStaticDocument,
  assets: [
    { from: resolve(process.cwd(), '.askr/client/assets'), to: 'assets' },
    { from: resolve(process.cwd(), '.askr/client/app.js'), to: 'app.js' },
    { from: resolve(process.cwd(), '.askr/client/chunks'), to: 'chunks' },
    {
      from: resolve(process.cwd(), '.askr/client/theme-init.js'),
      to: 'theme-init.js',
    },
  ],
};
