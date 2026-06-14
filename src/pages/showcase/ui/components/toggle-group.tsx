import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('toggle-group');

export function ToggleGroupShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
