import { createRouteRegistry, group, route } from '@askrjs/askr/router';
import { MarketingLayout } from './_layout';
import { marketingPages, type MarketingPath } from './catalog';
import { ApplicationModelPage } from './application-model';
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

export const marketingRouteMetadata: Readonly<Record<string, RouteMetadata>> = {
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

export function registerMarketingRoutes() {
  group({ layout: MarketingLayout }, () => {
    route('/', HomePage, { meta: marketingRouteMetadata['/'] });
    for (const page of marketingPages) {
      route(page.path, marketingRouteComponents[page.path], { meta: page });
    }
    route('/404', NotFoundPage, { meta: marketingRouteMetadata['/404'] });
    route('/*', NotFoundPage, { meta: marketingRouteMetadata['/404'] });
  });
}

export const marketingRouteRegistry = createRouteRegistry(() => {
  registerMarketingRoutes();
});
