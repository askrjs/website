import { fallback, group, route } from '@askrjs/askr/router';
import { MarketingLayout } from './_layout';
import { marketingPages, type MarketingPath } from './catalog';
import { ApplicationModelPage } from './application-model';
import { ContributePage } from './contribute';
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
  links?: readonly {
    rel: string;
    href: string;
    [key: string]: string;
  }[];
};

export const marketingRouteMetadata: Readonly<Record<string, RouteMetadata>> = {
  '/': {
    title: 'Askr | Full-stack TypeScript with explicit routes',
    description:
      'Build TypeScript apps with one explicit route registry for browser, server, or static rendering.',
  },
  '/404': {
    title: 'Page not found | Askr',
    description:
      'We could not find this page. Return home or browse the Askr documentation.',
  },
  '/contribute': {
    title: 'Contribute to Askr | Askr',
    description:
      'Contribute to Askr themes, rendering, accessibility, documentation, and developer tooling.',
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
    route('/contribute', ContributePage, {
      meta: marketingRouteMetadata['/contribute'],
    });
    for (const page of marketingPages) {
      route(page.path, marketingRouteComponents[page.path], { meta: page });
    }
    route('/404', NotFoundPage, { meta: marketingRouteMetadata['/404'] });
    fallback(NotFoundPage);
  });
}
