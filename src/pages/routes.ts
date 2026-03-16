import type { RouteConfig } from "./route-types";

import { AskrPage } from "./askr";
import { DocsIndexPage } from "./docs";
import { HomePage } from "./home";
import { ThemesPage } from "./themes";
import { UiPage } from "./ui";
import { uiComponentRoutes } from "./ui/components/routes";
import { docRegistry } from "./shared/doc-registry";

const staticRoutes: RouteConfig[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/showcase/askr",
    component: AskrPage,
  },
  {
    path: "/showcase/ui",
    component: UiPage,
  },
  {
    path: "/showcase/themes",
    component: ThemesPage,
  },
  {
    path: "/docs",
    component: DocsIndexPage,
  },
];

const docsRoutes: RouteConfig[] = docRegistry.map((entry) => ({
  path: `/docs/${entry.meta.slug}`,
  component: entry.component,
}));

export const routes: RouteConfig[] = [
  ...staticRoutes,
  ...docsRoutes,
  ...uiComponentRoutes,
];
