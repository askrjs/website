import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../registry';

const meta = requireUiComponent('radio-group');

export function RadioGroupShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
