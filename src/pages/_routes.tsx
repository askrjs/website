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
import { frameworkRoutes } from './framework/_routes';
import { homeRoutes } from './home/_routes';
import { showcaseRoutes } from './showcase/_routes';
import { themesRoutes } from './themes/_routes';
import { uiRoutes } from './ui/_routes';

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

export const websiteRoutes: WebsiteRoute[] = [
  ...homeRoutes,
  ...frameworkRoutes,
  ...uiRoutes,
  ...themesRoutes,
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
