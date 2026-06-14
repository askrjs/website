import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../../../../features/ui/registry';

const meta = requireUiComponent('toggle');

export function ToggleShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
