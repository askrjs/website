import type { WebsiteRoute } from '../_types';

import { UiLandingPage } from './index';

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
