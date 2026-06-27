import type { WebsiteRoute } from '../../shared/site-routes';

import { ThemesLandingPage } from './themes-page';

function routeKey(path: string) {
  return `route:${path}`;
}

export const themesRoutes: WebsiteRoute[] = [
  {
    path: '/themes',
    render: ThemesLandingPage,
    invalidationKeys: [routeKey('/themes'), 'themes', 'product'],
    getDocumentMeta: () => ({
      title: 'Themes',
      description:
        'Token-driven CSS theming with light, dark, and custom theme support.',
    }),
  },
];
