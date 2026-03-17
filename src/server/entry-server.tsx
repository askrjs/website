import { renderToString } from "@askrjs/askr/ssr";

import { getSsrRoutes } from "../pages/routes";

export function renderPage(url: string) {
  return renderToString({
    url,
    routes: getSsrRoutes(),
  });
}
