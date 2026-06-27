import type { WebsiteRoute } from '../../shared/site-routes';

import { UiLandingPage } from './ui-page';

function routeKey(path: string) {
  return `route:${path}`;
}

export const uiRoutes: WebsiteRoute[] = [
  {
    path: '/ui',
    render: UiLandingPage,
    invalidationKeys: [routeKey('/ui'), 'ui-components', 'product'],
    getDocumentMeta: () => ({
      title: 'UI Components',
      description:
        '36+ headless, accessible UI components for askr. Styled by you.',
    }),
  },
];
