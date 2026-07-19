import { createRouteRegistry, group, lazy, route } from '@askrjs/askr/router';
import {
  marketingRouteMetadata,
  registerMarketingRoutes,
  type RouteMetadata,
} from './marketing/_routes';
import { DocsLayout } from './docs/_layout';
import { docsCatalog, normalizeDocsRoute } from './docs/catalog';
import type { DocsPageDefinition } from './docs/types';

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

let reloadPending = false;

function ReloadDocument() {
  if (typeof window !== 'undefined' && !reloadPending) {
    reloadPending = true;
    window.setTimeout(() => window.location.reload(), 0);
  }

  return null;
}

function createDocsRouteRegistry(
  componentForPage: (page: DocsPageDefinition) => ReturnType<typeof lazy>
) {
  return createRouteRegistry(() => {
    registerMarketingRoutes();

    group({ layout: DocsLayout }, () => {
      for (const page of docsCatalog) {
        route(page.route, componentForPage(page), {
          meta: routeMetadata[page.route],
        });
      }
    });
  });
}

export function createClientRouteRegistry(pathname: string) {
  const activePath = normalizeDocsRoute(pathname);
  const activePage = docsCatalog.find((page) => page.route === activePath);
  const activeLoader = activePage?.loader ?? docsCatalog[0].loader;
  const activeComponent = lazy(activeLoader);

  return createDocsRouteRegistry((page) =>
    page.loader === activeLoader ? activeComponent : ReloadDocument
  );
}

export function createStaticRouteRegistry() {
  const components = new Map<
    DocsPageDefinition['loader'],
    ReturnType<typeof lazy>
  >();

  return createDocsRouteRegistry((page) => {
    const existing = components.get(page.loader);
    if (existing) return existing;

    const component = lazy(page.loader);
    components.set(page.loader, component);
    return component;
  });
}
