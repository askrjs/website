import { createRouteRegistry, group, lazy, route } from '@askrjs/askr/router';
import {
  marketingRouteMetadata,
  registerMarketingRoutes,
  type RouteMetadata,
} from './marketing/_routes';
import { DocsLayout } from './docs/_layout';
import { docsCatalog } from './docs/catalog';
import { MarketingLayout } from './marketing/_layout';

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

  const docsHome = docsCatalog.find((page) => page.route === '/docs');
  if (!docsHome) throw new Error('Missing /docs catalog entry');
  group({ layout: MarketingLayout }, () => {
    route('/docs', lazy(docsHome.loader), { meta: routeMetadata['/docs'] });
  });

  group({ layout: DocsLayout }, () => {
    for (const page of docsCatalog) {
      if (page.route === '/docs') continue;
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

    const docsHome = docsCatalog.find((page) => page.route === '/docs');
    if (!docsHome) throw new Error('Missing /docs catalog entry');
    group({ layout: MarketingLayout }, () => {
      let component = components.get(docsHome.loader);
      if (!component) {
        component = lazy(docsHome.loader);
        components.set(docsHome.loader, component);
      }
      route('/docs', component, { meta: routeMetadata['/docs'] });
    });

    group({ layout: DocsLayout }, () => {
      for (const page of docsCatalog) {
        if (page.route === '/docs') continue;
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
