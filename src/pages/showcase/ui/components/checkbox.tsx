import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('checkbox');

export function CheckboxShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
