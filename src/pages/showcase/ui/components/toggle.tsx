import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('toggle');

export function ToggleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
