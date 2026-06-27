import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('pagination');

export function PaginationShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
