import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('pagination');

export function PaginationShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
