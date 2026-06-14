import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('breadcrumb');

export function BreadcrumbShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
