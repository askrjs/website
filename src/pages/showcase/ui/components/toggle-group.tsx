import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('toggle-group');

export function ToggleGroupShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
