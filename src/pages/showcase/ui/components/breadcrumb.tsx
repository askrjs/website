import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('breadcrumb');

export function BreadcrumbShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
