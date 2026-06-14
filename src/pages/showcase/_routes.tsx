import type { WebsiteRoute } from '../_types';

import { AskrPage } from './askr';
import { ThemesPage } from './themes';
import { UiPage } from './ui';
import { uiComponentRoutes } from './ui/components/_routes';

function routeKey(path: string) {
  return `route:${path}`;
}

export const showcaseRoutes: WebsiteRoute[] = [
  {
    path: '/showcase/askr',
    render: AskrPage,
    invalidationKeys: [routeKey('/showcase/askr'), 'showcase', 'askr'],
    getDocumentMeta: () => ({
      title: 'Runtime Reference',
      description:
        'Reference material for Askr runtime behavior, routing, and rendering patterns.',
    }),
  },
  {
    path: '/showcase/ui',
    render: UiPage,
    invalidationKeys: [
      routeKey('/showcase/ui'),
      'showcase',
      'ui-components',
    ],
    getDocumentMeta: () => ({
      title: 'UI Components Reference',
      description:
        'Reference pages for Askr UI components and interaction patterns.',
    }),
  },
  {
    path: '/showcase/themes',
    render: ThemesPage,
    invalidationKeys: [routeKey('/showcase/themes'), 'showcase', 'themes'],
    getDocumentMeta: () => ({
      title: 'Theme Reference',
      description:
        'Reference material for tokens, color modes, and theme application.',
    }),
  },
  ...uiComponentRoutes,
];
