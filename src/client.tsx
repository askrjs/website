import { createSPA, hydrateSPA } from "@askrjs/askr";

import { getSpaRoutes } from "./pages/routes";

if (import.meta.env.DEV) {
  await Promise.all([import("./styles.css"), import("@askrjs/askr-themes/default/tokens.css")]);
}

async function boot() {
  const root = document.getElementById("app");

  if (!root) {
    throw new Error("Missing #app root element.");
  }

  const routes = getSpaRoutes();
  const hasServerMarkup = root.childNodes.length > 0;

  if (hasServerMarkup) {
    await hydrateSPA({ root, routes });
    return;
  }

  await createSPA({ root, routes });
}

void boot();
