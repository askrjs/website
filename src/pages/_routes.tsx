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
      route(page.route, lazy(page.loader), {
        meta: routeMetadata[page.route],
      });
    }
  });
});

// The current CLI renders registry handlers directly, so static generation
// explicitly settles the lazy route families before handing it the registry.
export async function createStaticRouteRegistry() {
  const components = new Map<
    (typeof docsCatalog)[number]['loader'],
    ReturnType<typeof lazy>
  >();
  const registry = createRouteRegistry(() => {
    registerMarketingRoutes();

    group({ layout: DocsLayout }, () => {
      for (const page of docsCatalog) {
        let component = components.get(page.loader);
        if (!component) {
          component = lazy(page.loader);
          components.set(page.loader, component);
        }
        route(page.route, component, { meta: routeMetadata[page.route] });
      }
    });
  });

  await Promise.all(
    [...components.values()].map((component) => component.preload())
  );
  return registry;
}
