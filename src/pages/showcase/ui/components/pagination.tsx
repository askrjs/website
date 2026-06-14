import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('pagination');

export function PaginationShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
