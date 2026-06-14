import type { WebsiteRoute } from '../../route-types';
import { UiComponentDetailPage } from '../component-detail';
import { uiComponents } from '../../shared/ui-component-registry';

export const uiComponentRoutes: WebsiteRoute[] = uiComponents.map((meta) => ({
  path: `/showcase/ui/${meta.slug}`,
  render: () => <UiComponentDetailPage meta={meta} />,
  getDocumentMeta: () => ({
    title: `${meta.title} Showcase`,
    description: meta.description,
  }),
}));
