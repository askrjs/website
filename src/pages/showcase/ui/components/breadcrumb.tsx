import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('breadcrumb');

export function BreadcrumbShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
