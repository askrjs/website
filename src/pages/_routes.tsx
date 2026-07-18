import { createRouteRegistry, group, route } from '@askrjs/askr/router';
import { MarketingLayout } from './_layout';
import { marketingPages, type MarketingPath } from './_marketing-catalog';
import { ApplicationModelPage } from './application-model';
import { DocsLayout } from './docs/_layout';
import { CoreConceptsPage } from './docs/core-concepts';
import { GettingStartedPage } from './docs/getting-started';
import { DocsOverviewPage } from './docs/overview';
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
  '/docs': {
    title: 'Documentation | Askr',
    description:
      'Learn how Askr fits together and find the shortest path into the framework.',
  },
  '/docs/getting-started': {
    title: 'Getting started | Askr',
    description:
      'Install Askr, create your first application, and run it locally.',
  },
  '/docs/core-concepts': {
    title: 'Core concepts | Askr',
    description:
      'Understand Askr routes, reactive state, rendering modes, and hydration.',
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
    route('/docs', DocsOverviewPage, { meta: routeMetadata['/docs'] });
    route('/docs/getting-started', GettingStartedPage, {
      meta: routeMetadata['/docs/getting-started'],
    });
    route('/docs/core-concepts', CoreConceptsPage, {
      meta: routeMetadata['/docs/core-concepts'],
    });
  });
});
