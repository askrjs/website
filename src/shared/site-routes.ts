import type { Route, RouteHandler, RouteParams } from '@askrjs/askr/router';
import type { RouteConfig } from '@askrjs/askr/ssg';
import type { SSRRoute } from '@askrjs/askr/ssr';

export interface WebsiteDocumentMeta {
  title: string;
  description?: string;
}

export interface WebsiteRoute {
  path: string;
  render: RouteHandler;
  getDocumentMeta?: (props: RouteParams) => WebsiteDocumentMeta | undefined;
  params?: Record<string, string>;
  namespace?: string;
  invalidationKeys?: string[];
}

export type StaticRouteConfig = RouteConfig;
export type SpaRouteConfig = Route;
export type ServerRouteConfig = SSRRoute;
