import type { RouteParams } from '@askrjs/askr/router';
import type {
  SpaRouteConfig,
  ServerRouteConfig,
  StaticRouteConfig,
  WebsiteDocumentMeta,
  WebsiteRoute,
} from './_types';

import { withWebsiteProviders } from '../components/app-providers';
import { docsRoutes } from './docs/_routes';
import { FrameworkPage } from './framework';
import { HomePage } from './home';
import { showcaseRoutes } from './showcase/_routes';
import { ThemesLandingPage } from './themes';
import { UiLandingPage } from './ui';

export function resolveDocumentMeta(
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

function matchRoutePath(routePath: string, path: string): RouteParams | null {
  const routeSegments = routePath.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);

  if (routeSegments.length !== pathSegments.length) {
    return null;
  }

  const params: RouteParams = {};

  for (let index = 0; index < routeSegments.length; index += 1) {
    const routeSegment = routeSegments[index];
    const pathSegment = pathSegments[index];

    if (routeSegment.startsWith('{') && routeSegment.endsWith('}')) {
      const paramName = routeSegment.slice(1, -1).trim();
      if (!paramName || paramName.startsWith('*')) return null;
      params[paramName] = pathSegment;
      continue;
    }

    if (routeSegment !== pathSegment) return null;
  }

  return params;
}

function routeKey(path: string) {
  return `route:${path}`;
}

const staticRoutes: WebsiteRoute[] = [
  {
    path: '/',
    render: HomePage,
    invalidationKeys: [routeKey('/'), 'home', 'site'],
    getDocumentMeta: () => ({
      title: 'Askr',
      description:
        'Fine-grained reactive framework, accessible UI primitives, theme tokens, and static site generation for Askr apps.',
    }),
  },
  {
    path: '/framework',
    render: FrameworkPage,
    invalidationKeys: [routeKey('/framework'), 'framework'],
    getDocumentMeta: () => ({
      title: 'Framework',
      description:
        'Fine-grained reactive framework with actor-backed updates, routing, SSR, and SSG.',
    }),
  },
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

export const websiteRoutes: WebsiteRoute[] = [
  ...staticRoutes,
  ...docsRoutes,
  ...showcaseRoutes,
];

export function getWebsiteDocumentMeta(path: string): WebsiteDocumentMeta {
  for (const route of websiteRoutes) {
    const params = matchRoutePath(route.path, path);
    if (params) return resolveDocumentMeta(route, params);
  }

  return {
    title: titleFromPath(path),
  };
}

export function getSpaRoutes(): SpaRouteConfig[] {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: withWebsiteProviders(route.render),
    namespace: route.namespace,
  }));
}

export function getSsrRoutes(): ServerRouteConfig[] {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: withWebsiteProviders(route.render),
    namespace: route.namespace,
  }));
}

export function getStaticRoutes(): StaticRouteConfig[] {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: withWebsiteProviders(route.render),
    namespace: route.namespace,
    params: route.params,
    invalidationKeys:
      route.invalidationKeys && route.invalidationKeys.length > 0
        ? route.invalidationKeys
        : [routeKey(route.path)],
  }));
}
