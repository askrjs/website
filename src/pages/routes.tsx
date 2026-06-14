import type { RouteHandler, RouteParams } from '@askrjs/askr/router';
import type {
  SpaRouteConfig,
  ServerRouteConfig,
  StaticRouteConfig,
  WebsiteDocumentMeta,
  WebsiteRoute,
} from './route-types';

import { DocumentShell } from '../components/site-shell';
import { AskrPage } from './askr';
import { DocsIndexPage } from './docs';
import { DocsStartPage } from './docs/start';
import { FrameworkPage } from './framework';
import { HomePage } from './home';
import { ThemesPage } from './themes';
import { ThemesLandingPage } from './themes-landing';
import { UiPage } from './ui';
import { UiLandingPage } from './ui-landing';
import { uiComponentRoutes } from './ui/components/routes';
import { docRegistry } from './shared/doc-registry';

function createDocumentRoute(route: WebsiteRoute): RouteHandler {
  return (props: RouteParams) => (
    <DocumentShell
      meta={resolveDocumentMeta(route, props)}
      appHtml={route.render(props)}
    />
  );
}

function resolveDocumentMeta(
  route: WebsiteRoute,
  props: RouteParams
): WebsiteDocumentMeta {
  return (
    route.getDocumentMeta?.(props) ?? {
      title: titleFromPath(route.path),
    }
  );
}

function titleFromPath(path: string) {
  if (path === '/') return 'Askr Documentation';

  return path
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (match) => match.toUpperCase())
    )
    .join(' ');
}

const staticRoutes: WebsiteRoute[] = [
  {
    path: '/',
    render: HomePage,
    getDocumentMeta: () => ({
      title: 'Askr',
      description:
        'Fine-grained reactive framework, accessible UI primitives, theme tokens, and static site generation for Askr apps.',
    }),
  },
  {
    path: '/showcase/askr',
    render: AskrPage,
    getDocumentMeta: () => ({
      title: 'Runtime Reference',
      description:
        'Reference material for Askr runtime behavior, routing, and rendering patterns.',
    }),
  },
  {
    path: '/showcase/ui',
    render: UiPage,
    getDocumentMeta: () => ({
      title: 'UI Components Reference',
      description:
        'Reference pages for Askr UI components and interaction patterns.',
    }),
  },
  {
    path: '/showcase/themes',
    render: ThemesPage,
    getDocumentMeta: () => ({
      title: 'Theme Reference',
      description:
        'Reference material for tokens, color modes, and theme application.',
    }),
  },
  {
    path: '/framework',
    render: FrameworkPage,
    getDocumentMeta: () => ({
      title: 'Framework',
      description:
        'Fine-grained reactive framework with actor-backed updates, routing, SSR, and SSG.',
    }),
  },
  {
    path: '/ui',
    render: UiLandingPage,
    getDocumentMeta: () => ({
      title: 'UI Components',
      description:
        '36+ headless, accessible UI components for askr. Styled by you.',
    }),
  },
  {
    path: '/themes',
    render: ThemesLandingPage,
    getDocumentMeta: () => ({
      title: 'Themes',
      description:
        'Token-driven CSS theming with light, dark, and custom theme support.',
    }),
  },
  {
    path: '/docs',
    render: DocsIndexPage,
    getDocumentMeta: () => ({
      title: 'Askr Docs',
      description: 'Guides and reference material for building with Askr.',
    }),
  },
  {
    path: '/docs/start',
    render: DocsStartPage,
    getDocumentMeta: () => ({
      title: 'Start building with Askr',
      description:
        'One-click onboarding route for the Askr docs and implementation path.',
    }),
  },
];

const docsRoutes: WebsiteRoute[] = docRegistry.map((entry) => ({
  path: `/docs/${entry.meta.slug}`,
  render: entry.component,
  getDocumentMeta: () => ({
    title: entry.meta.title,
    description: entry.meta.summary,
  }),
}));

export const websiteRoutes: WebsiteRoute[] = [
  ...staticRoutes,
  ...docsRoutes,
  ...uiComponentRoutes,
];

export function getSpaRoutes(): SpaRouteConfig[] {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: route.render,
    namespace: route.namespace,
  }));
}

export function getSsrRoutes(): ServerRouteConfig[] {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: createDocumentRoute(route),
    namespace: route.namespace,
  }));
}

export function getStaticRoutes(): StaticRouteConfig[] {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: createDocumentRoute(route),
    namespace: route.namespace,
    params: route.params,
    invalidationKeys: route.invalidationKeys,
  }));
}
