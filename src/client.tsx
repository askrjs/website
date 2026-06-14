import { createSPA, hydrateSPA } from '@askrjs/askr/boot';

import { installWebsiteDocumentMetaSync } from './client/document-meta';
import { getSpaRoutes } from './pages/_routes';

installWebsiteDocumentMetaSync();

async function boot() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Missing #app root element.');
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
