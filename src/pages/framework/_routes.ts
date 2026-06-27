import type { WebsiteRoute } from '../../shared/site-routes';

import { FrameworkPage } from './framework-page';

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
