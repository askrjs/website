import type { WebsiteDocumentMeta } from '../../shared/site-routes';
import { formatDocumentTitle } from '../../shared/document-meta';

const appRootPattern = /<div([^>]*\bid=["']app["'][^>]*)>\s*<\/div>/i;
const descriptionPattern =
  /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i;
const headClosePattern = /<\/head>/i;
const titlePattern = /<title>[\s\S]*?<\/title>/i;

export interface RenderDocumentOptions {
  templateHtml: string;
  appHtml: string;
  meta: WebsiteDocumentMeta;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

export function renderDocument(options: RenderDocumentOptions) {
  const title = `<title>${escapeHtml(formatDocumentTitle(options.meta))}</title>`;
  const description = options.meta.description
    ? `<meta name="description" content="${escapeAttribute(
        options.meta.description
      )}" />`
    : '';

  let html = options.templateHtml;

  if (!appRootPattern.test(html)) {
    throw new Error('Document template must contain an empty #app root.');
  }

  html = html.replace(appRootPattern, `<div$1>${options.appHtml}</div>`);

  html = titlePattern.test(html)
    ? html.replace(titlePattern, title)
    : html.replace(headClosePattern, `${title}</head>`);

  if (descriptionPattern.test(html)) {
    html = html.replace(descriptionPattern, description);
  } else if (description) {
    html = html.replace(headClosePattern, `${description}</head>`);
  }

  return html;
}
