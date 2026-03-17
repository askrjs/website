import type { Route } from "@askrjs/askr/router";
import type { SSRRoute } from "@askrjs/askr/ssr";

export interface WebsiteDocumentMeta {
  title: string;
  description?: string;
}

export interface WebsiteRoute {
  path: string;
  render: (props: Record<string, unknown>) => unknown;
  getDocumentMeta?: (
    props: Record<string, unknown>,
  ) => WebsiteDocumentMeta | undefined;
  params?: Record<string, string>;
  namespace?: string;
  invalidationKeys?: string[];
}

export interface StaticRouteConfig {
  path: string;
  component: (props: Record<string, unknown>) => unknown;
  props?: Record<string, unknown>;
  namespace?: string;
  params?: Record<string, string>;
  invalidationKeys?: string[];
}

export type SpaRouteConfig = Route;
export type ServerRouteConfig = SSRRoute;
