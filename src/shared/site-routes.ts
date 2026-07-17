import type { RouteHandler, RouteParams } from '@askrjs/askr/router';

export interface WebsiteDocumentMeta {
  title: string;
  description?: string;
}

export interface WebsiteRoute {
  path: string;
  render: RouteHandler;
  getDocumentMeta?: (props: RouteParams) => WebsiteDocumentMeta | undefined;
  namespace?: string;
  invalidationKeys?: string[];
}
