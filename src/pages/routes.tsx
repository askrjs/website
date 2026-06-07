import type {
  SpaRouteConfig,
  ServerRouteConfig,
  StaticRouteConfig,
  WebsiteDocumentMeta,
  WebsiteRoute,
} from "./route-types";

import { DocumentShell } from "../components/site-shell";
import { AskrPage } from "./askr";
import { DocsIndexPage } from "./docs";
import { FrameworkPage } from "./framework";
import { HomePage } from "./home";
import { ThemesPage } from "./themes";
import { ThemesLandingPage } from "./themes-landing";
import { UiPage } from "./ui";
import { UiLandingPage } from "./ui-landing";
import { uiComponentRoutes } from "./ui/components/routes";
import { docRegistry } from "./shared/doc-registry";

function createDocumentRoute(route: WebsiteRoute) {
  return (props: Record<string, unknown>) => (
    <DocumentShell meta={resolveDocumentMeta(route, props)} appHtml={route.render(props)} />
  );
}

function resolveDocumentMeta(
  route: WebsiteRoute,
  props: Record<string, unknown>,
): WebsiteDocumentMeta {
  return (
    route.getDocumentMeta?.(props) ?? {
      title: titleFromPath(route.path),
    }
  );
}

function titleFromPath(path: string) {
  if (path === "/") return "Askr Documentation";

  return path
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase()))
    .join(" ");
}

const staticRoutes: WebsiteRoute[] = [
  {
    path: "/",
    render: HomePage,
    getDocumentMeta: () => ({
      title: "Askr Documentation",
      description: "Onboarding guides and reference material for installing and using Askr.",
    }),
  },
  {
    path: "/showcase/askr",
    render: AskrPage,
    getDocumentMeta: () => ({
      title: "Runtime Reference",
      description: "Reference material for Askr runtime behavior, routing, and rendering patterns.",
    }),
  },
  {
    path: "/showcase/ui",
    render: UiPage,
    getDocumentMeta: () => ({
      title: "UI Components Reference",
      description: "Reference pages for Askr UI components and interaction patterns.",
    }),
  },
  {
    path: "/showcase/themes",
    render: ThemesPage,
    getDocumentMeta: () => ({
      title: "Theme Reference",
      description: "Reference material for tokens, color modes, and theme application.",
    }),
  },
  {
    path: "/framework",
    render: FrameworkPage,
    getDocumentMeta: () => ({
      title: "Framework",
      description: "Fine-grained reactive framework with zero virtual DOM. Powered by actors.",
    }),
  },
  {
    path: "/ui",
    render: UiLandingPage,
    getDocumentMeta: () => ({
      title: "UI Components",
      description: "36+ headless, accessible UI components for askr. Styled by you.",
    }),
  },
  {
    path: "/themes",
    render: ThemesLandingPage,
    getDocumentMeta: () => ({
      title: "Themes",
      description: "Token-driven CSS theming with light, dark, and custom theme support.",
    }),
  },
  {
    path: "/docs",
    render: DocsIndexPage,
    getDocumentMeta: () => ({
      title: "Askr Docs",
      description: "Guides and reference material for building with Askr.",
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

export const websiteRoutes: WebsiteRoute[] = [...staticRoutes, ...docsRoutes, ...uiComponentRoutes];

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
    component: createDocumentRoute(route),
    namespace: route.namespace,
    params: route.params,
    invalidationKeys: route.invalidationKeys,
  }));
}
