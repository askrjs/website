import { UiComponentDetailPage } from '../component-detail';
import { requireUiComponent } from '../../../pages/shared/ui-component-registry';

const meta = requireUiComponent('toggle-group');

export function ToggleGroupShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
