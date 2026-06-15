import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('radio-group');

export function RadioGroupShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
