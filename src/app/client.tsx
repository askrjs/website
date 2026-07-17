import { createSPA, hydrateSPA } from '@askrjs/askr/boot';

import { installWebsiteDocumentMetaSync } from '../shared/document-meta-sync';
import { websiteRouteRegistry } from '../pages/_routes';

installWebsiteDocumentMetaSync();

async function boot() {
  const root = document.getElementById('app');

  if (!root) {
    throw new Error('Missing #app root element.');
  }

  const hasServerMarkup = root.childNodes.length > 0;

  if (hasServerMarkup) {
    await hydrateSPA({ root, registry: websiteRouteRegistry });
    return;
  }

  await createSPA({ root, registry: websiteRouteRegistry });
}

void boot();
