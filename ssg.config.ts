import type { StaticRouteConfig } from './src/shared/site-routes';
import { getStaticRoutes } from './src/pages/_routes';

export const routes: StaticRouteConfig[] = getStaticRoutes();
export const outputDir = 'dist';

export const seed = 20260315;
export const concurrency = 4;
