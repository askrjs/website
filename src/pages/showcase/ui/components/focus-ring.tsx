import { UiComponentDetailPage } from '../_component-detail';
import { requireUiComponent } from '../_registry';

const meta = requireUiComponent('focus-ring');

export function FocusRingShowcasePage() {
  return <UiComponentDetailPage meta={meta} />;
}
