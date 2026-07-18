import { createRouteRegistry, group, lazy, route } from '@askrjs/askr/router';
import { MarketingLayout } from './_layout';
import { marketingPages, type MarketingPath } from './_marketing-catalog';
import { ApplicationModelPage } from './application-model';
import { DocsLayout } from './docs/_layout';
import { docsCatalog } from './docs/catalog';
import { FullStackPage } from './full-stack';
import { HomePage } from './home';
import { NotFoundPage } from './not-found';
import { PlatformPage } from './platform';
import { ProductionPage } from './production';
import { RenderingPage } from './rendering';
import { ThemesPage } from './themes';
import { ToolingPage } from './tooling';

export type RouteMetadata = {
  title: string;
  description: string;
};

export const routeMetadata: Readonly<Record<string, RouteMetadata>> = {
  '/': {
    title: 'A cat named Askr, or how we learned to build full-stack apps',
    description:
      'Build typed applications across browser and server rendering with Askr.',
  },
  '/404': {
    title: 'Page not found | Askr',
    description: 'The requested Askr page does not exist.',
  },
  ...Object.fromEntries(
    marketingPages.map(({ path, title, description }) => [
      path,
      { title, description },
    ])
  ),
  ...Object.fromEntries(
    docsCatalog.map((page) => [
      page.route,
      { title: `${page.title} | Askr`, description: page.description },
    ])
  ),
};

const marketingRouteComponents: Record<MarketingPath, typeof PlatformPage> = {
  '/platform': PlatformPage,
  '/application-model': ApplicationModelPage,
  '/rendering': RenderingPage,
  '/full-stack': FullStackPage,
  '/themes': ThemesPage,
  '/tooling': ToolingPage,
  '/production': ProductionPage,
};

export const routeRegistry = createRouteRegistry(() => {
  group({ layout: MarketingLayout }, () => {
    route('/', HomePage, { meta: routeMetadata['/'] });
    for (const page of marketingPages) {
      route(page.path, marketingRouteComponents[page.path], { meta: page });
    }
    route('/404', NotFoundPage, { meta: routeMetadata['/404'] });
    route('/*', NotFoundPage, { meta: routeMetadata['/404'] });
  });

  group({ layout: DocsLayout }, () => {
    for (const page of docsCatalog) {
      route(page.route, lazy(page.loader), { meta: routeMetadata[page.route] });
    }
  });
});
