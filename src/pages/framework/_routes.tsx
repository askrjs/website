import type { WebsiteRoute } from '../_types';

import { FrameworkPage } from './index';

function routeKey(path: string) {
  return `route:${path}`;
}

export const frameworkRoutes: WebsiteRoute[] = [
  {
    path: '/framework',
    render: FrameworkPage,
    invalidationKeys: [routeKey('/framework'), 'framework'],
    getDocumentMeta: () => ({
      title: 'Framework',
      description:
        'Fine-grained reactive framework with actor-backed updates, routing, SSR, and SSG.',
    }),
  },
];
