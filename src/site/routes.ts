import type { RouteConfig } from './types';

import { DocsIndexPage } from '../pages/docs-index-page';
import { HomePage } from '../pages/home-page';
import {
  AskrShowcasePage,
  ThemesShowcasePage,
  UiShowcasePage,
} from '../pages/showcase-page';
import { docRegistry } from './doc-registry';

const staticRoutes: RouteConfig[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/showcase/askr',
    component: AskrShowcasePage,
  },
  {
    path: '/showcase/ui',
    component: UiShowcasePage,
  },
  {
    path: '/showcase/themes',
    component: ThemesShowcasePage,
  },
  {
    path: '/docs',
    component: DocsIndexPage,
  },
];

const docsRoutes: RouteConfig[] = docRegistry.map((entry) => ({
  path: `/docs/${entry.meta.slug}`,
  component: entry.component,
}));

export const routes: RouteConfig[] = [...staticRoutes, ...docsRoutes];
