import {
  createRouteRegistry,
  route,
  type RouteParams,
} from '@askrjs/askr/router';
import type { WebsiteDocumentMeta, WebsiteRoute } from '../shared/site-routes';

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

export const websiteRoutes: WebsiteRoute[] = [
  ...homeRoutes,
  ...frameworkRoutes,
  ...uiRoutes,
  ...themesRoutes,
  ...docsRoutes,
  ...showcaseRoutes,
];

export const websiteRouteRegistry = createRouteRegistry(() => {
  for (const websiteRoute of websiteRoutes) {
    route(websiteRoute.path, websiteRoute.render, {
      namespace: websiteRoute.namespace,
    });
  }
});

export function getWebsiteDocumentMeta(path: string): WebsiteDocumentMeta {
  for (const route of websiteRoutes) {
    const params = matchRoutePath(route.path, path);
    if (params) return resolveDocumentMeta(route, params);
  }

  return {
    title: titleFromPath(path),
  };
}
