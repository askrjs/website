import type { StaticRouteConfig } from "./src/pages/route-types";
import { getStaticRoutes } from "./src/pages/routes";

export const routes: StaticRouteConfig[] = getStaticRoutes();

export const seed = 20260315;
export const concurrency = 4;
