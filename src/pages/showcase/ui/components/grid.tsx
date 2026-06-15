import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('grid');

export function GridShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
