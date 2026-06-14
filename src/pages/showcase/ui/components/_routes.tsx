import type { WebsiteRoute } from '../../../_types';
import { UiComponentDetailPage } from '../_component-detail';
import { uiComponents } from '../../../../features/ui/registry';

export const uiComponentRoutes: WebsiteRoute[] = uiComponents.map((meta) => ({
  path: `/showcase/ui/${meta.slug}`,
  render: () => <UiComponentDetailPage meta={meta} />,
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
