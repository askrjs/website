import type { WebsiteRoute } from '../../shared/site-routes';

import { HomePage } from './home-page';

function routeKey(path: string) {
  return `route:${path}`;
}

export const homeRoutes: WebsiteRoute[] = [
  {
    path: '/',
    render: HomePage,
    invalidationKeys: [routeKey('/'), 'home', 'site'],
    getDocumentMeta: () => ({
      title: 'Askr',
      description:
        'Fine-grained reactive framework, accessible UI primitives, theme tokens, and static site generation for Askr apps.',
    }),
  },
];
