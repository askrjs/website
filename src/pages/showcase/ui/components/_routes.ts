import type { WebsiteRoute } from '../../../../shared/site-routes';
import { UiComponentDetailPage } from '../component-detail';
import { uiComponents } from '../registry';

export const uiComponentRoutes: WebsiteRoute[] = uiComponents.map((meta) => ({
  path: `/showcase/ui/${meta.slug}`,
  render: () => UiComponentDetailPage({ meta }),
  invalidationKeys: [
    `route:/showcase/ui/${meta.slug}`,
    'ui-components',
    `ui-component:${meta.slug}`,
  ],
  getDocumentMeta: () => ({
    title: `${meta.title} Showcase`,
    description: meta.description,
  }),
}));
