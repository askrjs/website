import { renderToString } from '@askrjs/askr/ssr';

import { getSsrRoutes, getWebsiteDocumentMeta } from '../pages/_routes';
import { renderDocument } from './document-template';

export function renderApp(url: string) {
  return renderToString({
    url,
    routes: getSsrRoutes(),
  });
}

export function renderPage(url: string, templateHtml: string) {
  return renderDocument({
    templateHtml,
    appHtml: renderApp(url),
    meta: getWebsiteDocumentMeta(url),
  });
}
