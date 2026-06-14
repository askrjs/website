import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('radio-group');

export function RadioGroupShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
