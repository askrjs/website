import type { RouteConfig } from './types';

import { DocPageView } from '../pages/doc-page';
import { DocsIndexPage } from '../pages/docs-index-page';
import { HomePage } from '../pages/home-page';
import {
  AskrShowcasePage,
  ThemesShowcasePage,
  UiShowcasePage,
} from '../pages/showcase-page';
import { docsPages } from './content';

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

const docsRoutes: RouteConfig[] = docsPages.map((doc) => ({
  path: `/docs/${doc.slug}`,
  component: DocPageView,
  props: { doc },
}));

export const routes: RouteConfig[] = [...staticRoutes, ...docsRoutes];
