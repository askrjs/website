import type { WebsiteRoute } from '../../shared/site-routes';

import { DocsIndexPage } from './docs-page';
import { DocsStartPage } from './docs-start-page';
import { docRegistry } from './registry';

function routeKey(path: string) {
  return `route:${path}`;
}

function docsSectionKey(section: string) {
  return `docs-section:${section.toLowerCase().replace(/\s+/g, '-')}`;
}

export const docsRoutes: WebsiteRoute[] = [
  {
    path: '/docs',
    render: DocsIndexPage,
    invalidationKeys: [routeKey('/docs'), 'docs', 'docs-index'],
    getDocumentMeta: () => ({
      title: 'Askr Docs',
      description: 'Guides and reference material for building with Askr.',
    }),
  },
  {
    path: '/docs/start',
    render: DocsStartPage,
    invalidationKeys: [routeKey('/docs/start'), 'docs', 'docs-start'],
    getDocumentMeta: () => ({
      title: 'Start building with Askr',
      description:
        'One-click onboarding route for the Askr docs and implementation path.',
    }),
  },
  ...docRegistry.map((entry) => ({
    path: `/docs/${entry.meta.slug}`,
    render: entry.component,
    invalidationKeys: [
      routeKey(`/docs/${entry.meta.slug}`),
      'docs',
      docsSectionKey(entry.meta.section),
      `doc:${entry.meta.slug}`,
    ],
    getDocumentMeta: () => ({
      title: entry.meta.title,
      description: entry.meta.summary,
    }),
  })),
];
