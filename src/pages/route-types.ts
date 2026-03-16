export interface RouteConfig {
  path: string;
  handler?: (props: Record<string, unknown>) => unknown;
  component?: (props: Record<string, unknown>) => unknown;
  props?: Record<string, unknown>;
  namespace?: string;
  params?: Record<string, string>;
  invalidationKeys?: string[];
}
