import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('checkbox');

export function CheckboxShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
