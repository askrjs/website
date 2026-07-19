import { createRouteRegistry, group, lazy, route } from '@askrjs/askr/router';
import {
  marketingRouteMetadata,
  registerMarketingRoutes,
  type RouteMetadata,
} from './marketing/_routes';
import { DocsLayout } from './docs/_layout';
import { docsCatalog } from './docs/catalog';

export type { RouteMetadata } from './marketing/_routes';

export const routeMetadata: Readonly<Record<string, RouteMetadata>> = {
  ...marketingRouteMetadata,
  ...Object.fromEntries(
    docsCatalog.map((page) => [
      page.route,
      { title: `${page.title} | Askr`, description: page.description },
    ])
  ),
};

export const routeRegistry = createRouteRegistry(() => {
  registerMarketingRoutes();

  group({ layout: DocsLayout }, () => {
    for (const page of docsCatalog) {
      route(page.route, lazy(page.loader), { meta: routeMetadata[page.route] });
    }
  });
});
